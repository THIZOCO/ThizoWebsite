document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // Toggle the current FAQ question
        button.setAttribute('aria-expanded', !isExpanded);

        if (!isExpanded) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }

        // Collapse all other answers
        document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
            if (otherAnswer !== answer) {
                otherAnswer.style.maxHeight = null;
                otherAnswer.previousElementSibling.setAttribute('aria-expanded', 'false');
            }
        });
    });
});
