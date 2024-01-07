let shipping = document.querySelector('.formasEnvio');
let op1 = document.querySelector('.opCorreo');
let op2 = document.querySelector('.opAcordarEnvio');
let op3 = document.querySelector('.opPuntoEntrega');
// let openMore = document.querySelector('.openMore');
let opEnvioCorreo = document.querySelector('.opEnvioCorreo');
let cpForm = document.querySelector('.cpForm');
let btnEnvio = document.querySelector('.btnEnvio');
let envioCorreo = document.querySelector('.envioCorreo');
let envioDatosDestinatario = document.querySelector('.envioDatosDestinatario');
// let direccionDestinatario = document.querySelector('.direccionDestinatario');
let datosEnvio = document.querySelector('.datosEnvio');
let datosRetiro = document.querySelector('.datosRetiro');
let envioLi = document.querySelector('.envioLi');
let envioPrice = document.querySelector('.envioPrice');

let divBtnStep1 = document.querySelector('.divBtnStep1');
const nextStep1 = document.querySelector('.nextStep1');
let secondStep = document.querySelector('.secondStep');
let firstStep = document.querySelector('.firstStep');
let btnPrevStep = document.querySelector('.btnPrevStep');
const prevStep1 = document.querySelector('.prevStep1');

shipping.addEventListener('change', shippingMode);

let bcEntrega = document.querySelector('.bcEntrega')
let bcPago = document.querySelector('.bcPago')
let bcPreview = document.querySelector('.bcPreview')

let paymentDiscount = document.querySelector('.paymentDiscount')

function shippingMode(e){
    
    let i = document.querySelectorAll('.opEnvio input')
    
    

    i.forEach(i =>{

        switch(e.target.value){
            case 'Correo':
                op1.classList.remove('nonChecked')
                op2.classList.add('nonChecked')
                op3.classList.add('nonChecked')

                op1.classList.add('checkedRadio')
                op2.classList.remove('checkedRadio')
                op3.classList.remove('checkedRadio')
                
                opEnvioCorreo.classList.remove('displayNone');

                cpForm.classList.remove('displayNone');

                envioDatosDestinatario.classList.add('displayNone');
                datosEnvio.classList.add('displayNone');

                datosRetiro.classList.add('displayNone');
                
                break;

            case 'Acordar envío':
                op1.classList.add('nonChecked')
                op2.classList.remove('nonChecked')
                op3.classList.add('nonChecked')

                op1.classList.remove('checkedRadio')
                op2.classList.add('checkedRadio')
                op3.classList.remove('checkedRadio')

                opEnvioCorreo.classList.remove('displayNone');

                document.querySelector('.datosDestinatario').classList.add('displayNone');
                envioDatosDestinatario.classList.remove('displayNone');
                datosEnvio.classList.remove('displayNone');

                envioLi.classList.add('displayNone');
                envioPrice.innerHTML = 0;
                cartSum();
                uncheckEnvio();
                
                    
                cpForm.classList.add('displayNone');
                envioCorreo.classList.add('displayNone');
                    
                datosRetiro.classList.add('displayNone');

                divBtnStep1.classList.remove('displayNone');
                    

                break;

            case 'Punto de entrega':
            
                op1.classList.add('nonChecked')
                op2.classList.add('nonChecked')
                op3.classList.remove('nonChecked')

                op1.classList.remove('checkedRadio')
                op2.classList.remove('checkedRadio')
                op3.classList.add('checkedRadio')

                opEnvioCorreo.classList.remove('displayNone');

                envioCorreo.classList.add('displayNone');
                datosRetiro.classList.remove('displayNone')

                envioPrice.innerHTML = 0;
                envioLi.classList.add('displayNone');
                cartSum();
                uncheckEnvio()

                    
                cpForm.classList.add('displayNone');
                envioCorreo.classList.add('dispalyNone');

                envioDatosDestinatario.classList.add('displayNone');
                datosEnvio.classList.add('displayNone');



                divBtnStep1.classList.remove('displayNone');
            
                break;
        }
    })


}








