async function fetchUser() {
    const username = document.getElementById('username').value;
    const userNameInput = document.getElementById('username')
    const profileDiv = document.getElementById('profile');
    profileDiv.innerHTML = ''; // Limpia el usuario previo
    
    // Manejo de error en caso de no ingresar ningun usuario
    if (!username) {
        profileDiv.innerHTML = 'Por favor ingresa un usuario / Please enter a GitHub username.';
        return;
    }
    // Definicion de la API
    const url = `https://api.github.com/users/${username}`;

    // Logica para consumir la API
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`User not found: ${response.statusText}`);
        }
        const data = await response.json();

        const profileHTML = `
            <h2>${data.name} (${data.login})</h2>
            <img src="${data.avatar_url}" alt="${data.login}" width="100">
            <p>Repositorios publicos / Public Repos: ${data.public_repos}</p>
            <p>Seguidores / Followers: ${data.followers}</p>
            <p>Siguiendo / Following: ${data.following}</p>
            <p><a href="${data.html_url}" target="_blank">Ver Perfil en Github / View Profile on GitHub</a></p>
        `;
        profileDiv.innerHTML = profileHTML;
        
    } catch (error) {
        profileDiv.innerHTML = `Error: ${error.message}`;
    }
    
    // Limpiar el input luego de haber solicitado la informacion de un usuario
    userNameInput.value = '';
}