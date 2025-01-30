let loginBtn = document.querySelector('.loginBtn');
let registerBtn = document.querySelector('.registerBtn');

let loginForm = document.querySelector('#login');
let registerForm = document.querySelector('#register');


registerBtn.addEventListener('click', function(){
    document.querySelector('.loginSelector').classList.add('registerSelector');
    loginForm.classList.add('displayNone');
    registerForm.classList.remove('displayNone');
});

loginBtn.addEventListener('click', function(){
    document.querySelector('.loginSelector').classList.remove('registerSelector');
    registerForm.classList.add('displayNone');
    loginForm.classList.remove('displayNone');

})