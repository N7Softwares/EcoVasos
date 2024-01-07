@extends('frontend.layouts.master')

@section('title','EcoIngenio || Nosotros')

@section('main-content')

<div id="main">
    <!-- banner -->

    <div id="main-banner">
      <div>
        <h2 class="title-banner">Banner</h2>
      </div>
    </div>

    <!-- banner -->

    <div class="nosotros-banner2">
      <span class="animateMove hiddenBottom2">Trabajamos para generar un</span>
      <span class="big-span animateMove hiddenBottom2">impacto positivo</span>
      <span class="animateMove hiddenBottom2">en nuestra comunidad,</span>
      <span class="animateMove hiddenBottom2">de forma independiente.</span>
    </div>

        <div id="content">
  
          <div class="nAboutUsContainer">

            <div class="nAboutUsInner">

              <div class="nAboutUsGrid nAbout1">
                <div class="nAboutText nAboutTitleDiv">
                  <div class="nAboutTitle animateMove hiddenLeft">
                    <h3>Un poco <br><span>de historia..</span></h3>
                  </div>
                </div>
                <div class="nAboutText">
                  <div class="nAboutp animateMove hiddenLeft">
                    <p>Ecoingenio nace en 2017 de la mano de Diego y Ezequiel, dos amigos con ganas de generar cambios positivos en su ciudad natal, Resistencia, Chaco, y expandiéndose.</p>
                  </div>
                </div>
  
                <div class="nAboutImg animateMove hiddenRight">
                  <div class="nAboutImg">
                    <img src="{{asset('frontend/img/nosotros/nStory1.jpg')}}" alt="equipo ecovasos Diego y Ezequiel">
                  </div>
                </div>
              </div>


              <div class="nAboutUsGrid nAbout2">
                <div class="nAboutImg animateMove hiddenLeft">
                  <div class="nAboutImg">
                    <img src="./img/nosotros/nStory2.jpeg" alt="equipo ecovasos Diego y Ezequiel">
                  </div>
                </div>
  
  
                <div class="nAboutText animateMove hiddenRight">
                  <div class="nAboutp">
                    <p>Los comienzos no fueron fáciles pero con mucho trabajo y convicción lograron el primer hito: realizar el primer festival masivo en su ciudad con más de 20.000 personas sin un solo vaso descartable.</p>
                  </div>
                </div>
              </div>


              <div class="nAboutUsGrid nAbout3">
                  
                <div class="nAboutText animateMove hiddenLeft">
                  <div class="nAboutp">
                    <p>Hoy Ecoingenio está presente en 23 provincias y realiza ventas al país vecino de Paraguay.</p>
                  </div>
                </div>

                <div class="nAboutImg animateMove hiddenRight">
                  <div class="nAboutImg">
                    <img src="{{asset('frontend/img/nosotros/nStory3.jpg')}}" alt="equipo ecovasos Diego y Ezequiel">
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div class="nSpan animateMove hiddenOpacity nContainer"> 

            <div class="nGrid nInner">

              <div class="nGal">
                <div class="nImgGal animateMove hiddenTop"><img src="{{asset('frontend/img/nosotros/ecovasos2.jpg')}}" alt=""></div>
                <div class="nImgGal animateMove hiddenLeft"><img src="{{asset('frontend/img/nosotros/bolsasbiodegradables1.jpg')}}" alt=""></div>
                <div class="nImgGal animateMove hiddenBottom"><img src="{{asset('frontend/img/nosotros/ecovasos1.jpg')}}" alt=""></div>
              </div>
			  
			  

              <div class="nText">

                <div>
                  <p class="animateMove hiddenRight">Fabricamos ecovasos personalizados para eventos y regalos.</p>
                  <p class="animateMove hiddenRight">También hacemos bolsas de friselina personalizadas y bolsas biodegradables. Conocé más sobre nuestros productos en la tienda virtual.</p>
                </div>

              </div>

            </div>

          </div> <!-- span gallery -->

          <div class="sSpace animateMove hiddenScaleGrow">
            <div class="sSpaceInner">
              <img src="{{asset('frontend/img/icon/recycle-icon.svg')}}" alt="">
            </div>
          </div>
  


          <div class="nSpan nContainer teamContainer">
            
            <div class="nInner teamInner">
              <div class="nTitle animateMove hiddenBottom">
                <h3>Nuestro Equipo</h3>
              </div>
  
              <div class="nGal4 nTeam">

                <div class="nMember animateMove hiddenBottom">
                  <div class="img">
                    <img src="{{asset('frontend/img/nosotros/team/diego-nMember.jpeg')}}" alt="Diego Team Member of Ecoingenio">
                  </div>
                  <div class="nMemberText">
                    <h5>Diego</h5>
                    <p>Contabilidad y marketing</p>
                  </div>
                </div>

                <div class="nMember animateMove hiddenBottom">
                  <div class="img">
                    <img src="{{asset('frontend/img/nosotros/team/Seba-nMember.jpeg')}}" alt="Seba Team Member of Ecoingenio">
                  </div>
                  <div class="nMemberText">
                    <h5>Seba</h5>
                    <p>Logística y pedidos</p>
                  </div>
                </div>

                <div class="nMember animateMove hiddenBottom">
                  <div class="img">
                    <img src="{{asset('frontend/img/nosotros/team/Fer-nMember.jpg')}}" alt="Fer Team Member of Ecoingenio">
                  </div>
                  <div class="nMemberText">
                    <h5>Fer</h5>
                    <p>Producción</p>
                  </div>
                </div>

                <div class="nMember animateMove hiddenBottom">
                  <div class="img">
                    <img src="{{asset('frontend/img/nosotros/team/Samu-nMember.jpg')}}" alt="Samu Team Member of Ecoingenio">
                  </div>
                  <div class="nMemberText">
                    <h5>Samu</h5>
                    <p>Diseño y pedidos</p>
                  </div>
                </div>

                <div class="nMember animateMove hiddenBottom">
                  <div class="img">
                    <img src="{{asset('frontend/img/nosotros/team/juli-nMember.jpeg')}}" alt="Juli Team Member of Ecoingenio">
                  </div>
                  <div class="nMemberText">
                    <h5>Juli</h5>
                    <p>Redes y catálogo</p>
                  </div>
                </div>

              </div>

            </div>

          </div>




          <!-- CAROUSEL Type Product -->
          <div class="nCarousel animateMove hiddenBottom">

            <div class="wrapper">
              
              <i id="left" class="fa-solid fa-angle-left"></i>
              
              <ul class="carousel select-carousel">
                <li class="card">
                  <div class="img">
                      <div class="round-img">
                        <img src="{{asset('frontend/img/nosotros/slider/Ciudad-Television.jpeg')}}">
                      </div>
                  </div>
                </li>
                <li class="card">
                  <div class="img">
                      <div class="round-img">
                        <img src="{{asset('frontend/img/nosotros/slider/entrevista-radial.png')}}">
                      </div>
                  </div>
                </li>
                <li class="card">
                  <div class="img">
                      <div class="round-img">
                        <img src="{{asset('frontend/img/nosotros/slider/Radio-Natagala.jpeg')}}">
                      </div>
                  </div>
                </li>
                <li class="card">
                  <div class="img">
                      <div class="round-img">
                        <img src="{{asset('frontend/img/nosotros/slider/slide.png')}}">
                      </div>
                  </div>
                </li>
                <li class="card">
                  <div class="img">
                      <div class="round-img">
                        <img src="{{asset('frontend/img/nosotros/slider/slide2.png')}}">
                      </div>
                  </div>
                </li>
                <li class="card">
                  <div class="img">
                      <div class="round-img">
                        <img src="{{asset('frontend/img/nosotros/slider/slide3.png')}}">
                      </div>
                  </div>
                </li>

				
                
              </ul>
              <i id="right" class="fa-solid fa-angle-right"></i>

            </div>

          </div> <!-- end type-product -->



        </div>

	
@endsection
