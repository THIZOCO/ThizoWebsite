import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

const firebase = {
    initializeApp,
    getAuth,
}

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCXHLmDGAGfvkiiNJiOV7p-ULJFjn5-IfM",
    authDomain: "thizologin.firebaseapp.com",
    projectId: "thizologin",
    storageBucket: "thizologin.firebasestorage.app",
    messagingSenderId: "35666835546",
    appId: "1:35666835546:web:e7956ca1d73afee0498063",
    measurementId: "G-FPK97DDZBK"
  };
  
let auth;
// Wait for Firebase to load before using it
document.addEventListener("DOMContentLoaded", function() {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.getAuth();
});
  
  // Login Function
  document.querySelector(".login-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const userEmail = userCredential.user.email;
        const emailDomain = userEmail.split("@")[1].split(".")[0]; 

        if (exceptionEmails.includes(userEmail)) {
            window.location.href = "account-management.html";
        } else if (isProfessionalEmail(userEmail)) {
            window.location.href = `${emailDomain}-account-management.html`;
        } else {
            alert("Access denied.");
        }
    })
    .catch((error) => {
        document.getElementById("emailError").innerText = error.message;
        console.error("Login error:", error.message);
    });
  });
  