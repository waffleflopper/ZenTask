import { useEffect } from "react";
import { auth } from "@/firebase/firebase";
import {
  useSignInWithEmailAndPassword,
  useCreateUserWithEmailAndPassword,
  useSignOut,
} from "react-firebase-hooks/auth";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const [signInWithEmailAndPassword, , signInLoading, signInError] =
    useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, , signUpLoading, signUpError] =
    useCreateUserWithEmailAndPassword(auth);
  const [signOut, signOutLoading] = useSignOut(auth);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, [setUser]);

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(email, password);
  };

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return signOut();
  };

  return {
    user,
    signIn,
    signUp,
    signOut,
    signInLoading,
    signUpLoading,
    signOutLoading,
    signInError,
    signUpError,
    logout,
  };
};
