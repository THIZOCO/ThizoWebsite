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

// Firm-based routing: Define allowed firms and their specific account pages
const firmRouting = {
    "foxarchitects.com": "foxarchitects-account-management.html",
    "millerdesign.com": "millerdesign-account-management.html",
    "arceng.com": "arceng-account-management.html"
    // Add more firms as needed
};

document.querySelector('.login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailDomain = email.split('@')[1];  // Extract domain from email

    try {
        console.log(`Attempting login for email: ${email}`);

        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Check if the domain is in the firmRouting map
        if (firmRouting[emailDomain]) {
            const firmAccountPage = firmRouting[emailDomain];
            const clientDashboardPage = firmAccountPage.replace("account-management", "client-dashboard");

            console.log(`Routing to ${firmAccountPage} and linking to ${clientDashboardPage}`);

            // Redirect to the firm's account management page, passing the firm name
            window.location.href = `./${firmAccountPage}?firm=${emailDomain}`;
        } else {
            showFeedback("Access restricted to registered firms.", false);
        }
    } catch (error) {
        console.error(`Login failed: ${error.message}`);

        if (error.code === 'auth/user-not-found') {
            showFeedback("Account not found. Please contact support.", false);
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
