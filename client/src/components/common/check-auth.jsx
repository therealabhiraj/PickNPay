// import { Navigate, useLocation } from "react-router-dom";

// function CheckAuth({ isAuthenticated, user, children }) {
//   const location = useLocation();

//   console.log(location.pathname, isAuthenticated);

//   if (location.pathname === "/") {
//     if (!isAuthenticated) {
//       return <Navigate to="/auth/login" />;
//     } else {
//       if (user?.role === "admin") {
//         return <Navigate to="/admin/dashboard" />;
//       } else {
//         return <Navigate to="/shop/home" />;
//       }
//     }
//   }

//   if (
//     !isAuthenticated &&
//     !(
//       location.pathname.includes("/login") ||
//       location.pathname.includes("/register")
//     )
//   ) {
//     return <Navigate to="/auth/login" />;
//   }

//   if (
//     isAuthenticated &&
//     (location.pathname.includes("/login") ||
//       location.pathname.includes("/register"))
//   ) {
//     if (user?.role === "admin") {
//       return <Navigate to="/admin/dashboard" />;
//     } else {
//       return <Navigate to="/shop/home" />;
//     }
//   }

//   if (
//     isAuthenticated &&
//     user?.role !== "admin" &&
//     location.pathname.includes("admin")
//   ) {
//     return <Navigate to="/unauth-page" />;
//   }

//   if (
//     isAuthenticated &&
//     user?.role === "admin" &&
//     location.pathname.includes("shop")
//   ) {
//     return <Navigate to="/admin/dashboard" />;
//   }

//   return <>{children}</>;
// }

// export default CheckAuth;


import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton"; // Using the same Skeleton from your App.jsx

function CheckAuth({ children }) {
  // Get state directly from the Redux store
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  // 1. CRITICAL FIX: While the API call is running, show a loading screen and wait.
  if (isLoading) {
    return <Skeleton className="w-full h-screen" />;
  }

  // 2. Handle root path "/" redirection
  if (location.pathname === "/") {
    if (isAuthenticated) {
      return user.role === "admin" 
        ? <Navigate to="/admin/dashboard" replace />
        : <Navigate to="/shop/home" replace />;
    }
    return <Navigate to="/auth/login" replace />;
  }

  // 3. Handle already logged-in users trying to access login/register
  if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    return user.role === "admin"
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/shop/home" replace />;
  }
  
  // 4. Handle role-based protection
  if (isAuthenticated) {
    if (user.role !== "admin" && location.pathname.includes("/admin")) {
      return <Navigate to="/unauth-page" replace />;
    }
    if (user.role === "admin" && (location.pathname.includes("/shop") || location.pathname.includes("/checkout"))) {
        return <Navigate to="/admin/dashboard" replace />;
    }
  }

  // 5. Handle unauthenticated users trying to access protected routes
  // Let's be specific about what's protected.
  const isProtectedRoute = location.pathname.includes("/admin") || location.pathname.includes("/account") || location.pathname.includes("/checkout");
  if (!isAuthenticated && isProtectedRoute) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // 6. If no redirect rules match, show the requested page
  return children;
}

export default CheckAuth;