btnEnvio.addEventListener('click', (e)=>{
    e.preventDefault();
    envioCorreo.classList.remove('displayNone');
    divBtnStep1.classList.remove('displayNone')


});


document.querySelector('.tipoEnvioCorreo').addEventListener('change', ()=>{


    let envioDomicilio = document.querySelector('.envioDomicilio');

    envioDatosDestinatario.classList.remove('displayNone');
    datosEnvio.classList.remove('displayNone');
    if(envioDomicilio.checked){

    } else{

            // datosEnvio.classList.add('displayNone');

    }


    let correoX = document.querySelectorAll('.correoOption input');

correoX.forEach(option =>{ 
    
    if(option.checked){
        
        let rDireccionSucursal = document.querySelector('.rDireccionSucursal');

        switch(option.value){

            case 'Retiro en sucursal':
                document.querySelector('.datosDestinatario').classList.add('displayNone');
                break;
            
            case 'Envío a domicilio':
                document.querySelector('.datosDestinatario').classList.remove('displayNone');
                break;
            }
        }
    });

});




//change and look for the price 

document.querySelector('.tipoEnvioCorreo').addEventListener('change', ()=>{

    let a = document.querySelectorAll('.tipoEnvioCorreo input');

    a.forEach( (input)=>{

        if(input.checked){
            
            let p = input.parentNode;

            p.classList.add('pukki');

            envioLi.classList.remove('displayNone');

            let v = document.querySelector('.pukki .costoEnvio')

            let f = document.querySelector('.envioPrice');

            f.innerHTML = 0;
            
            f.innerHTML = v.innerHTML;

            cartSum();

            


        } else{

            let p = input.parentNode;

            p.classList.remove('pukki')
            
        }

    })

})





// sum the elements


function cartSum(){

    let Vbx = document.querySelectorAll('.itemPrice');

    let suma = 0;

    Vbx.forEach(element => {
        let x = parseFloat(element.innerHTML);
        suma += x;        

    })
    
    let cartTotal = document.querySelector('.cartTotal');
    cartTotal.innerText = suma;

}

cartSum();


function uncheckEnvio(e){

    let a = document.querySelectorAll('.tipoEnvioCorreo input');

    a.forEach(input =>{
        input.checked = false;
    })

}












// END FIRST STEP
//SECOND STEP BUTTON

let nombreDestinatario = document.querySelector('#nombreDestinatario')
let apellidoDestinatario = document.querySelector('#apellidoDestinatario')
let dniDestinatario = document.querySelector('#dniDestinatario')
let telDestinatario = document.querySelector('#telDestinatario')


function removeAlerts(){
    let m = document.querySelectorAll('form input .msgAlert');

    if(m){
        console.log(m)
        // m.remove();
    }

}


nextStep1.addEventListener('click', ()=>{

    
    checkCash();
    
    let i = document.querySelectorAll('#formasEnvio ul li input')
    
    i.forEach(i =>{
        
        // let r = i;
        let methTitle = document.querySelector('.methTitle')
        // console.log(r.value)

        if(i.checked){
            switch(i.value){
            
                case 'Correo':    
    
                        let z = document.querySelectorAll('.correoOption input');
    
                        z.forEach(option =>{ 
    
                            if(option.checked){
                                switch(option.value){
    
                                        
                                    case 'Envío a domicilio':
    
                                        validateDireccion();
                                        datosDestinatario();
                                        direccionDestinatario();
                                        validateDatosNext2();
                                        methTitle.innerText = 'Datos de envío'
                                        break;
                                        
                                    case 'Retiro en sucursal':
                                    validateDatosEnvio();
                                    datosDestinatario();
                                    cleanPreview();
                                    validateDatosNext1();
                                    methTitle = 'Datos de quien retira';
                                    break;
                                        
                                }
                            }
                        });
    
                    case 'Acordar envío':
                        validateDatosEnvio();
                        datosDestinatario();
                        validateDatosNext1();
                        cleanPreview();
                        methTitle = 'Datos de quien retira';
                        break;
                    
                    case 'Punto de entrega':
                        validateDatosRetiro();
                        validateDatosNext3()
                        datospRetiro();
                        cleanPreview();
                        methTitle = 'Datos de quien retira';
                        break;
    
                }
        }
        });

});



