document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission behavior
  
    const userPreference = document.querySelector('input[name="userPreference"]:checked');
    const message = document.querySelector('textarea[name="message"]').value;
  
    if (!userPreference) {
      alert('Please select an option: either keep anonymous or agree to a follow-up.');
      return;
    }
  
    if (!message) {
      alert('Please provide your input.');
      return;
    }
  
    const formData = {
      preference: userPreference.value,
      message,
      // Include optional fields as needed
    };
  
    // Send form data to the backend
    fetch('/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          alert('Thank you for your feedback!');
        } else {
          alert('There was an issue submitting your feedback. Please try again later.');
        }
      })
      .catch(err => {
        console.error('Error:', err);
        alert('An error occurred. Please try again.');
      });
  });
  