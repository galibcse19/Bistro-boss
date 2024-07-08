import {  createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

const provider = new GoogleAuthProvider();

export const authContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser]= useState(null);
    const [loading,setLoading] =useState(true);
    const axiosPublic = useAxiosPublic();

    const creatUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const signIn=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const logOut =()=>{
        setLoading(true);
        return signOut(auth);
    }
    const updateUserProfile=(name,photo)=>{
       return updateProfile(auth.currentUser,{
            displayName:name,photoURL:photo
        })
    }
    const signInWithGoogle=()=>{
        setLoading(true);
        return signInWithPopup(auth,provider)
    }

    useEffect(()=>{
       const unsubscribe= onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser);
            // console.log('current user',currentUser);
            if(currentUser){
                //get token and store client
                const userInfo={email: currentUser.email};
                axiosPublic.post('/jwt',userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token);
                    }
                })
            }
            else{
                // TODO: review roken (if token stored in the client site: local storage,cacing,in memory)
                localStorage.removeItem('access-token');
            }
            
            setLoading(false);
        })
        return () =>{
            return unsubscribe();
        }
    },[axiosPublic])

    const authInfo={
         user,loading,creatUser,signIn,logOut,updateUserProfile,signInWithGoogle
    }
    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;