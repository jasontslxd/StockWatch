import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router'
import { initializeApp } from 'firebase/app';

// app identifiers only, safe to store in source code
const firebaseConfig = {
  apiKey: "AIzaSyA_uJt8j-2G-TExJ1mdFbrqNm-gNGlW4ks",
  authDomain: "stockwatch-5077f.firebaseapp.com",
  projectId: "stockwatch-5077f",
  storageBucket: "stockwatch-5077f.firebasestorage.app",
  messagingSenderId: "76445865212",
  appId: "1:76445865212:web:c8951f0a0a42af8269b379",
  measurementId: "G-HJC4BT2KDY"
};

initializeApp(firebaseConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
