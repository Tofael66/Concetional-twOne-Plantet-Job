/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { app } from '../firebase/firebase.config'
import axios from 'axios'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const logOut = async () => {
    setLoading(true)
    return signOut(auth)
  }

  const updateUserProfile = (name, photoURL) => {
    // console.log(name)
    // console.log(photoURL)
    return updateProfile(auth.currentUser , {
      displayName: name,
      photoURL: photoURL,
    
    })
  }

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      console.log('CurrentUser-->', currentUser?.email)
      console.log('photo', currentUser?.photoURL)
      //console.log(currentUser)
      //console.log(' current usa ce ki' , currentUser?.displayName)
      //console.log(' current usa photo' , currentUser?.photoURL)
      console.log(' current usa ce email' , currentUser?.email)
      if (currentUser?.email) {
        setUser(currentUser)
       
        // save or update user info in db 
        await axios.post(
          `${import.meta.env.VITE_API_URL}/users/${currentUser?.email} ` , 
           {
  names: currentUser?.displayName , 
  images: currentUser?.photoURL ,
  role: 'customer' , 
 email: currentUser?.email 
          }
         
        )
     
        console.log('photo', currentUser?.photoURL)
        console.log('name',  currentUser?.displayName )
        // Get JWT token
        // await axios.post(
        //   `${import.meta.env.VITE_API_URL}/jwt`,
        //   {
        //     email: currentUser?.email,
        //   },
        //   { withCredentials: true }
        // )

      } else {
        setUser(currentUser)
        // await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
        //   withCredentials: true,
        // })
      }
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
