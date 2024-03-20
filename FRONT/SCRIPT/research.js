function searchProject() {
    const input = document.getElementById("researchInput").value;
    const data = { model: input };

    fetch('http://192.168.65.211:3000/research', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(results => {
        const resultsContainer = document.getElementById("researchResults");
        resultsContainer.innerHTML = ""; // Clear previous results

        if (results.error) {
            resultsContainer.innerHTML = "Erreur lors de la recherche du projet.";
        } else {
            results.forEach(result => {
                const title = result.title;
                const link = result.lien;
                const description = result.description;

                const projectElement = document.createElement("div");
                projectElement.innerHTML = `<h3><a href="${link}">${title}</a></h3><p>${description}</p>`;
                resultsContainer.appendChild(projectElement);
            });
        }
    })
    .catch(error => {
        console.error('Erreur lors de la recherche:', error);
        const resultsContainer = document.getElementById("researchResults");
        resultsContainer.innerHTML = "Erreur lors de la recherche.";
    });
}