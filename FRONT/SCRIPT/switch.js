function changeContenu(contenu) {
    document.querySelector('.Page').innerHTML = contenu;
}

window.onload = function() {
    changeContenu('Contenu du bouton "Recherche"')};

document.getElementById('addprojet').addEventListener('click', function() {
    changeContenu('Contenu du bouton "addprojet"');
});

document.getElementById('Recherche').addEventListener('click', function() {
    changeContenu('Contenu du bouton "Recherche"');
});

document.getElementById('Login').addEventListener('click', function() {
    changeContenu(`
        <div class="loginForm">
            <form>
                <p class="formTitle"><strong>Se connecter</strong></p>
                <label for="Username">Nom d'utilisateur</label>
                <input type="text" name="Username" id="LogUsername_input">
                <label for="Password">Mot de passe</label>
                <input type="password" name="Password" id="LogPassword_input">
                <div class="LogcontainerSelector">
                    <div id="SubmitLogin" onclick="submitLogin()">Se connecter</div>
                </div>
                <div id="resultLogin" style="color: red; margin: 2%;"></div>
            </form>
        </div>
    `);
});

document.getElementById('Register').addEventListener('click', function() {
    changeContenu(`
        <div class="loginForm">
            <form action="POST">
                <p class="formTitle"><strong>Créer un compte</strong></p>
                <label for="Username">Nom d'utilisateur</label>
                <input type="text" name="Username" id="RegUsername_input">
                <label for="Password">Mot de passe</label>
                <input type="password" name="Password" id="RegPassword_input">
                <div class="LogcontainerSelector">
                    <div id="submitRegister" onclick="submitRegister()">Créer un compte</div>
                </div>
                <div id="resultRegister" style="color: red; margin: 2%;"></div>
            </form>
        </div>
    `);
});