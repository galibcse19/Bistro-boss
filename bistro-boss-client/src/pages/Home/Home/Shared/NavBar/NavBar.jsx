import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../../../../../providers/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../../../hooks/useCart";
import useAdmin from "../../../../../hooks/useAdmin";

const NavBar = () => {
    const {user,logOut}= useContext(authContext);
    const [isAdmin] =useAdmin();

    const [cart]= useCart();

    const handleLogOut=()=>{
        logOut()
        .then(()=>{})
        .catch(error => console.log(error));
    }
    const navOptions= <>
         <li><NavLink to={'/'}>Home</NavLink></li>
         <li><NavLink to={'/menu'}>Our Menu</NavLink></li>
         <li><NavLink to={'/order/salad'}>Order Food</NavLink></li>
         {
            user && isAdmin && <><li><NavLink to={'/dashboard/adminHome'}>Secret</NavLink></li></>
         }
         {
            user && !isAdmin && <><li><NavLink to={'/dashboard/userHome'}>Secret</NavLink></li></>
         }
         {
            !user && <>
            <li><NavLink to={'/login'}>Login</NavLink></li>
           <li><NavLink to={'/signup'}>SignUp</NavLink></li>
            </>
         }
         {
            user ? <>
                 {/* <span>{user?.displayName}</span> */}
                 <li>
                    <NavLink to={"/dashboard/cart"}>
                        {/* <button className="btn"> */}
                        <FaShoppingCart />
                        <div className="badge badge-secondary">+{cart.length}</div>
                        {/* </button> */}
                    </NavLink>
                </li>
                <button onClick={handleLogOut} className="btn btn-ghost">LOGOUT</button>
                </> : <>
                 <li><Link to={'/login'}></Link></li>
                 </>

         }
    </>
    return (
        <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl  bg-black text-white">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                {navOptions}
                </ul>
                </div>
                <a className="btn btn-ghost text-xl">Bistro Boss</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default NavBar;