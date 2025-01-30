    // X MODAL

    const body = document.querySelector('body');

    const xModal = document.querySelector('.xmodal');
    const xModalContainer = document.querySelector('.xmodalContainer');
    const xModalClose = document.querySelector('.xmodalClose');





    document.addEventListener('click', function(e){

        let x = e.target;


        // OPEN ORDER DESIGN MODAL
        if(x.classList.contains('btnOrderDesign')){
            xModal.classList.remove('displayNone');
            body.classList.add('noScroll');
            document.querySelector('.desingModalOrder').classList.remove('displayNone');
        }


        // OPEN ORDER DESIGN MODAL
        if(x.classList.contains('btnEnvio')){
            
            xModal.classList.remove('displayNone');
            body.classList.add('noScroll');
            document.querySelector('.envioModal').classList.remove('displayNone');
        }



        // close MODAL

      

        // CLOSE WITH CLOSE BUTTON
        if(x.classList.contains('xmodalClose')){
            xModal.classList.add('displayNone');
            body.classList.remove('noScroll');
            document.querySelector('.desingModalOrder').classList.add('displayNone');
            document.querySelector('.envioModal').classList.add('displayNone');
        }


         // CLOSE with Click outside


         if(x === xModalContainer.parentElement){
            xModal.classList.add('displayNone');
            body.classList.remove('noScroll');
            document.querySelector('.desingModalOrder').classList.add('displayNone');
            document.querySelector('.envioModal').classList.add('displayNone');
        }



    });


    // close with ESC 
    document.addEventListener('keydown', function(e){
        if(e.key === 'Escape'){
            xModal.classList.add('displayNone');
            body.classList.remove('noScroll');

            document.querySelector('.desingModalOrder').classList.add('displayNone');
            document.querySelector('.envioModal').classList.add('displayNone');

        }

       


    })