document.getElementById('Logout').addEventListener('click', () => {
    deleteCookie();
    window.location.reload();
});

function deleteCookie() {
    document.cookie = 'ProviHub-Token' + '=; Max-Age=-99999999;';
}