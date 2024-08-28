import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const updateUserInfo = (name, image) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })
    }

    const logOut = () => {
        // setLoading(true)
        return signOut(auth);
    }

    useEffect(()=> {
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=> {
            if(currentUser){
                setLoading(false);
                setUser(currentUser);
                const userInfo = {
                    email: currentUser?.email,
                }
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem("access-token", res.data.token);
                    }
                })
            }else{
                setLoading(false)
                localStorage.removeItem('access-token')
            }
        })
        return ()=> unSubscribe();
    },[auth])

    const authInfo = {
        user, 
        loading,
        setLoading,
        createUser,
        signInUser,
        googleLogin,
        updateUserInfo,
        logOut,
    }
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
};

export default AuthProvider;