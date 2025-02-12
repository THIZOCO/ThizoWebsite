// Extract the firm name from the URL query
const urlParams = new URLSearchParams(window.location.search);
const firm = urlParams.get('firm');

if (!firm) {
    alert("Error: No firm identifier found. Please log in again.");
}

// Existing Project Selection System
const OPTIONS = [
    "Core & Shell", "Room Layout", "Wall types & Doors", "Plumbing", "Electrical", 
    "Ceiling and Lighting", "Floors & Millwork", "Finishes", "Furniture"
];

const selectedOptions = {
    project1: new Set(),
    project2: new Set(),
    project3: new Set()
};

let totalSelections = 0;
const MAX_SELECTIONS = 9;

function uploadFile(projectId) {
    const fileInput = document.querySelector(`#project${projectId} input[type="file"]`);
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file to upload.");
        return;
    }

    if (!firm) {
        alert("Error: Firm identifier missing. Cannot upload file.");
        return;
    }

    // Show uploading indicator
    const projectElement = document.querySelector(`#project${projectId}`);
    const loadingIndicator = document.createElement("div");
    loadingIndicator.className = "uploading-indicator";
    loadingIndicator.textContent = "Uploading...";
    projectElement.appendChild(loadingIndicator);

    // Prepare the form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("firm", firm);

    // Make the POST request to the IIS API endpoint
    fetch("http://10.128.0.4/uploads", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (response.ok) {
            loadingIndicator.textContent = "Upload complete!";
            return response.json();
        } else {
            throw new Error("Upload failed");
        }
    })
    .then(data => {
        const fileLink = document.createElement("a");
        fileLink.href = data.fileURL;
        fileLink.textContent = "View Uploaded File";
        fileLink.target = "_blank";
        projectElement.appendChild(fileLink);
    })
    .catch(error => {
        console.error("Error uploading file:", error);
        loadingIndicator.textContent = "Upload failed!";
    });
}

// Functionality for the 48-hour popup & Disclaimer popup
document.addEventListener("DOMContentLoaded", function () {
    const buildButton = document.querySelector(".build-button");
    const popup48 = document.getElementById("popup-48hours");
    const disclaimerPopup = document.getElementById("disclaimer-popup");
    const submitEmailBtn = document.getElementById("submit-email");
    const agreeButton = document.getElementById("agree-button");

    buildButton.addEventListener("click", function (event) {
        event.preventDefault();
        popup48.style.display = "flex";
    });

    submitEmailBtn.addEventListener("click", function () {
        const userEmail = document.getElementById("user-email").value;
        if (!userEmail) {
            alert("Please enter a valid email.");
            return;
        }

        localStorage.setItem("userEmail", userEmail);
        popup48.style.display = "none";
        disclaimerPopup.style.display = "flex";
    });

    agreeButton.addEventListener("click", function () {
        disclaimerPopup.style.display = "none";
    });
});
