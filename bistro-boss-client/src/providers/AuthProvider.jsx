import {  createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";

const provider = new GoogleAuthProvider();

export const authContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser]= useState(null);
    const [loading,setLoading] =useState(true);

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
            console.log('current user',currentUser);
            setLoading(false);
        })
        return () =>{
            return unsubscribe();
        }
    },[])

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