import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhPo4M2lnVTKkqLVug2bHDvHyjJGtu-LY",
    authDomain: "thizoco1.firebaseapp.com",
    projectId: "thizoco1",
    storageBucket: "thizoco1.firebasestorage.app",
    messagingSenderId: "234620248112",
    appId: "1:234620248112:web:752f2e6c65844239764df5",
    measurementId: "G-B8M102JDYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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

        if (currentPath.includes("investors.html")) {
            if (allowedExceptions.includes(email)) {
                window.location.href = `./Investors/${email.split('@')[0]}-investors-dashboard.html`;
            } else {
                showFeedback("Access restricted to Thizo Investors.", false);
            }
        } else if (currentPath.includes("client-login.html")) {
            if (allowedExceptions.includes(email)) {
                window.location.href = `./Account-Management/${email.split('@')[0]}-account-management.html`;
            } else {
                showFeedback("Access restricted to industry clients only.", false);
            }
        } else {
            showFeedback("Invalid login username and/or password. Please try again.", false);
        }
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
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
