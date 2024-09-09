import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { PieChart, Pie, Cell,BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: stats={} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async() =>{
            const res = await axiosSecure.get('/admin-stats');
            // console.log(res.data);
            return res.data;
        }
    });

    const {data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/order-stats');
            return res.data;
        }
    })

    // custom shape for the chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
      };
      
      const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };

      //custom shape for the pi-chart
      const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
        };

        const pieChartData = chartData.map(data => {
            return {
                name: data.category,
                value: data.revenue
            }
        })
    
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
            <div className="grid lg:grid-cols-2 gap-5 mt-10">
                <div>
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;