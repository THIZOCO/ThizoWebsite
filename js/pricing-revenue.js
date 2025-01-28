// Select all the company type cards and the Submit button
const companyTypeCards = document.querySelectorAll('.company-type');
const submitButton = document.getElementById('submitButton');
const modal = document.getElementById('thankYouModal');
const closeModalButton = document.getElementById('closeModalButton');
const emailInput = document.getElementById('emailInput');
const emailSubmitButton = document.getElementById('emailSubmitButton');

// Ensure modal is hidden on page load
window.addEventListener('DOMContentLoaded', () => {
    modal.style.display = 'none'; // Force-hide the modal on page load
    console.log('Modal hidden on page load');
});

// Card selection logic
companyTypeCards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('selected'); // Toggle the "selected" class
        console.log(`Card clicked: ${card.textContent}, Selected: ${card.classList.contains('selected')}`);
    });
});

// "Submit" button logic
submitButton.addEventListener('click', (event) => {
    const selectedCards = document.querySelectorAll('.company-type.selected'); // Get all selected cards
    console.log('Submit button clicked');
    if (selectedCards.length === 0) {
        event.preventDefault(); // Prevent modal display if no cards are selected
        console.log('Modal not displayed: No cards selected');
        alert('Please select at least one option.');
    } else {
        console.log('Modal displayed');
        modal.style.display = 'flex'; // Show the modal
    }
});

// "Close" button logic for the modal
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none'; // Hide the modal when "Close" is clicked
    console.log('Modal closed via Close button');
});

// Email "Submit" button logic
emailSubmitButton.addEventListener('click', () => {
    const email = emailInput.value; // Get the email value
    console.log('Email Submit button clicked');
    if (email) {
        alert(`Thank you! We've received your email: ${email}`);
        modal.style.display = 'none'; // Hide the modal after submission
        console.log('Modal closed after email submission');
        // Perform any additional logic here (e.g., send data to the server)
    } else {
        alert('Please enter a valid email address.');
        console.log('Email submission failed: No email entered');
    }
});

// Optional: Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none'; // Hide modal if clicking outside of it
        console.log('Modal closed by clicking outside');
    }
});
