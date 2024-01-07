// PRODUCTOS CARACTERISTICAS

let carouselSelection = document.querySelector('.select-carousel');
let ecovasos = document.querySelector('#ecovasos');
let bolsasFriselina = document.querySelector('#BolsasR');
let BolsasBiod = document.querySelector('#BolsasBio');
let sorbetes = document.querySelector('#Sorbetes');
let fraperas = document.querySelector('#fraperas');
let designOrder = document.querySelector('#designOrder');
let combo = document.querySelector('#comboRadio');
let diseno;

// ADDITIONAL NOTES

let notesMain = document.querySelector('#notesAdditional');
let notes = document.querySelector('#notas-adicionales');

// shortdescription

let shortDescDiv = document.querySelector('.short-description');
let shortDescText = document.querySelector('.shortDescription');
let titleTiempoEntrega = document.querySelector('.title-tiempoEntrega') ;
let textTiempoEntrega = document.querySelector('.textTiempoEntrega') ;
let auxiliarText = document.querySelector('.auxiliarText') ;
// let descAlt = document.querySelector('.short-description .auxiliarText2');
// price

let priceDiv = document.querySelector('#priceDiv');

//BUTTON

let nextBtn = document.querySelector('.next-button');


//VAR non current

let ecovasosMain = document.querySelector('#ecovasos-chars');
let ecovasosChars = document.querySelectorAll('#ecovasos-chars .char-product');
let bolsas1Main = document.querySelector('#bolsasReutilizables-chars');
let bolsas1Chars = document.querySelectorAll('#bolsasReutilizables-chars .char-product');
let bolsas2Main = document.querySelector('#bolsasBio-chars');
let bolsas2Chars = document.querySelectorAll('#bolsasBio-chars .char-product');
let sorbetesMain = document.querySelector('#sorbetes-chars');
let sorbetesChars = document.querySelectorAll('#sorbetes-chars .char-product');
let fraperasMain = document.querySelector('#fraperas-chars');
let fraperasChars = document.querySelectorAll('#fraperas-chars .char-product');
let designOrderMain = document.querySelector('#designOrder-chars');
let designOrderChars = document.querySelectorAll('#designOrder-chars .char-product');
let comboMain = document.querySelector('#combo-chars');
let comboChars = document.querySelectorAll('#combo-chars .char-product');


// CAROUSEL SELECTION


