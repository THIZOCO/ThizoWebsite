document.querySelector('.login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Allowed exceptions for both investors and clients
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
    ];

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Determine which page the login form is on
        const currentPath = window.location.pathname;

        if (currentPath.includes("investors.html")) {
            // Investors login: redirect to investor-specific dashboard
            if (allowedExceptions.includes(email)) {
                window.location.href = `./Investors/${email.split('@')[0]}-investors-dashboard.html`;
            } else {
                showFeedback("Access restricted to Thizo Investors.", false);
            }
        } else if (currentPath.includes("./client-login.html")) {
            // Clients login: redirect to client-specific dashboard
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
            if (window.location.pathname.includes("./client-login.html")) {
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

function showFeedback(message, isSuccess) {
    const feedbackElement = document.getElementById('feedbackMessage');
    feedbackElement.textContent = message;
    feedbackElement.style.color = isSuccess ? 'green' : 'red';
    feedbackElement.style.display = 'block';
}
