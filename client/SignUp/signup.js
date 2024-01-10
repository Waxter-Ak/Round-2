const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', sendDataToBackend);

// Function to send data to the backend
async function sendDataToBackend(e) {
    e.preventDefault();

    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {
        name: name,
        email: email,
        password: password,
    };

    try {
        await fetch('https://xenonstack-abhishek-backend.onrender.com//auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        });
        alert('You have successfully signed up');
        window.location.href = '/index.html';
        
    } catch (error) {
        console.log('could not sign in', error);
    }
}
