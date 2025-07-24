import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
  role: "user", // Added default role
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        // You might want to redirect based on role here, e.g.:
        // if (data.payload.data.user.role === 'admin') navigate('/admin/dashboard');
        // else navigate('/');
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  // Handle role selection change
  function handleRoleChange(event) {
    setFormData({
      ...formData,
      role: event.target.value,
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>

      {/* Role Selection Radios */}
      <div className="flex justify-center gap-4 py-2">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="login-role-user"
            name="role"
            value="user"
            checked={formData.role === "user"}
            onChange={handleRoleChange}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
          />
          <label htmlFor="login-role-user" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            User
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="login-role-admin"
            name="role"
            value="admin"
            checked={formData.role === "admin"}
            onChange={handleRoleChange}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
          />
          <label htmlFor="login-role-admin" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Admin
          </label>
        </div>
      </div>

      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;