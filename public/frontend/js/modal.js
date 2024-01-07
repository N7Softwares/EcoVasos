let modalBtn = document.querySelectorAll('.modalBtn');
let modalOuter = document.querySelector('.modalOuter');
let closeModal = document.querySelectorAll('.closeModal');
let modalBg = document.querySelector('.modalBg');
let body = document.querySelector('body');

console.log(body);
// function ModalOpen(){

    modalBtn.forEach(element =>{

        element.addEventListener('click', function(event){
            document.body.classList.add('noScroll');
            let btn = event.currentTarget;
            let modalOuter = btn.nextElementSibling;
            modalOuter.classList.remove('displayNone');
            document.querySelector('.modalBg').classList.add('modalBgOpen');

        });
    
    }) ;

    function close_Modal(){
        document.querySelectorAll('.modalOuter').forEach(e =>{ 
            e.classList.add('displayNone');
            modalBg.classList.remove('modalBgOpen');
            document.getElementsByTagName('body').classList.remove('noScroll');
        });
    };

    modalBg.addEventListener('click', ()=>{
        close_Modal();
    });

    closeModal.forEach(e =>{
        
        e.addEventListener('click', function(){
            close_Modal();
        });
    });








