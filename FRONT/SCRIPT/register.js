const submitRegister = async () => {
    const usernameInput = document.getElementById('RegUsername_input');
    const passwordInput = document.getElementById('RegPassword_input');
    const resultDiv = document.getElementById('resultRegister');

    const username = usernameInput.value;
    const password = passwordInput.value;

    usernameInput.value = '';
    passwordInput.value = '';

    const data = {
        identifiant: username,
        password: password
    };

    try {
        const response = await fetch('http://192.168.65.211:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            handleResponse('Création de compte réussie', 'green');
        } else {
            handleResponse(result.error || 'Erreur interne du serveur. Veuillez réessayer.', 'red');
        }
    } catch (error) {
        handleResponse('Erreur interne du serveur. Veuillez réessayer.', 'red');
    }

    function handleResponse(message, color) {
        resultDiv.textContent = message;
        resultDiv.style.color = color;
    }
};

document.getElementById('submitRegister').addEventListener('click', submitRegister);
