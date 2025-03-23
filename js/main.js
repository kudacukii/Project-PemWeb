// main.js
import { updateAuthButtons } from './auth.js';
import { tampilkanKampanye } from './kampanye.js';
import { checkLogin } from './auth.js';

document.addEventListener('DOMContentLoaded', function () {
    updateAuthButtons();
    tampilkanKampanye();
    checkLogin();
});
