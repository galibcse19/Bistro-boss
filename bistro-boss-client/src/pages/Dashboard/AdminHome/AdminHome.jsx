import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

 

const AdminHome = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: stats} = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async() =>{
            const res = await axiosSecure.get('/admin-stats');
            // console.log(res.data);
            return res.data;
        }
    })
    // console.log(stats.revenue);
    return (
        <div className="text-3xl">
            <h2>
                <span>Hi, Welcome </span>
                <span className="text-amber-700">
                {
                    user?.displayName ? user.displayName : 'Back'
                }
                </span>
            </h2>
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-5 mt-10">
                <div className="bg-amber-700 rounded-lg text-white p-4">
                    <h2>Revenue</h2>
                    <p>${stats.revenue}</p>
                </div>
                <div className="bg-amber-700 rounded-lg text-white p-4">
                    <h2>Users</h2>
                    <p>{stats.users}</p>
                </div>
                <div className="bg-amber-700 rounded-lg text-white p-4">
                    <h2>Items</h2>
                    <p>{stats.menuItems}</p>
                </div>
                <div className="bg-amber-700 rounded-lg text-white p-4">
                    <h2>Total Order</h2>
                    <p>{stats.orders}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;