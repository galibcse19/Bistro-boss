import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";


const SignUp = () => {

    const naviagate= useNavigate();
    const {creatUser,updateUserProfile,logOut}= useContext(authContext);
    const { register,reset, handleSubmit, formState: { errors },} = useForm()
    const onSubmit = (data) =>{
        console.log(data)
        creatUser(data.email,data.password)
        .then(result =>{
            const loggedUser=result.loggedUser;
            console.log(loggedUser);
            updateUserProfile(data.name,data.photoURL)
            .then(()=>{
                console.log('user profile updated');
                reset();
                Swal.fire({
                    title: "Good job!",
                    text: "User Created Successfully",
                    icon: "success",
                    timer:1500
                  });
                  logOut()
                 .then(()=>{})
                 .catch(error => console.log(error));
            })
            .catch(error =>console.log(error))
            naviagate('/login');
        })
       
    } 

    // const handleSignIn = event=>{
    //     event.preventDefault()
    //     const email=event.target.email.value;
    //     const password=event.target.password.value;
       
    //     creatUser(email,password)
    //     .then((result)=>{
    //         const user= result.user;
    //         console.log(user);
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     })
    // }
    return (
        <>
        <Helmet>
            <title>Bistro Boss | Sign Up</title>
        </Helmet>
        <div className="flex justify-center  bg-green-400 w-full  lg:py-10 items-center text-white">
        <div className="bg-green-500 p-8 rounded-lg shadow-lg max-w-md lg:w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">REGISTER HERE</h2>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="mb-4">
                    <label className="label">
                    Name
                    </label>
                    <input type="text" {...register("name",{ required: true })} name="name" placeholder="Enter Your name" className="w-full p-2 border input input-bordered border-gray-300 rounded-lg"
                      />
                    {errors.name && <span className="text-red-600">Name is required</span>}
                </div>

                <div className="mb-4">
                    <label className="label">
                    PhotoURL
                    </label>
                    <input type="text" {...register("photoURL")} name="photo" placeholder="PhotoURL" className="w-full p-2 border input input-bordered border-gray-300 rounded-lg"
                      />
                    {errors.photoURL && <span className="text-red-600">PhotoURL is required</span>}
                </div>

                <div className="mb-4">
                    <label className="label">
                    Email
                    </label>
                    <input type="email" {...register("email",{ required: true })} name="email" placeholder="Enter Your Email" className="w-full p-2 border input input-bordered border-gray-300 rounded-lg"
                      />
                     {errors.email && <span className="text-red-600">Email is required</span>}
                </div>

                <div className="mb-4">
                    <label className="label">
                    Password
                    </label>
                    <input type="password" {...register("password",{ required: true,minLength:6, maxLength: 20 })} name="password" placeholder="Type Password" className="w-full p-2 border input input-bordered border-gray-300 rounded-lg"
                    />
                    {errors.password?.type==='required' && <p className="text-red-600">password is required</p>}
                </div>
                <button className="w-full btn btn-outline bg-emerald-950 text-white mt-4 px-16 text-lg hover:bg-white">REGISTER</button>
                <div className="my-4 "><Link to={'/login'}>If Already Register? Please  Click Here.</Link> </div>
            </form>
        </div>
    </div>
        </>
    );
};

export default SignUp;