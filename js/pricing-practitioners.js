// Get all the company type cards and the Next button
const companyTypeCards = document.querySelectorAll('.company-type');
const nextButton = document.querySelector('.next-btn');

// Retrieve any previously selected types from localStorage and apply 'selected' class
const selectedTypesFromStorage = JSON.parse(localStorage.getItem('selectedTypes')) || [];
companyTypeCards.forEach(card => {
    const cardValue = card.dataset.value;
    if (selectedTypesFromStorage.includes(cardValue)) {
        card.classList.add('selected');
    }
    card.addEventListener('click', () => {
        console.log("Card clicked:", card.dataset.value); // Debug log
        card.classList.toggle('selected');
        updateSelectedTypes();
    });
});

// Function to update localStorage with the currently selected types
function updateSelectedTypes() {
    const selectedTypes = Array.from(document.querySelectorAll('.company-type.selected')).map(card => card.dataset.value);
    localStorage.setItem('selectedTypes', JSON.stringify(selectedTypes));
}

// Event listener for "Next" button to check selection and navigate
nextButton.addEventListener('click', (event) => {
    const selectedTypes = document.querySelectorAll('.company-type.selected');
    if (selectedTypes.length === 0) {
        event.preventDefault();
        alert('Please select at least one option.');
    } else {
        console.log("Navigating to: pricing-geography.html"); // Debug
        window.location.href = "pricing-geography.html"; // Adjust path if needed
    }
});
companyTypeCards.forEach(card => {
    card.addEventListener('click', () => {
        console.log("Card clicked!"); // Log this to verify clicks
    });
});
