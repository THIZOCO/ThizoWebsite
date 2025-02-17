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
  
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // Exception Emails
  const exceptionEmails = [
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
  
  function isProfessionalEmail(email) {
      return email.includes("@") && !email.match(/@(gmail\.com|yahoo\.com|aol\.com|apple\.com)$/i);
  }
  
  // Sign Up Function
  function signUp() {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      if (!isProfessionalEmail(email) && !exceptionEmails.includes(email)) {
          document.getElementById("emailError").innerText = "Professional users only, please.";
          return;
      }
  
      auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          alert("Account created successfully!");
      })
      .catch((error) => {
          document.getElementById("emailError").innerText = error.message;
          console.error("Sign-up error:", error.message);
      });
  }
  
  // Login Function
  document.querySelector(".login-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    auth.signInWithEmailAndPassword(email, password)
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
  