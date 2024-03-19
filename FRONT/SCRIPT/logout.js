document.getElementById('Logout').addEventListener('click', () => {
    deleteCookie('ProviHub-Token');         
    })

    function deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    
  