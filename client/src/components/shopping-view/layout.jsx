// import { Outlet } from "react-router-dom";
// import ShoppingHeader from "./header";

// function ShoppingLayout() {
//   return (
//     <div className="flex flex-col bg-white overflow-hidden">
//       {/* common header */}
//       <ShoppingHeader />
//       <main className="flex flex-col w-full">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// export default ShoppingLayout;


// client/src/components/shopping-view/layout.jsx

import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./Footer"; // <--- Assuming your component is named ShoppingFooter and exported as default

function ShoppingLayout() {
  return (
    // Added 'min-h-screen' to make sure the div takes at least full viewport height
    // Added 'flex-col' explicitly as it's needed for the flex-1 on main
    <div className="flex flex-col bg-white overflow-hidden min-h-screen"> 
      {/* common header */}
      <ShoppingHeader />
      {/* Added 'flex-1' to 'main' so it expands and pushes the footer to the bottom */}
      <main className="flex flex-col w-full flex-1"> 
        <Outlet />
      </main>
      <ShoppingFooter /> {/* <--- RENDER THE FOOTER HERE */}
    </div>
  );
}

export default ShoppingLayout;