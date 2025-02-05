// Firebase initialization
const firebaseConfig = {
  apiKey: "AIzaSyBhPo4M2lnVTKkqLVug2bHDvHyjJGtu-LY",
  authDomain: "thizoco1.firebaseapp.com",
  projectId: "thizoco1",
  storageBucket: "thizoco1.appspot.com", // Keeping this in case future updates need storage
  messagingSenderId: "234620248112",
  appId: "1:234620248112:web:3740a2cfa48a0753764df5",
  measurementId: "G-F46RWJ6J3E"
};

// Check if Firebase is loaded
if (typeof firebase === "undefined") {
  throw new Error("Firebase SDK not loaded. Ensure Firebase CDN is included.");
}

// Initialize Firebase (only once)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
console.log("Auth initialized:", auth);

// Allowed exceptions and firm-based routing
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
const firmRouting = {
  "foxarchitects.com": "foxarchitects-account-management.html",
  "millerdesign.com": "millerdesign-account-management.html",
  "arceng.com": "arceng-account-management.html"
};

// Event listener for login form submission
const loginForm = document.querySelector(".login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const emailDomain = email.split("@")[1]; // Extract email domain

    console.log(`Login attempt by email: ${email}, domain: ${emailDomain}`);

    // Check if the email is invalid
    if (invalidDomains.includes(emailDomain) && !allowedExceptions.includes(email)) {
      showFeedback("Access restricted to industry clients only.", false);
      return;
    }

    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      console.log("Login successful:", userCredential.user);

      if (allowedExceptions.includes(email)) {
        // Redirect all allowed exceptions to a shared dynamic page
        window.location.href = `./account-management.html?user=${encodeURIComponent(email)}`;
      } else if (firmRouting[emailDomain]) {
        // Redirect firm-based users
        const firmAccountPage = firmRouting[emailDomain];
        window.location.href = `./${firmAccountPage}`;
      } else {
        // Allow creation for new firms
        showFeedback("No account found. Please create an account.", false);
        setTimeout(() => {
          window.location.href = "./create-account.html";
        }, 2000);
      }
    } catch (error) {
      console.error("Login error:", error.message);
      if (error.code === "auth/user-not-found") {
        showFeedback("Account not found. Please create an account.", false);
        setTimeout(() => {
          window.location.href = "./create-account.html";
        }, 2000);
      } else {
        showFeedback(`Login failed: ${error.message}`, false);
      }
    }
  });
}

// Forgot Password functionality
const forgotPasswordBtn = document.getElementById("forgotPassword");
if (forgotPasswordBtn) {
  forgotPasswordBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    const email = prompt("Please enter your registered email address:");
    if (!email) {
      alert("Email is required to reset your password.");
      return;
    }

    try {
      await auth.sendPasswordResetEmail(email);
      alert("Password reset email sent! Please check your inbox.");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });
}

// Helper function to display feedback messages
function showFeedback(message, isSuccess) {
  const feedbackElement = document.getElementById("feedbackMessage");
  if (feedbackElement) {
    feedbackElement.textContent = message;
    feedbackElement.style.color = isSuccess ? "green" : "red";
    feedbackElement.style.display = "block";
  } else {
    console.error("Feedback element not found.");
  }
}

// Debug Firebase initialization
console.log("Firebase auth initialized:", auth);
