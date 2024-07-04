import { useContext, useEffect,useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { authContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import useAxiosPublic from '../../hooks/useAxiosPublic';


const Login = () => {
    const axiosPublic = useAxiosPublic();
    const [disable, setDisable]=useState(true);
    const navigate = useNavigate();
    const location =useLocation();
    const from =location.state?.from?.pathname || "/";
    const {signIn,signInWithGoogle}=useContext(authContext);
    useEffect(()=>{
        loadCaptchaEnginge(6);
    },[])


    // const handleGoogleSignIn = ()=>{
    //     signInWithPopup(auth,provider)
    //     .then((result) => {
    //         const user = result.user;
    //         console.log(user);
    //         setUser(user);
    //         navigate('/');
    //     }).catch((error) => {
    //        console.log('error', error.message)
    //     });
    // }
    const handleGoogleSignIn = ()=>{
        signInWithGoogle()
        .then((result) => {
            const user = result.user;
            console.log(user);
            const userInfo ={
                email:result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users',userInfo)
            .then(res =>{
                console.log(res.data);
            })
            Swal.fire({
                title: "Good job!",
                text: "LogIn Successfully",
                icon: "success"
              });
              navigate(from, {replace:true});
        }) 
    }

    const handleLogin =event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);
        signIn(email,password)
        .then(result =>{
            const user= result.user;
            console.log(user);
                Swal.fire({
                    title: "Good job!",
                    text: "LogIn Successfully",
                    icon: "success"
                  });
                  navigate(from, {replace:true});
        })
        
    }
    const handleValidateCaptcha =(e)=>{
        const user_captcha_value =e.target.value;
        if(validateCaptcha(user_captcha_value)){
            setDisable(false);
        }
        else{
            setDisable(true);
        }
    }
    return (
        <>
        <Helmet>
            <title>Bistro Boss | LogIn</title>
        </Helmet>
        <div className="flex justify-center  bg-green-400 w-full text-white  py-10 items-center">
            <div className="bg-green-500 p-8 rounded-lg shadow-lg max-w-md w-3/4">
                <h2 className="text-2xl font-bold mb-6 text-center">LOG IN HERE</h2>
                <form  onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="label">
                    Email
                    </label>
                    <input type="email" name="email" placeholder="Enter Your Email" className="w-full p-2 border input input-bordered border-gray-300 rounded-lg"
                    required />
                </div>

                <div className="mb-4">
                    <label className="label">
                    Password
                    </label>
                    <input type="password" name="password" placeholder="Type Password" className="w-full p-2 border input input-bordered border-gray-300 rounded-lg"
                    required />
                </div> 
                <div className="form-control">
                    <label className="label">
                    <LoadCanvasTemplate />
                    </label>
                    <input  onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="Type above captcha" className="input input-bordered" required />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover text-white">Forgot password?</a>
                    </label>
                </div>
                <button className="w-full btn btn-outline bg-emerald-950 hover:bg-white text-white mt-4 px-16 text-lg">LOG IN</button>
                </form>
                <div className="flex justify-center my-2 items-center">
                    OR
                </div>
                <div className="flex justify-center mb-2 items-center">
                    {/* <FaGoogle onClick={handleGoogleSignIn} className="size-6"/> */}
                    
                    {/* <FcGoogle className="size-6"/> */}
                    <FaGoogle onClick={handleGoogleSignIn}  className='size-8 mt-2'/>
                    <FaFacebook  className='size-8 mx-6 mt-2'/>
                    <FaGithub className='size-8 mt-2' />
                </div>
                 
                <div className="my-4"><Link to={'/signup'}>If Not Register? Please  Click Here.</Link> </div>
            </div>
        </div>
        </>
    );
};

export default Login;