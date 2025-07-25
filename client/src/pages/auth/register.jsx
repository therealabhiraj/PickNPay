import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
  role: "user", 
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  
  function handleRoleChange(event) {
    setFormData({
      ...formData,
      role: event.target.value,
    });
  }

  console.log(formData); 

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>

      
      <div className="flex justify-center gap-4 py-2">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="role-user"
            name="role"
            value="user"
            checked={formData.role === "user"}
            onChange={handleRoleChange}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
          />
          <label htmlFor="role-user" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            User
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="role-admin"
            name="role"
            value="admin"
            checked={formData.role === "admin"}
            onChange={handleRoleChange}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
          />
          <label htmlFor="role-admin" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Admin
          </label>
        </div>
      </div>

      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;