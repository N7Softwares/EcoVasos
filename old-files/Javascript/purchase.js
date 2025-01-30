document.addEventListener('click', function(e){
    let x = e.target;

    if (x.classList.contains('deleteItemBtn')){
        x.closest('.itemBox').remove();
    }


    if(x.classList.contains('addOrder')){
        document.querySelector('.addOrder').classList.add('displayNone');
        document.querySelector('.orderAdded').classList.remove('displayNone');
        xModal.classList.add('displayNone');
        body.classList.remove('noScroll');
        document.querySelector('.desingModalOrder').classList.add('displayNone');
    }

    if(x.classList.contains('deleteOrder')){
        document.querySelector('.addOrder').classList.remove('displayNone');
        document.querySelector('.orderAdded').classList.add('displayNone');
    }


})







const codigoDescuento = document.querySelector('.codigoDescuento p');


codigoDescuento.addEventListener('click', (e) => {
    document.querySelector('#descuento').classList.toggle('displayNone');
    e.target.classList.toggle('activeBtn')
})


const envioBtn = document.querySelector('.envioDiv p');


envioBtn.addEventListener('click', (e) => {
    document.querySelector('#envio').classList.toggle('displayNone');
    e.target.classList.toggle('activeBtn')
})