function checkCash(){

        let n = document.querySelector('#opPuntoEntrega');
        let efectivo = document.querySelector('.opCash');

        if(n.checked){
            document.querySelector('.pmCash').classList.remove('disabledInput');
            efectivo.disabled = false;
        } else{
            document.querySelector('.pmCash').classList.add('disabledInput');
            efectivo.disabled = true;
        }
}




//SECOND STEP BUTTON


// SECOND STEP : FACTURACIÓN

document.querySelector('.rememberme-div').addEventListener('change', e =>{

    let x = document.querySelector('.rememberme-div input')
    if(x.checked){
        
        document.querySelector('.datosFacturacion').classList.add('displayNone');
        
    } else{

        document.querySelector('.datosFacturacion').classList.remove('displayNone');
        
    }

})




// SECOND STEP : PAYMENT METHOD

let pm1 = document.querySelector('.pmCard');
let pm2 = document.querySelector('.pmBank');
let pm3 = document.querySelector('.pmCash');

// let btnMore2 = document.querySelector('.openMore2');

let methodCard = document.querySelector('.methodCard');


document.querySelector('#pMethod').addEventListener('change', paymentMethod)


function paymentMethod(e){

    let p = document.querySelectorAll('.typePayment input');
    
    let nm = document.querySelector('.paymentDiscount .porcentaje');

    let j = document.querySelector('.mPaymenetInfo')

    p.forEach(p =>{

        switch(e.target.value){

            case 'Tarjeta de Crédito o Débito':

                pm1.classList.add('checkedRadio');
                pm2.classList.remove('checkedRadio');
                pm3.classList.remove('checkedRadio');

                pm1.classList.remove('nonChecked');

                // btnMore2.classList.remove('displayNone');
            

                methodCard.classList.remove('displayNone');

                pm2.classList.add('nonChecked');
                pm3.classList.add('nonChecked');
                
                nm.innerHTML = 0;
                nm = 0;

                j.innerHTML = e.target.value;

                break;

            case 'Transferencia Bancaria':


                pm1.classList.remove('checkedRadio');
                pm2.classList.add('checkedRadio');
                pm3.classList.remove('checkedRadio');

                pm2.classList.remove('nonChecked');

                // btnMore2.classList.remove('displayNone');


                pm1.classList.add('nonChecked');
                pm3.classList.add('nonChecked');
            
                methodCard.classList.add('displayNone');

                // DESCUENTO
                let k = document.querySelector('.pDiscount1');
                paymentDiscount.classList.remove('displayNone');
                nm.innerText = k.innerText;

                j.innerHTML = e.target.value;

                break;

            case 'Efectivo':

                pm1.classList.remove('checkedRadio');
                pm2.classList.remove('checkedRadio');
                pm3.classList.add('checkedRadio');

                pm3.classList.remove('nonChecked');

                // btnMore2.classList.remove('displayNone');

                methodCard.classList.add('displayNone');

                pm1.classList.add('nonChecked');
                pm2.classList.add('nonChecked');


                // DESCUENTO

                let n = document.querySelector('.pDiscount2');
                paymentDiscount.classList.remove('displayNone');
                nm.innerText = n.innerText;

                j.innerHTML = e.target.value;

                break;
        }

    })

}


//PREVSTEP1


