document.addEventListener("DOMContentLoaded", () => {
    const removeButtons = document.querySelectorAll(".remove-card-button");
    const addCardForm = document.getElementById("add-card-form");

    // Remove card functionality
    removeButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.parentElement.remove();
        });
    });

    // Add card functionality
    addCardForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const cardholderName = document.getElementById("cardholder-name").value;
        const cardNumber = document.getElementById("card-number").value;
        const last4Digits = cardNumber.slice(-4);

        const newCardHTML = `
            <div class="card">
                <img src="https://via.placeholder.com/40x25" alt="New Card">
                <p>Card Number: **** **** **** ${last4Digits}</p>
                <button class="remove-card-button">Remove card</button>
            </div>
        `;

        document.querySelector(".saved-cards").insertAdjacentHTML("beforeend", newCardHTML);
        addCardForm.reset();

        // Add event listener to the new remove button
        const newRemoveButton = document.querySelector(".saved-cards .card:last-child .remove-card-button");
        newRemoveButton.addEventListener("click", () => {
            newRemoveButton.parentElement.remove();
        });
    });
});
