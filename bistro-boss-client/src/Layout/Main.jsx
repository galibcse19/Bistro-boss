import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Home/Home/Shared/Footer/Footer";
import NavBar from "../pages/Home/Home/Shared/NavBar/NavBar";

 

const Main = () => {
    const loaction = useLocation();
    const noHeaderFooter=loaction.pathname.includes('login') || loaction.pathname.includes('signup')
    return (
        <div>
            {noHeaderFooter || <NavBar></NavBar>}
             <Outlet></Outlet>
             {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;