const submitAdd = async () => {
    const titleInput = document.getElementById('addTitle_input');
    const lienInput = document.getElementById('addLink_input');
    const descriptionInput = document.getElementById('addDescription_input');
    const resultDiv = document.getElementById('resultAdd');

    const title = titleInput.value;
    const lien = lienInput.value;
    const description = descriptionInput.value;

    titleInput.value = '';
    lienInput.value = '';
    descriptionInput.value = '';

    const data = {
        title: title,
        lien: lien,
        description: description
    };

    try {
        const response = await fetch('http://192.168.65.211:3000/addProjet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            handleResponse('Projet ajouté avec succès', 'green');
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
