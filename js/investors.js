import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

// Firebase configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhPo4M2lnVTKkqLVug2bHDvHyjJGtu-LY",
  authDomain: "thizoco1.firebaseapp.com",
  projectId: "thizoco1",
  storageBucket: "thizoco1.firebasestorage.app",
  messagingSenderId: "234620248112",
  appId: "1:234620248112:web:3740a2cfa48a0753764df5",
  measurementId: "G-F46RWJ6J3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Add event listener for form submission
document.querySelector('.login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const allowedExceptions = [
        "valerie.e.trent@gmail.com",
        "jroither@gmail.com",
        "kristin.pautlitz@gmail.com",
        "naumannoor@gmail.com",
        "snow.michaelwesley@gmail.com",
        "jstevensnow@gmail.com",
        "megtwright@gmail.com",
        "thomas.h.snow@gmail.com",
        "j.alex.trent91@gmail.com",
        "bfoxj42@gmail.com"
    ];

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const currentPath = window.location.pathname;

        console.log(`Login successful for: ${email}`);
        console.log(`Current Path: ${currentPath}`);

        if (currentPath.includes("investors.html")) {
            if (allowedExceptions.includes(email)) {
                // Redirect to a single dashboard file with the user info passed via query parameter
                const redirectPath = `./investor-dashboard.html?user=${email.split('@')[0]}`;
                console.log(`Redirecting to: ${redirectPath}`);
                window.location.href = redirectPath;
            } else {
                console.log("Access denied: Not an allowed investor.");
                showFeedback("Access restricted to Thizo Investors.", false);
            }
        } else if (currentPath.includes("client-login.html")) {
            if (allowedExceptions.includes(email)) {
                const redirectPath = `./account-management.html?user=${email.split('@')[0]}`;
                console.log(`Redirecting to: ${redirectPath}`);
                window.location.href = redirectPath;
            } else {
                console.log("Access denied: Not an allowed client.");
                showFeedback("Access restricted to industry clients only.", false);
            }
        } else {
            console.log("Invalid login attempt.");
            showFeedback("Invalid login username and/or password. Please try again.", false);
        }
    } catch (error) {
        console.error(`Login failed: ${error.message}`);

        if (error.code === 'auth/user-not-found') {
            console.log("User not found, redirecting to account creation.");
            if (window.location.pathname.includes("client-login.html")) {
                showFeedback("No Account is created for this username yet. Create an account below to sign-in.", false);
                setTimeout(() => {
                    window.location.href = './client-create-account.html';
                }, 2000);
            } else {
                showFeedback("Account not found. Please contact support.", false);
            }
        } else {
            showFeedback(`Login failed: ${error.message}`, false);
        }
    }
});

// Helper function to display feedback
function showFeedback(message, isSuccess) {
    const feedbackElement = document.getElementById('feedbackMessage');
    feedbackElement.textContent = message;
    feedbackElement.style.color = isSuccess ? 'green' : 'red';
    feedbackElement.style.display = 'block';
}

// Debug Firebase initialization
console.log("Firebase auth initialized:", auth);
