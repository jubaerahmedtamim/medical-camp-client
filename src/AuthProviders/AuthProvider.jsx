import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
            }else{
                setLoading(false)
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