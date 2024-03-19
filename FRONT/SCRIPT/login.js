async function submitLogin() {
    const usernameInput = document.getElementById('LogUsername_input');
    const passwordInput = document.getElementById('LogPassword_input');
    const resultDiv = document.getElementById('resultLogin');

    const username = usernameInput.value;
    const password = passwordInput.value;

    usernameInput.value = '';
    passwordInput.value = '';

    const data = {
        identifiant: username,
        password: password
    };

    try {
        const response = await fetch('http://192.168.65.211:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(username + ':' + password)
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            handleSuccess(result.userUUID);
        } else {
            handleError('Erreur de connexion. Veuillez réessayer.');
        }
    } catch (error) {
        console.error('Erreur lors de la requête:', error.message);
        handleError('Erreur de connexion. Veuillez réessayer.');
    }

    function handleSuccess(userUUID) {
        document.cookie = "ProviHub-Token=" + encodeURIComponent(userUUID) + "; max-age=" + (7 * 24 * 60 * 60);
        displayMessage('Connexion réussie!', 'green');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }

    function handleError(message) {
        displayMessage(message, 'red');
    }

    function displayMessage(message, color) {
        resultDiv.textContent = message;
        resultDiv.style.color = color;
    }
}
