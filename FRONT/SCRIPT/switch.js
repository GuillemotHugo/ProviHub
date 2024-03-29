function changeContenu(contenu) {
    document.querySelector('.Page').innerHTML = contenu;
}

window.onload = function() {
    changeContenu(`
    <div class="Research">
        <input type="text" id="researchInput" placeholder="Faites votre recherche">
        <div onclick="searchProject()">Rechercher</button>
        <div id="researchResults"></div>
    </div>
    `)};

    document.getElementById('addprojet').addEventListener('click', function() {
        changeContenu(`
        <div class="addForm">
            <p class="formTitle"><strong>Ajoutez un projet</strong></p>
            <label for="Title">Title</label>
            <input type="text" name="Lien" id="addTitle_input">
            <label for="Link">Lien</label>
            <input type="text" name="text" id="addLink_input">
            <label for="Description">Description</label>
            <input type="text" name="text" id="addDescription_input">
            <div class="LogcontainerSelector">
            <div id="submitAdd" onclick="submitAdd()">Ajoutez le projet</div>
            </div>
            <div id="resultAdd" style="color: red; margin: 2%;"></div>
    </div>
        `);
    });

document.getElementById('Recherche').addEventListener('click', function() {
    changeContenu(`
    <div class="Research">
        <input type="text" id="researchInput" placeholder="Faites votre recherche">
        <div onclick="searchProject()">Rechercher</button>
        <div id="researchResults"></div>
    </div>
    `);
});


document.getElementById('Login').addEventListener('click', function() {
    changeContenu(`
        <div class="loginForm">
                <p class="formTitle"><strong>Se connecter</strong></p>
                <label for="Username">Nom d'utilisateur</label>
                <input type="text" name="Username" id="LogUsername_input">
                <label for="Password">Mot de passe</label>
                <input type="password" name="Password" id="LogPassword_input">
                <div class="LogcontainerSelector">
                    <div id="SubmitLogin" onclick="submitLogin()">Se connecter</div>
                </div>
                <div id="resultLogin" style="color: red; margin: 2%;"></div>
        </div>
    `);
});

document.getElementById('Register').addEventListener('click', function() {
    changeContenu(`
        <div class="RegForm">
                <p class="formTitle"><strong>Créer un compte</strong></p>
                <label for="Username">Nom d'utilisateur</label>
                <input type="text" name="Username" id="RegUsername_input">
                <label for="Password">Mot de passe</label>
                <input type="password" name="Password" id="RegPassword_input">
                <div class="LogcontainerSelector">
                    <div id="submitRegister" onclick="submitRegister()">Créer un compte</div>
                </div>
                <div id="resultRegister" style="color: red; margin: 2%;"></div>
        </div>
    `);
});
