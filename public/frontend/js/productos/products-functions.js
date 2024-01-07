//FUNCTION PRODUCTOS

let showDiv;
let radioUncheck;

function showElement(){

    showDiv.classList.remove('displayNone');
    showDiv.classList.remove('divHidden');
        showDiv.scrollIntoView({block: 'center',  behavior: 'smooth'});
        setTimeout(function () {
        showDiv.classList.add('divShow');
    }, 30);
  
};


function showSideBarProd(){
let sideBarInner = document.querySelector('.price-product');
    sideBarInner.classList.remove('displayNone');
    sideBarInner.classList.remove('divHidden');
};


function hideElement(){
    showDiv.classList.add('divHidden');
    showDiv.classList.add('displayNone');
    showDiv.classList.remove('divShow');
};



// function radioUncheckF(){
//     radioUncheck.forEach(function(e){
//         e.checked = false;
//     });
// }


// function hideShortDesc(){
//     shortDescText.classList.add("displayNone");
//     charsProdTitle.classList.add("displayNone");
//     charsProdDesc.classList.add("displayNone");
//     titleTiempoEntrega.classList.add("displayNone");
//     textTiempoEntrega.classList.add("displayNone");
//     auxiliarText.classList.add("displayNone");
// }


function test(){
    pDesc = document.createElement('p');
    // pDesc.textContent = "9 a 15 días + envío";
    // pDesc.classList.add('text-desc');
    shortDesc.appendChild(pDesc);
}



function notesHide(){

    notesMain.classList.add('displayNone');
    notes.classList.remove('divShow');
}




function ecovasosCharsHide(){

    ecovasosMain.classList.add('displayNone');

    ecovasosChars.forEach(element => {
        element.classList.remove('divShow');
    });

    let radioUncheck = document.querySelectorAll('#ecovasos-chars input');

    radioUncheck.forEach(function(e){
        e.checked = false;});
}



function bolsas1CharsHide(){

    bolsas1Main.classList.add('displayNone');
    bolsas1Main.classList.add('divHidden');

    bolsas1Chars.forEach(element => {
        element.classList.remove('divShow');
    });

    let radioUncheck = document.querySelectorAll('#bolsasReutilizables-chars input');

    radioUncheck.forEach(function(e){
        e.checked = false;});

}


function bolsas2CharsHide(){

    bolsas2Main.classList.add('displayNone');

    bolsas2Chars.forEach(element => {
        element.classList.remove('divShow');
    });


    //PONER UNCHECK
    // let radioUncheck = document.querySelectorAll('#bolsasReutilizables-chars input');

    // radioUncheck.forEach(function(e){
    //     e.checked = false;});

}


function sorbetesCharsHide(){

    sorbetesMain.classList.add('displayNone');

    sorbetesChars.forEach(element => {
        element.classList.remove('divShow');
    });

    
    let radioUncheck = document.querySelectorAll('#sorbetes-chars input');

    radioUncheck.forEach(function(e){
        e.checked = false;});

}


function fraperasCharsHide(){

    fraperasMain.classList.add('displayNone');

    fraperasChars.forEach(element => {
        element.classList.remove('divShow');
    });

    //PONER UNCHECK
    let radioUncheck = document.querySelectorAll('#fraperas-chars input');

    radioUncheck.forEach(function(e){
        e.checked = false;});

}

function designOrderCharsHide(){

    designOrderMain.classList.add('displayNone');

    designOrderChars.forEach(element => {
        element.classList.remove('divShow');
    });

    //PONER UNCHECK
    let radioUncheck = document.querySelectorAll('#designOrder-chars input');

    radioUncheck.forEach(function(e){
        e.checked = false;});

}

function comboCharsHide(){

    comboMain.classList.add('displayNone');

    comboChars.forEach(element => {
        element.classList.remove('divShow');
    });

    // //PONER UNCHECK
    let radioUncheck = document.querySelectorAll('#combo-chars input');

    radioUncheck.forEach(function(e){
        e.checked = false;});

}
