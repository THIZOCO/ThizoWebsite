import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js";

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
const storage = getStorage(app);

// Extract the firm name from the URL query
const urlParams = new URLSearchParams(window.location.search);
const firm = urlParams.get('firm');

if (!firm) {
    alert("Error: No firm identifier found. Please log in again.");
}

// Existing Project Selection System
const OPTIONS = [
    "Core & Shell",
    "Room Layout",
    "Wall types & Doors",
    "Plumbing",
    "Electrical",
    "Ceiling and Lighting",
    "Floors & Millwork",
    "Finishes",
    "Furniture"
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

    // Create a reference to the firm's folder in Firebase Storage
    const storageRef = ref(storage, `uploads/${firm}/${file.name}`);

    // Upload the file
    uploadBytes(storageRef, file).then(async (snapshot) => {
        loadingIndicator.textContent = "Upload complete!";
        console.log(`File uploaded: ${file.name}`);

        // Get the file URL
        const fileURL = await getDownloadURL(storageRef);

        // Display file download link
        const fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.textContent = "View Uploaded File";
        fileLink.target = "_blank";
        projectElement.appendChild(fileLink);
    }).catch((error) => {
        console.error("Error uploading file:", error);
        loadingIndicator.textContent = "Upload failed!";
    });
}

function createOptionButtons(projectId) {
    const projectElement = document.querySelector(`#project${projectId}`);

    if (projectElement.querySelector('.project-options')) {
        console.log("Options already exist for project", projectId);
        return;
    }

    console.log("Creating buttons for project", projectId);

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'project-options';

    OPTIONS.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'project-option';
        button.textContent = option;
        button.dataset.option = option;

        button.style.animationDelay = `${0.2 + index * 0.05}s`;

        if (isOptionSelectedInOtherProjects(option, projectId)) {
            button.classList.add('disabled');
            button.disabled = true;
        }

        button.addEventListener('click', () => toggleOption(button, projectId, option));
        optionsContainer.appendChild(button);
    });

    projectElement.appendChild(optionsContainer);
    console.log("Options container appended:", projectElement.querySelector('.project-options'));
}

function toggleOption(button, projectId, option) {
    const projectKey = `project${projectId}`;

    button.style.transition = 'all 0.3s ease';

    if (selectedOptions[projectKey].has(option)) {
        button.classList.add('deselecting');
        selectedOptions[projectKey].delete(option);
        button.classList.remove('selected');
        totalSelections--;

        updateOptionAvailability(option, false);
    } else {
        if (totalSelections >= MAX_SELECTIONS) {
            alert('Maximum of 9 selections across all projects reached');
            return;
        }

        button.classList.add('selecting');
        selectedOptions[projectKey].add(option);
        button.classList.add('selected');
        totalSelections++;

        updateOptionAvailability(option, true);
    }

    setTimeout(() => {
        button.classList.remove('selecting', 'deselecting');
    }, 300);
}

function updateOptionAvailability(option, isSelected) {
    document.querySelectorAll('.project-option').forEach(button => {
        if (button.dataset.option === option && !button.classList.contains('selected')) {
            button.disabled = isSelected;
            button.classList.toggle('disabled', isSelected);
        }
    });
}

function isOptionSelectedInOtherProjects(option, currentProjectId) {
    return Object.entries(selectedOptions).some(([projectKey, selections]) => {
        return projectKey !== `project${currentProjectId}` && selections.has(option);
    });
}

// Function to save project data locally
function saveToLocalFile(filename, data) {
    const blob = new Blob([data], { type: "application/json" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Update "Save to Revit" button functionality
function updateSaveToRevitButton() {
    const saveToRevitButton = document.querySelector(".save-to-revit");

    if (saveToRevitButton) {
        saveToRevitButton.addEventListener("click", () => {
            const projectData = JSON.stringify(selectedOptions, null, 2);
            saveToLocalFile("project_data.json", projectData);
        });
    } else {
        console.error("Save to Revit button not found");
    }
}

// Initialize "Save to Revit" button
updateSaveToRevitButton();
