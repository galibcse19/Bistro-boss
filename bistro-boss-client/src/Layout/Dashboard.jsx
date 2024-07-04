import { NavLink, Outlet } from "react-router-dom";
import { FaAd, FaCalendar, FaEnvelope, FaList, FaShoppingCart, FaVoicemail } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import useCart from "../hooks/useCart";

const Dashboard = () => {
    const [cart] = useCart();


    const isAdmin = true;
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400 text-white">
                <ul className="menu p-4">
                    <li>
                        <NavLink to={'/dashboard/userHome'}><FaHome />User Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/reservation'}><FaCalendar />Reservation</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/cart'}> <FaShoppingCart /> My Cart({cart.length})</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/review'}><FaAd />Add Review</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/bookings'}><FaList />My Bookings</NavLink>
                    </li>
                    {/* shared */}
                    <div className="divider"></div> 
                    <li>
                        <NavLink to={'/'}><FaHome />Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/menu'}><MdMenuBook />Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/order/contact'}><FaEnvelope/>Contact</NavLink>
                    </li>
                    
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;