prevStep1.addEventListener('click', ()=>{

    firstStep.classList.remove('displayNone')
    secondStep.classList.add('displayNone')

    bcEntrega.classList.add('bcActive');
    bcPago.classList.remove('bcActive');
    bcPreview.classList.remove('bcActive');

})



let nextStep2 = document.querySelector('.nextStep2');
let thirdStep = document.querySelector('.thirdStep');

nextStep2.addEventListener('click', e =>{
    
    let p = document.querySelectorAll('.typePayment input');

    window.scrollTo(0,0);
    bcEntrega.classList.remove('bcActive');
    bcPago.classList.remove('bcActive');
    bcPreview.classList.add('bcActive');

    p.forEach(p =>{
        
        if(p.checked){
            switch(p.value){
            
                case 'Tarjeta de Crédito o Débito':
                    thirdStep.classList.remove('displayNone');
                    secondStep.classList.add('displayNone');

    
                    break;
    
                case 'Transferencia Bancaria':
                    thirdStep.classList.remove('displayNone')
                    secondStep.classList.add('displayNone')
    
                    break;
    
                case 'Efectivo':
    
                    thirdStep.classList.remove('displayNone')
                    secondStep.classList.add('displayNone')
                    break;
            }
        }

    })

})

let prevStep2 = document.querySelector('.prevStep2');

prevStep2.addEventListener('click', e =>{

    secondStep.classList.remove('displayNone')
    thirdStep.classList.add('displayNone')

    bcEntrega.classList.remove('bcActive')
    bcPago.classList.add('bcActive')
    bcPreview.classList.remove('bcActive')

})




// NEXTSTEP 3

let nextStep3 = document.querySelector('.nextStep3');

nextStep3.addEventListener('click', e=>{


    document.querySelector('.purchaseConfirmation').classList.remove('displayNone');
    document.querySelector('.pMain').classList.add('displayNone');
    document.querySelector('.pSideBar').classList.add('displayNone');
    document.querySelector('.breadcrumbForm').classList.add('displayNone');
    thirdStep.classList.add('displayNone');
    

    let p = document.querySelectorAll('.typePayment input');
    
    p.forEach(p =>{

        if(p.checked){
            
            window.scrollTo(0,0);

            switch(p.value){
    
                case 'Tarjeta de Crédito o Débito':
                
                    document.querySelector('.alertCard').classList.remove('displayNone')
                    setTimeout(function(){
                        document.querySelector('.alertCard .alert1 .imgPurchase').classList.remove('hiddenScaleGrow')
                        document.querySelector('.alertCard .alert2 .imgPurchase').classList.remove('hiddenScaleGrow')
                    },50)
                    setTimeout(function(){
                        document.querySelector('.alertCard .alert1 .alertTitle').classList.remove('hiddenOpacity')
                        document.querySelector('.alertCard .alert1 .alertP').classList.remove('hiddenOpacity')
                        
                        document.querySelector('.alertCard .alert2 .alertTitle').classList.remove('hiddenOpacity')
                        document.querySelector('.alertCard .alert2 .alertP').classList.remove('hiddenOpacity')
                    },80);
    
                    break;
    
                case 'Transferencia Bancaria':
                    

                    document.querySelector('.alertBankTrasnfer').classList.remove('displayNone')
                    setTimeout(function(){
                        document.querySelector('.alertBankTrasnfer .imgPurchase').classList.remove('hiddenScaleGrow')
                    },50)
                    setTimeout(function(){
                        document.querySelector('.alertBankTrasnfer .alertTitle').classList.remove('hiddenOpacity')
                        document.querySelector('.alertBankTrasnfer .alertP').classList.remove('hiddenOpacity');
                    },80)
                    
    
                    break;
    
                case 'Efectivo':
                        
                    document.querySelector('.alertCash').classList.remove('displayNone')
                        setTimeout(function(){
                            document.querySelector('.alertCash .imgPurchase').classList.remove('hiddenScaleGrow')
                        },50)
                        setTimeout(function(){
                            document.querySelector('.alertCash .alertTitle').classList.remove('hiddenOpacity')
                            document.querySelector('.alertCash .alertP').classList.remove('hiddenOpacity');
                        },80)

                    break;
            }

        }

    })

})






