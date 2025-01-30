const loginBtn = document.querySelector('.login-btn');
const input = document.querySelector('.prEmail');

loginBtn.addEventListener('click', function(event){
    event.preventDefault();
        
            console.log('shit')
        
            document.querySelector('.psrInfo').classList.add('displayNone');
            document.querySelector('#passwordRecovery').classList.add('displayNone');
        
            document.querySelector('.psrMsg').classList.remove('displayNone');
    

});