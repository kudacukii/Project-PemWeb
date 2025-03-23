// auth.js
export function updateAuthButtons() {
    const authButtons = document.getElementById('authButtons');
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    authButtons.innerHTML = loggedInUser
        ? `<button onclick="logout()" class="logout-button">Logout</button>`
        : `<a href="../html/login.html" class="login-button">Login</a>`;
}

export function logout() {
    sessionStorage.removeItem('loggedInUser');
    alert('Anda telah logout.');
    window.location.href = '../html/Bantoo!.html';
}

export function checkLogin() {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        alert('Anda harus login terlebih dahulu!');
        window.location.href = '../html/login.html';
    }
}

document.addEventListener('DOMContentLoaded', updateAuthButtons);
