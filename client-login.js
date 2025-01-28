import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBhPo4M2lnVTKkqLVug2bHDvHyjJGtu-LY",
    authDomain: "thizoco1.firebaseapp.com",
    projectId: "thizoco1",
    storageBucket: "thizoco1.firebasestorage.app",
    messagingSenderId: "234620248112",
    appId: "1:234620248112:web:752f2e6c65844239764df5",
    measurementId: "G-B8M102JDYP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
    "bfoxj42@gmail.com",
    "danail.momchilov@gmail.com"
];

const invalidDomains = ["gmail.com", "yahoo.com", "aol.com"];

document.querySelector('.login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const emailDomain = email.split('@')[1];

    if (invalidDomains.includes(emailDomain) && !allowedExceptions.includes(email)) {
        showFeedback('Industry Clients Only.', false);
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Redirect to account-management.html for all users upon successful login
        window.location.href = './Account-Management/account-management.html';
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            showFeedback('No Account Exists for This User. Please create an account.', false);
            setTimeout(() => {
                window.location.href = './create-account.html';
            }, 2000);
        } else {
            showFeedback(`Login failed: ${error.message}`, false);
        }
    }
});

document.getElementById('forgotPassword').addEventListener('click', async function (e) {
    e.preventDefault();

    const email = prompt("Please enter your registered email address:");

    if (!email) {
        alert("Email is required to reset your password.");
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent! Check your inbox.");
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

function showFeedback(message, isSuccess) {
    const feedbackElement = document.getElementById('feedbackMessage');
    feedbackElement.textContent = message;
    feedbackElement.style.color = isSuccess ? 'green' : 'red';
    feedbackElement.style.display = 'block';
}
