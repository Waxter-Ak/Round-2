const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', sendDataToBackend);

// Function to send data to the backend
async function sendDataToBackend(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const data = {
        name,
        email,
        phone,
        subject,
        message,
    };

    try {
        await fetch('https://xenonstack-abhishek-backend.onrender.com//contact/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        });
        alert('Message sent successfully');
        window.location.href = '/index.html';

    } catch (error) {
        console.log('could not log in', error);
    }
}
