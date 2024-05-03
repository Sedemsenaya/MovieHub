import {Route, Routes} from "react-router-dom";
import Cart from "../components/Cart";
import Dash from "../components/Dash";

function AppRoutes() {
   return (
       <Routes>
           <Route path="/" element={<Dash/>}></Route>
           <Route path="/cart" element={<Cart/>}></Route>
       </Routes>
   )
}
export default AppRoutes