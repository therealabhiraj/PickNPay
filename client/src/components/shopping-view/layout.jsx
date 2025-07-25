import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./Footer"; 

function ShoppingLayout() {
  return (
  
    <div className="flex flex-col bg-white overflow-hidden min-h-screen"> 
     
      <ShoppingHeader />
      
      <main className="flex flex-col w-full flex-1"> 
        <Outlet />
      </main>
      <ShoppingFooter /> 
    </div>
  );
}

export default ShoppingLayout;