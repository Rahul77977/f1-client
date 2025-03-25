import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCx2NvJqA1jk06SFHE_qO8ups-IB8RzHCA",
  authDomain: "gagandeluxe.firebaseapp.com",
  projectId: "gagandeluxe",
  storageBucket: "gagandeluxe.firebasestorage.app",
  messagingSenderId: "403747218234",
  appId: "1:403747218234:web:da7d4ab4311943559e660",
  measurementId: "G-FP0E0M8LDX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Setup reCAPTCHA and sign in with phone
export const setupRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => console.log("Recaptcha verified!"),
      }
    );
  }
  return window.recaptchaVerifier;
};

export const signInWithPhone = (phoneNumber) => {
  const recaptchaVerifier = setupRecaptcha();
  return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
};