let prevStep3 = document.querySelector('.prevStep3')

prevStep3.addEventListener('click', ()=>{

    document.querySelector('.purchaseConfirmation').classList.add('displayNone');
    document.querySelector('.pMain').classList.remove('displayNone');
    document.querySelector('.pSideBar').classList.remove('displayNone');
    document.querySelector('.breadcrumbForm').classList.remove('displayNone');
    thirdStep.classList.remove('displayNone');


    bcEntrega.classList.remove('bcActive')
    bcPago.classList.remove('bcActive')
    bcPreview.classList.add('bcActive')


    //TARJETA

    document.querySelector('.alertCard').classList.add('displayNone')
    document.querySelector('.alertCard .alert1 .imgPurchase').classList.add('hiddenScaleGrow')
    document.querySelector('.alertCard .alert2 .imgPurchase').classList.add('hiddenScaleGrow')
    document.querySelector('.alertCard .alert1 .alertTitle').classList.add('hiddenOpacity')
    document.querySelector('.alertCard .alert1 .alertP').classList.add('hiddenOpacity')
    document.querySelector('.alertCard .alert2 .alertTitle').classList.add('hiddenOpacity')
    document.querySelector('.alertCard .alert2 .alertP').classList.add('hiddenOpacity')

    // TRANSFERENCIA

    document.querySelector('.alertBankTrasnfer').classList.add('displayNone')
    document.querySelector('.alertBankTrasnfer .imgPurchase').classList.add('hiddenScaleGrow')
    document.querySelector('.alertBankTrasnfer .alertTitle').classList.add('hiddenOpacity')
    document.querySelector('.alertP').classList.add('hiddenOpacity');

    // EFECTIVO

    document.querySelector('.alertCash').classList.add('displayNone')
    document.querySelector('.alertCash .imgPurchase').classList.add('hiddenScaleGrow')
    document.querySelector('.alertCash .alertTitle').classList.add('hiddenOpacity')
    document.querySelector('.alertP').classList.add('hiddenOpacity');

})














// REVISION

    nextStep1.addEventListener('click', ()=>{
    // document.querySelector('#site-branding').addEventListener('click', ()=>{


        let envio = document.querySelectorAll('.formasEnvio input');

        envio.forEach(envio =>{
            
            let x = document.querySelector('.mShippingInfo');
            
            if(envio.checked){
                x.innerText = envio.value;

                if(envio.value == 'Correo'){
                    
                    let z = document.querySelectorAll('.correoOption input');

                    z.forEach(option =>{ 
                        
                        if(option.checked){
                            
                            let rDireccionSucursal = document.querySelector('.rDireccionSucursal');

                            switch(option.value){

                                case 'Retiro en sucursal':
                                    

                                    rDireccionSucursal.classList.remove('displayNone');

                                    let a = document.querySelector('.pukki .localidadEnvio');
                                    let b = document.querySelector('.pukki .direccionSucursal');

                                    rDireccionSucursal.innerText = `${a.innerText} - ${b.innerText}`

                                    break;

                                case 'Envío a domicilio':

                                    rDireccionSucursal.classList.remove('displayNone');
                                    break;

                            }

                        }
                        
                    })



                }
            }

        })

    })



// function metodoPago(){
//     nextStep1.addEventListener('click', ()=>{
        
//     })
// }

