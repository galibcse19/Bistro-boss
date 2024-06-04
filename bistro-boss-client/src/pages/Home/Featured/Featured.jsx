import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featured from '../../../assets/home/featured.jpg';
import './Featured.css'
const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
            <SectionTitle
            heading={"Featured item"}
            subHeading={"check it out"}>
            </SectionTitle>
            <div className="md:flex justify-center items-center bg-slate-500 bg-opacity-40 pb-20 pt-12 px-36">
                <div>
                    <img src={featured} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 20,2029</p>
                    <p className="uppercase">Where can i get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, animi eligendi exercitationem repellat amet sequi. Nostrum magni mollitia laudantium laboriosam beatae maxime tenetur ab, quia fugit libero, dignissimos accusantium. Accusantium, deleniti hic. Laboriosam saepe error, dignissimos consequuntur, ducimus delectus sit nihil rem qui quos natus doloribus cum porro dolore vitae!</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">ORDER NOW</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;