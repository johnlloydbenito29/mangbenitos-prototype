import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/Firebase';

const AuthenticationContext = React.createContext();

export function useAuth() {
   return useContext(AuthenticationContext);
}

export function AuthenticationProvider({ children }) {
   const [currentUser, setCurrentUser] = useState();
   const [loading, setLoading] = useState(true);

   // To Sign Up
   const signup = (email, password) => auth.createUserWithEmailAndPassword(email, password);

   // To Log In

   const logIn = (email, password) => auth.signInWithEmailAndPassword(email, password);

   //    To Unsubscribe
   useEffect(() => {
      const unSubscribe = auth.onAuthStateChanged((user) => {
         setCurrentUser(user);

         // Verify if there is a user
         setLoading(false);

         return unSubscribe;
      });
   }, []);

   const value = {
      currentUser,
      signup,
      logIn,
   };

   return <AuthenticationContext.Provider value={value}>{!loading && children}</AuthenticationContext.Provider>;
}
