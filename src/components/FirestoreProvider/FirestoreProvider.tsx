import { PropsWithChildren } from "react"
import { FirestoreContext } from "contexts"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const FirestoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // identifiers only, safe to store in source code
  const firebaseConfig = {
    apiKey: "AIzaSyA_uJt8j-2G-TExJ1mdFbrqNm-gNGlW4ks",
    authDomain: "stockwatch-5077f.firebaseapp.com",
    projectId: "stockwatch-5077f",
    storageBucket: "stockwatch-5077f.firebasestorage.app",
    messagingSenderId: "76445865212",
    appId: "1:76445865212:web:c8951f0a0a42af8269b379",
    measurementId: "G-HJC4BT2KDY"
  };

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  return (
    <FirestoreContext.Provider value={{ firestore }}>
      {children}
    </FirestoreContext.Provider>
  )
}