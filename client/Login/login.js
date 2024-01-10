const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', sendDataToBackend);

// Function to send data to the backend
async function sendDataToBackend(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {
        email: email,
        password: password,
    };

    try {
        await fetch('https://xenonstack-abhishek-backend.onrender.com//auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        });
        alert('You have successfully logged in');
        window.location.href = '/index.html';
        
    } catch (error) {
        console.log('could not log in', error);
    }
}