function datosDestinatario(){

    let nombreDestinatario = document.querySelector('#nombreDestinatario');
    let apellidoDestinatario = document.querySelector('#apellidoDestinatario');
    let dniDestinatario = document.querySelector('#dniDestinatario');
    let telDestinatario = document.querySelector('#telDestinatario');
        // nombre y apellido

        let bsk = document.querySelector('.rNombre');
        bsk.innerText = nombreDestinatario.value + ' ' + apellidoDestinatario.value;

        // documento y domicilio
        let rDocumento = document.querySelector('.rDocumento');
        rDocumento.innerText = `DNI ${dniDestinatario.value}`;
        
        let rTelefono = document.querySelector('.rTelefono');
        rTelefono.innerText = `Teléfono ${telDestinatario.value}`;
}


// document.querySelector('header').addEventListener('click', ()=>{
//     datosDestinatario();
//     direccionDestinatario();
// })

function direccionDestinatario(){

    let direccionCalle = document.querySelector('#direccionCalle');
    let direccionNumero = document.querySelector('#direccionNumero');
    let pisoDestinatario = document.querySelector('#pisoDestinatario');
    let dptoDestinatario = document.querySelector('#dptoDestinatario');
    let ciudadDestinatario = document.querySelector('#ciudadDestinatario');
    let provinciaDestinatario = document.querySelector('.provinciaDestinatario .selected');
    
    let direccionTitle = document.querySelector('.direccionTitle')
    
    direccionTitle.innerText = 'Dirección de entrega';
    
    
    
    // let rDireccion = document.querySelector('.rDireccion');

    let rDireccion;
    rDireccion = `${direccionCalle.value} ${direccionNumero.value}`

    if(pisoDestinatario.value.length > 0){
        rDireccion += " Piso " + pisoDestinatario.value;
    } else{};

    if(dptoDestinatario.value.length > 0){
        rDireccion += " " + dptoDestinatario.value;
    }else{};


    rDireccion += `, ${ciudadDestinatario.value}, ${provinciaDestinatario.innerText}`;
    

    document.querySelector('.rDireccion').innerText = rDireccion


    console.log(rDireccion)
}


function datospRetiro(){

    let nombreRetiro = document.querySelector('#nombreRetiro');
    let apellidoRetiro = document.querySelector('#apellidoRetiro');
    let dniRetiro = document.querySelector('#dniRetiro');
    let telRetiro = document.querySelector('#telRetiro');
        // nombre y apellido

        let bsk = document.querySelector('.rNombre');
        bsk.innerText = nombreRetiro.value + ' ' + apellidoRetiro.value;

        // documento y domicilio
        let rDocumento = document.querySelector('.rDocumento');
        rDocumento.innerText = `DNI ${dniRetiro.value}`;
        
        let rTelefono = document.querySelector('.rTelefono');
        rTelefono.innerText = `Teléfono ${telRetiro.value}`;



}

function cleanPreview(){
    let rDireccion = document.querySelector('.rDireccion');
    rDireccion.innerText = "";
    let nombreRetiro = document.querySelector('#nombreRetiro');
    nombreRetiro.innerText = "";
    let apellidoRetiro = document.querySelector('#apellidoRetiro');
    apellidoRetiro.innerText = "";
    let dniRetiro = document.querySelector('#dniRetiro');
    dniRetiro.innerText = "";
    let telRetiro = document.querySelector('#telRetiro');
    telRetiro.innerText = "";
    let rDireccionSucursal = document.querySelector('.rDireccionSucursal');
    rDireccionSucursal.innerText = "";
    let mPaymenetInfo = document.querySelector('.mPaymenetInfo');
    mPaymenetInfo.innerText = "";
    let direccionTitle = document.querySelector('.direccionTitle');
    direccionTitle.innerText = '';
}






























// VALIDATE FUNCTIONS


function validateDatosEnvio(){
    let inputDatosEnvio = document.querySelectorAll('#datosEnvio input');

    inputDatosEnvio.forEach(e =>{
        let m = document.querySelectorAll('#datosEnvio .msgAlert');

        if(m){
            
            m.forEach( m =>{
                m.remove();
            });

        } else{
            console.log('nop')
        }
    })

    inputDatosEnvio.forEach(e =>{

        if(e.hasAttribute('required')){
            
            if(e.value.length > 0){
            }else{
                let msgAlert = document.createElement('p');
                msgAlert.classList.add('msgAlert');
                msgAlert.innerText = '*Requerido';
                
                let dmsg = e.parentElement;
                
                dmsg.appendChild(msgAlert)
            }

        }
    });
}