carouselSelection.addEventListener('change', ()=>{


    let carouselRadios = document.querySelectorAll('.select-carousel input');

    for (let i = 0; i < carouselRadios.length; i++){
            
        nextBtn.classList.add('disabled');
        nextBtn.disabled = true;

        
        showSideBarProd();


        if(ecovasos.checked){

        
                let selectedProduct = document.querySelector('#ecovasos-chars');
    
                selectedProduct.classList.remove('displayNone');
                selectedProduct.classList.add('currentProduct');
                
                
            
        
                    function show1(){
                        showDiv = document.querySelector('#ecovasos-size');
                    setTimeout(function(){
                        showElement();
                    },50);
                    }

                    show1();
                    
                    

                    function insertImage(){
                        document.querySelector(".image-prod img").src="./img/Productos/ecovasosimg/ecovaso.png";
                      };
                      insertImage();

                      //document.querySelector('#notas-adicionales').style.top = "1.5rem"
                      document.querySelector('#notas-adicionales').classList.add('top1-5');
                    


                    //   descAlt.classList.add('displayNone');

                      shortDescText.classList.add("displayNone");
                      titleTiempoEntrega.classList.remove('displayNone');
                      textTiempoEntrega.classList.remove('displayNone');
                      auxiliarText.classList.remove('displayNone');
                      
                      titleTiempoEntrega.textContent = "Tiempo de producción";
                      textTiempoEntrega.textContent = "4 a 7 días + envío";
                      auxiliarText.textContent = "Pedidos urgentes, comuinicarse por Whatsapp";
                      
                      //ecovasosCharsHide();
                      bolsas1CharsHide();
                      bolsas2CharsHide();
                      sorbetesCharsHide();
                      fraperasCharsHide();
                      designOrderCharsHide();
                      comboCharsHide();
                      notesHide();

                    //show Ecovasos color div

                    let sizeChecked = document.querySelectorAll('#ecovasos-size input');

                    sizeChecked.forEach(e =>{
                        
                        e.addEventListener('click', function(){
                            if(e.checked){

                                if(e.value == 'Termico'){
                                    document.querySelector(".image-prod img").src="./img/Productos/ecovasosimg/ecovasotermico.png";
                                    textTiempoEntrega.textContent = "9 a 15 días + envío";
                                }

                                showDiv = document.querySelector('#ecovasos-color');

                                showElement();

                                return;
                                }
                        })
                        
                    });

                    

                    let colorChecked = document.querySelectorAll('#ecovasos-color .options-container input');

                    colorChecked.forEach(e =>{

                        e.addEventListener('click', function(){

                            showDiv = document.querySelector('#ecovasos-personalizacion');
                            showElement();

                            console.log(e.value);
                    });

                });


                let customizationColor = document.querySelectorAll('#ecovasos-personalizacion input');

                let color1 = document.querySelector('#ecovasos-personalizacion .colorInk .selectColor1');
                let color2 = document.querySelector('#ecovasos-personalizacion .colorInk .selectColor2');

                customizationColor.forEach(e =>{
                        
                        e.addEventListener('click', function(){
                            if(e.checked){

                                if(e.value == "color1"){
                                    color1.classList.remove('displayNone');
                                    color2.classList.add('displayNone');
                                }
                                else if(e.value == "color2"){
                                    color1.classList.remove('displayNone');
                                    color2.classList.remove('displayNone');
                                }
                                
                                showDiv =  document.querySelector('#ecovasos-cantidad');

                                showElement();
                                
                                return;
                                }
                        });
                        
                    });


                    let Ecovasosquantity = document.querySelectorAll('#ecovasos-cantidad .options-container input');

                    Ecovasosquantity.forEach(e =>{


                        e.addEventListener('click', function(){

                            nextBtn.disabled = false;
                            nextBtn.classList.remove('disabled');

                            showDiv = notes;
                            showElement();
                            showDiv = notesMain;
                            showElement();



                            if(e.value == "otro"){
                                document.querySelector('.other-option').classList.remove('displayNone');

                            } else{
                                document.querySelector('.other-option').classList.add('displayNone');
                            }

                            priceDiv.classList.remove('displayNone');
                            

                        });

                    });

        

                    


                    
            
            
            
            
            
            }else{
    
                showDiv = document.querySelector('#ecovasos-size');
                document.querySelector('#ecovasos-chars').classList.add('displayNone');
                
                let radioUncheck = document.querySelectorAll('#ecovasos-chars input');
                
                radioUncheck.forEach(function(e){
                        e.checked = false;
                    });
                    
                    hideElement();
                
            }        









            // BOLSAS FRISELINA
    
            if(bolsasFriselina.checked){
            
                //console.log('bolsas de friselina');
     
                ecovasosCharsHide();
                //bolsas1CharsHide();
                bolsas2CharsHide();
                sorbetesCharsHide();
                fraperasCharsHide();
                designOrderCharsHide();
                comboCharsHide();
                notesHide();
     
                let selectedProduct = document.querySelector('#bolsasReutilizables-chars');
                selectedProduct.classList.remove('displayNone');
                selectedProduct.classList.remove('divHidden');
                 
                document.querySelector('#notas-adicionales').classList.remove('top0');
                 
     
                 // desciption
     
                 // descAlt.classList.remove('displayNone');
                 shortDescText.classList.remove("displayNone");
                 titleTiempoEntrega.classList.add('displayNone');
                 textTiempoEntrega.classList.add('displayNone');
                 auxiliarText.classList.remove('displayNone');
     
                 titleTiempoEntrega.textContent = "Tiempo de entrega"
                 textTiempoEntrega.textContent = "4 a 9 días hábiles"
     
                 shortDescText.textContent = "Hacé conocer tu empresa, tu negocio, con nuestras bolsas ecológicas personalizadas. Podés ofrecer un hermoso regalo a tus clientes y lograr una exitosa campaña publicitaria."
                 
                 descAlt = "Beige, blanca o negra, con manijas negras."
     
     
                 auxiliarText.textContent = "El precio incluye bolsa + impresión. No incluye diseño.";
     
     
                 showDiv = document.querySelector('#BolsasR-size');
                 //console.log(showDiv);
                 setTimeout(function(){
                     showElement();
                 },50);
     
     
                 document.querySelector(".image-prod img").src="./img/Productos/bolsasFriselina/bolsasFriselina1.jpg";
     
                 
                 let sizeChecked = document.querySelectorAll('#BolsasR-size input');
     
                         sizeChecked.forEach(e =>{
                             
                             e.addEventListener('click', function(){
                                 
                                 showDiv = document.querySelector('#bolsasR-color');
                                 showElement();
     
     
                                 let BFNegra = document.querySelector('.bfNegra');
                                 let BFBeige = document.querySelector('.bfBeige');
                                 let BFBlanca = document.querySelector('.bfBlanca');
     
                                 switch(e.value){
     
                                     case '35x30 cm':
                                         BFNegra.classList.add('displayNone');
                                         BFBlanca.classList.remove('displayNone');
                                         
                                         document.querySelector(".image-prod img").src="./img/Productos/bolsasFriselina/bolsasFriselina1.jpg";
     
                                         // descAlt = "Beige o blanca con manijas negras. Area de impresión: 25x16 cm."
     
                                         break;
     
                                     case '45x50 cm':
                                         BFNegra.classList.remove('displayNone');
                                         BFBlanca.classList.remove('displayNone');
     
                                         document.querySelector(".image-prod img").src="./img/Productos/bolsasFriselina/bolsasFriselina1.jpg";
     
                                         // descAlt = "Beige, blanca o negra, con manijas negras. Area de impresión: 30x20 cm."
     
                                         break;
                                     
                                     case '55x43 cm':
                                         BFBlanca.classList.remove('displayNone');
                                         BFNegra.classList.add('displayNone');
     
                                         document.querySelector(".image-prod img").src="./img/Productos/bolsasFriselina/bolsasFriselina1.jpg";
     
                                         // descAlt = "Beige o blanca con manijas negras. Area de impresión: 40x30 cm."
     
                                         break;
     
                                     case '25x32 cm':
                                         BFBlanca.classList.add('displayNone');
                                         BFNegra.classList.add('displayNone');
                                         
                                         document.querySelector(".image-prod img").src="./img/Productos/bolsasFriselina/bolsaFriselinaRinon.png";
                                         
                                         // descAlt = "Beige con manijas negras. Area de impresión: 16x18 cm."
     
                                         break;
                                         
     
                                     case '20x40 cm':
                                         BFBlanca.classList.add('displayNone');
                                         BFNegra.classList.add('displayNone');
                                         
                                         document.querySelector(".image-prod img").src="./img/Productos/bolsasFriselina/bolsaFriselinaVino.png";
                                         
                                     //    descAlt = "Beige con manijas negras. Area de impresión: 13x24 cm."
     
                                         break;
                         
                                 }
                                 
                             })
                             
                         });
     
     
                         let colorChecked = document.querySelectorAll('#bolsasR-color .options-container input');
     
                         colorChecked.forEach(e =>{
     
                             e.addEventListener('click', function(){
     
                                 showDiv = document.querySelector('#bolsasR-personalizacion');
                                 showElement();
                         });
     
                     });
     
     
     
                     customizationColor = document.querySelectorAll('#bolsasR-personalizacion input');
     
                     let color1 = document.querySelector('#bolsasR-personalizacion .colorInk .selectColor1');
                     let color2 = document.querySelector('#bolsasR-personalizacion .colorInk .selectColor2');
     
                     customizationColor.forEach(e =>{
                             
                             e.addEventListener('click', function(){
                                 if(e.checked){
     
                                     if(e.value == "color1"){
                                         color1.classList.remove('displayNone');
                                         color2.classList.add('displayNone');
                                     }
                                     else if(e.value == "color2"){
                                         color1.classList.remove('displayNone');
                                         color2.classList.remove('displayNone');
                                     }
                                     
                                     showDiv =  document.querySelector('#bolsasR-printSide');
                                     showElement();
                                     
                                     return;
                                     }
                             });
                             
                         });
     
                 
     
                         document.querySelectorAll('#bolsasR-printSide input').forEach(e =>{
     
                             e.addEventListener('click', function(){
     
                                 showDiv = document.querySelector('#bolsasR-cantidad');
                                 showElement();
                         });
     
                     });
     
     
     
                     let bolsasRquantity = document.querySelectorAll('#bolsasR-cantidad .options-container input');
     
                     bolsasRquantity.forEach(e =>{
     
     
                             e.addEventListener('click', function(){
     
                                 nextBtn.disabled = false;
                                 nextBtn.classList.remove('disabled');
     
                                 showDiv = notes;
                                 showElement();
                                 showDiv = notesMain;
                                 showElement();
     
     
                                 if(e.value == "otro"){
                                     document.querySelector('#bolsasR-cantidad .other-option').classList.remove('displayNone');
     
                                 } else{
                                     document.querySelector('#bolsasR-cantidad .other-option').classList.add('displayNone');
                                 }
     
                                 priceDiv.classList.remove('displayNone');
                                 
     
                             });
     
                         });
     
     
     
     
     
         
             }else{
     
                 let radioUncheck = document.querySelectorAll('#BolsasR-size input');
     
     
                 hideElement();
         
             }
         
    
    
    
        if(BolsasBiod.checked){

            ecovasosCharsHide();
            bolsas1CharsHide();
            // bolsas2CharsHide();
            sorbetesCharsHide();
            fraperasCharsHide();
            notesHide();
            designOrderCharsHide();
            comboCharsHide();

            console.log('bolsas biodegradables');

            document.querySelector('#notas-adicionales').classList.remove('top1-5');

            let selectedProduct = document.querySelector('#bolsasBio-chars');
    
                selectedProduct.classList.remove('divHidden');
                selectedProduct.classList.remove('displayNone');
                selectedProduct.classList.add('currentProduct');
                
                
            
        
                    function show1(){
                        showDiv = document.querySelector('#bolsasBio-size');
                        showDiv.classList.remove('displayNone');
                        showDiv.classList.remove('divHidden');
                            showDiv.scrollIntoView({block: 'center',  behavior: 'smooth'});
                            setTimeout(function () {
                            showDiv.classList.add('divShow');
                        }, 10);
                    }

                    show1();
                    
                    

                    function insertImage(){
                        document.querySelector(".image-prod img").src="./img/Productos/bolsasBiodegradables/bolsasBio.jpg";
                      };
                      insertImage();
                    


                    //   descAlt.classList.add('displayNone');

                      shortDescText.classList.remove("displayNone");
                      titleTiempoEntrega.classList.add('displayNone');
                      textTiempoEntrega.classList.add('displayNone');
                      auxiliarText.classList.remove('displayNone');


                      shortDescText.textContent = "Bolsa 100% biodegradable y compostable. Fabricada a partir de almidón de maíz. 100% de origen vegetal. Se hace tierra 180 días. Se venden por pack de 1kg."
                      



                      let sizeChecked = document.querySelectorAll('#bolsasBio-size input');

                    sizeChecked.forEach(e =>{
                        
                        e.addEventListener('click', function(){
                            if(e.checked){

                                
                                switch (e.value){
                                    case "15x20 cm":
                                        auxiliarText.textContent = "300 bolsas por pack. Lisas, sin impresión."
                                        break;

                                    case "20x30 cm":
                                        auxiliarText.textContent = "200 bolsas por pack. Resiste hasta 2.5 kg."
                                        break;
                                    
                                    case "30x40 cm":
                                        auxiliarText.textContent = "140 bolsas por pack."
                                        break;
                                    
                                    case "30x40 cm camiseta":
                                        auxiliarText.textContent = "230 bolsas por pack. Resiste hasta 4 kg."
                                        break;
                                        
                                    case "40x50 cm":
                                        auxiliarText.textContent = "120 bolsas por pack. Resiste hasta 5 kg. LA MÁS VENDIDA."
                                        break;

                                    case "45x60 cm":
                                        auxiliarText.textContent = "90 bolsas por pack."
                                        break;

                                    case "30x46 cm":
                                        auxiliarText.textContent = "50 bolsas por pack."
                                        break;

                                    case "60x90 cm":
                                        auxiliarText.textContent = "30 bolsas por pack."
                                        break;
                                }



                                showDiv = document.querySelector('#bolsasBio-cantidad');

                                showElement();

                                return;
                                }
                        })
                        
                    });



                    let bolsasQuantity = document.querySelectorAll('#bolsasBio-cantidad .options-container input');

                    bolsasQuantity.forEach(e =>{


                        e.addEventListener('click', function(){

                            nextBtn.disabled = false;
                            nextBtn.classList.remove('disabled');

                            showDiv = notes;
                            showElement();
                            showDiv = notesMain;
                            showElement();



                            if(e.value == "otro"){
                                document.querySelector('#bolsasBio-cantidad .other-option').classList.remove('displayNone');

                            } else{
                                document.querySelector('#bolsasBio-cantidad .other-option').classList.add('displayNone');
                            }

                            priceDiv.classList.remove('displayNone');
                            

                        });

                    });





        } else{

        }




        if(sorbetes.checked){
            console.log('sorbetes');
        
            


                ecovasosCharsHide();
                bolsas1CharsHide();
                bolsas2CharsHide();
                // sorbetesCharsHide();
                fraperasCharsHide();
                designOrderCharsHide();
                comboCharsHide();
                notesHide();
     
                let selectedProduct = document.querySelector('#sorbetes-chars');
                selectedProduct.classList.remove('displayNone');
                selectedProduct.classList.remove('divHidden');
                 
                 
                document.querySelector('#notas-adicionales').classList.remove('top1-5');
     
                 // desciption
     
                 // descAlt.classList.remove('displayNone');
                 shortDescText.classList.remove("displayNone");
                 titleTiempoEntrega.classList.add('displayNone');
                 textTiempoEntrega.classList.add('displayNone');
                 auxiliarText.classList.add('displayNone');
     
                 shortDescText.textContent = "Packs de 300 unidades. 100% biodegradables y libres de plástico. Apto para bebidas frías. Únicamente en marrón kraft"
     
     

                 showDiv = document.querySelector('#sorbetes-cantidad');
                 //console.log(showDiv);
                 setTimeout(function(){
                     showElement();
                 },50);


                 function insertImage(){
                    document.querySelector(".image-prod img").src="./img/Productos/sorbetes/sorbetes2.jpg";
                  };
                  insertImage();



                  let sorbetesQuantity = document.querySelectorAll('#sorbetes-cantidad .options-container input');

                  sorbetesQuantity.forEach(e =>{


                        e.addEventListener('click', function(){

                            nextBtn.disabled = false;
                            nextBtn.classList.remove('disabled');

                            showDiv = notes;
                            showElement();
                            showDiv = notesMain;
                            showElement();



                            if(e.value == "otro"){
                                document.querySelector('#sorbetes-cantidad .other-option').classList.remove('displayNone');

                            } else{
                                document.querySelector('#sorbetes-cantidad .other-option').classList.add('displayNone');
                            }

                            priceDiv.classList.remove('displayNone');
                            

                        });

                    });



        
        } else{

        }



        if(fraperas.checked){
            
            console.log('fraperas');

                ecovasosCharsHide();
                bolsas1CharsHide();
                bolsas2CharsHide();
                sorbetesCharsHide();
                // fraperasCharsHide();
                designOrderCharsHide();
                comboCharsHide();
                notesHide();
     
                let selectedProduct = document.querySelector('#fraperas-chars');
                selectedProduct.classList.remove('displayNone');
                selectedProduct.classList.remove('divHidden');
                 
                document.querySelector('#notas-adicionales').classList.remove('top1-5');
                 
     
                 // desciption
     
                 // descAlt.classList.remove('displayNone');
                 shortDescText.classList.remove("displayNone");
                 titleTiempoEntrega.classList.remove('displayNone');
                 textTiempoEntrega.classList.remove('displayNone');
                 auxiliarText.classList.add('displayNone');
     
                 shortDescText.textContent = "Frapera/champanera personalizada. De polipropileno super resistente. Se imprime de un lado con serigrafía blanca o dorada.";
     
                 titleTiempoEntrega.textContent = "Tiempo de entrega";
                 textTiempoEntrega.textContent = "10 días hábiles"

                 
                 showDiv = document.querySelector('#fraperasInk');
                    showElement();
                 


                 function insertImage(){
                    document.querySelector(".image-prod img").src="./img/Productos/fraperas.png";
                  };
                  insertImage();




                  let fraperasInk = document.querySelectorAll('#fraperasInk input');

                  fraperasInk.forEach(e =>{
                    e.addEventListener('click', ()=>{
                        if(e.checked){
                            function show1(){
                                showDiv = document.querySelector('#fraperas-cantidad');
                                setTimeout(function(){
                                    showElement();
                                },50);
                            }
                            show1();

                        }
                    })
                  })

                  let fraperasQuantity = document.querySelectorAll('#fraperas-cantidad .options-container input');

                  fraperasQuantity.forEach(e =>{


                        e.addEventListener('click', function(){

                            nextBtn.disabled = false;
                            nextBtn.classList.remove('disabled');

                            showDiv = notes;
                            showElement();
                            showDiv = notesMain;
                            showElement();



                            if(e.value == "otro"){
                                document.querySelector('#fraperas-cantidad .other-option').classList.remove('displayNone');

                            } else{
                                document.querySelector('#fraperas-cantidad .other-option').classList.add('displayNone');
                            }

                            priceDiv.classList.remove('displayNone');
                            

                        });

                    });



        }
    
        else{
    
        };


        if(designOrder.checked){

                ecovasosCharsHide();
                bolsas1CharsHide();
                bolsas2CharsHide();
                sorbetesCharsHide();
                fraperasCharsHide();
                // designOrderCharsHide();
                comboCharsHide();
     
                let selectedProduct = document.querySelector('#designOrder-chars');
                selectedProduct.classList.remove('displayNone');
                selectedProduct.classList.remove('divHidden');
                 
                 
                document.querySelector('#notas-adicionales').classList.remove('top1-5');
     
                 // desciption
     
     
                 shortDescText.classList.add("displayNone");
                 titleTiempoEntrega.classList.add('displayNone');
                 textTiempoEntrega.classList.add('displayNone');
                 auxiliarText.classList.add('displayNone');


                 nextBtn.disabled = false;
                 nextBtn.classList.remove('disabled');

                showDiv = notes;
                showElement();
                showDiv = notesMain;
                showElement();


                function show1(){
                    showDiv = document.querySelector('#designOrder-div');
                setTimeout(function(){
                    showElement();
                },50);
                }

                show1();
                
                

                function insertImage(){
                    document.querySelector(".image-prod img").src="./img/Productos/ordendediseno.jpg";
                  };
                  insertImage();

                  priceDiv.classList.remove('displayNone');


        }


    };







    if(combo.checked){

        ecovasosCharsHide();
        bolsas1CharsHide();
        bolsas2CharsHide();
        sorbetesCharsHide();
        fraperasCharsHide();
        designOrderCharsHide();
        // comboCharsHide();

        let selectedProduct = document.querySelector('#combo-chars');
        selectedProduct.classList.remove('displayNone');
        selectedProduct.classList.remove('divHidden');
         

        document.querySelector('#notas-adicionales').classList.remove('top1-5');
         
         // desciption


         shortDescText.classList.add("displayNone");
         titleTiempoEntrega.classList.add('displayNone');
         textTiempoEntrega.classList.add('displayNone');
         auxiliarText.classList.add('displayNone');


        

    
        function insertImage(){
            document.querySelector(".image-prod img").src="./img/Productos/combo.jpeg";
          };
          insertImage();


        //  document.querySelector('#combo-div').classList.remove('displayNone');
        //  document.querySelector('#combo-div').classList.remove('divHidden');

        
        
        
        showDiv = notes;
        showElement();
        showDiv = notesMain;
        showElement();


        function show1(){
            showDiv = document.querySelector('#combo-div');
            setTimeout(function(){
                showElement();
            },50);
        }
        show1();


        function show2(){
            let showDiv;
                showDiv = document.querySelector('#comboChars');
                setTimeout(function(){
                    showDiv.classList.remove('displayNone');
                    showDiv.classList.remove('divHidden');
                },50);
        }

        show2();


        let comboQuantity = document.querySelectorAll('#combo-cantidad input');

        comboQuantity.forEach(e => {
            e.addEventListener('click', ()=>{
                priceDiv.classList.remove('displayNone');
                nextBtn.disabled = false;
            });
        })



}



});