function validateDatosNext1(){
    if(nombreDestinatario.value.length > 0 && apellidoDestinatario.value.length > 0 && dniDestinatario.value.length > 0 && telDestinatario.value.length > 0){

        firstStep.classList.add('displayNone');
        secondStep.classList.remove('displayNone');
    
        bcEntrega.classList.remove('bcActive');
        bcPago.classList.add('bcActive');
        bcPreview.classList.remove('bcActive');

        window.scrollTo(0,0);
    }
}


function validateDireccion(){

    validateDatosEnvio();

    let inputLocation = document.querySelectorAll('#direccionDestinatario input');

    inputLocation.forEach(e =>{
        let m = document.querySelectorAll('#direccionDestinatario .msgAlert');

        if(m){
            
            m.forEach( m =>{
                m.remove();
            });

        } else{
            console.log('nop');
        }
    })

    inputLocation.forEach(e =>{

        if(e.hasAttribute('required')){
            
            if(e.value.length > 0){
                return;
            }else{
                let msgAlert = document.createElement('p');
                msgAlert.classList.add('msgAlert');
                msgAlert.innerText = '*Requerido';
                
                let dmsg = e.parentElement;
                
                dmsg.appendChild(msgAlert)
            }

        }
    });

}



function validateDatosNext2(){
    let direccionCalle = document.querySelector('#direccionCalle')
    let direccionNumero = document.querySelector('#direccionNumero')
    let ciudadDestinatario = document.querySelector('#ciudadDestinatario')

    if(nombreDestinatario.value.length > 0 && apellidoDestinatario.value.length > 0 && dniDestinatario.value.length > 0 && telDestinatario.value.length > 0 && direccionCalle.value.length > 0 && direccionNumero.value.length > 0 && ciudadDestinatario.value.length > 0 ){

        firstStep.classList.add('displayNone');
        secondStep.classList.remove('displayNone');

        bcEntrega.classList.remove('bcActive');
        bcPago.classList.add('bcActive');
        bcPreview.classList.remove('bcActive');

        window.scrollTo(0,0);
    }

}



function validateDatosRetiro(){
    let inputDatosRetiro = document.querySelectorAll('#datosRetiro input');

    inputDatosRetiro.forEach(e =>{
        let m = document.querySelectorAll('#datosRetiro .msgAlert');

        if(m){
            
            m.forEach( m =>{
                m.remove();
            });

        } else{
            console.log('nop')
        }
    })

    inputDatosRetiro.forEach(e =>{

        if(e.hasAttribute('required')){
            
            if(e.value.length > 0){
                console.log('has something');
            }else{
                let msgAlert = document.createElement('p');
                msgAlert.classList.add('msgAlert');
                msgAlert.innerText = '*Requerido';
                
                let dmsg = e.parentElement;
                
                dmsg.appendChild(msgAlert)
            }

        }
    });
}

function validateDatosNext3(){
    let nombreRetiro = document.querySelector('#nombreRetiro')
    let apellidoRetiro = document.querySelector('#apellidoRetiro')
    let dniRetiro = document.querySelector('#dniRetiro')
    let telRetiro = document.querySelector('#telRetiro')

    if(nombreRetiro.value.length > 0 && apellidoRetiro.value.length > 0 && dniRetiro.value.length > 0 && telRetiro.value.length > 0){

        firstStep.classList.add('displayNone');
        secondStep.classList.remove('displayNone');

        bcEntrega.classList.remove('bcActive');
        bcPago.classList.add('bcActive');
        bcPreview.classList.remove('bcActive');

        window.scrollTo(0,0);
    }

}


