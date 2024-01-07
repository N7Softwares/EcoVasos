
	<!-- Start Footer Area -->
	<div id="colophon" class="footer">
		
		
		<div class="inner-footer">
		  <div class="footer-logo">
			<a href="#" class="logo-img">
			  <img src="{{asset('frontend/img/logo/ecoingenio-logo2.svg')}}" alt="logo ecoingenio" class="blackLogo">
			  <img src="{{asset('frontend/img/logo/ecoingenio-logo-white2.svg')}}" alt="logo ecoingenio" class="whiteLogo">
			</a>
			<p class="footer-slogan footer-slogan-mobile">
			  Trabajamos por un mundo más sustentable
			</p>
		  </div>
		  <div class="footer-brand col-flex">
			<p class="footer-slogan">
			  Trabajamos por un mundo más sustentable
			</p>

			<p class="footer-desc">
			  El uso de vasos descartables genera un fuerte impacto en el medio ambiente. Nacimos para cambiar esta realidad. 
			</p>

			<div class="socials col-flex">
			  <!-- <h4>Seguínos</h4> -->
			  <div class="row-flex">
				<div class="social-icon flex-center">
				  <a href="https://www.instagram.com/ecoingeniooficial/">
					<i class="fa-brands fa-instagram"></i>
				  </a>
				</div>
				<div class="social-icon flex-center">
				  <a href="https://www.facebook.com/profile.php?id=100053143827162">
					<i class="fa-brands fa-facebook-f"></i>
				  </a>
				</div>
			  </div>
			</div> <!-- end socials -->
			
		  </div>

		  <div class="footer-info">

			  <div class="company footer-links">
				<div><h4>La empresa</h4>
				  <ul>
					<li><a href="#">Nosotros</a></li>
					<li><a href="#">Políticas de privacidad</a></li>
					<li><a href="#">Términos y condiciones</a></li>
				  </ul>
				</div>
			  </div> <!-- end company -->
			  <div class="services footer-links">
				<div>
				  <h4>Servicios</h4>
				  <ul>
					<li><a href="#">Diseño</a></li>
					<li><a href="#">Productos</a></li>
				  </ul>
				</div>
			  </div> <!-- end services -->
			  <div class="support footer-links">
				<div>
				  <h4>Ayuda</h4>
				  <ul>
					<li><a href="#">FAQ</a></li>
					<li><a href="#">Contacto</a></li>
					<li><a href="#">Whatsapp</a></li>
				  </ul>
				</div>
			  </div> <!-- end support -->

			<div class="contact footer-links">
			  <div>
				<h4>Contacto</h4>
				<ul>
				  <li>Av. Ávalos 550, Resistencia</li>
				  <li>362 4733371</li>
				  <li>ventas@ecoingenio.com.ar</li>
				</ul>
			  </div>
			</div> <!-- footer contact -->
			  
			  
			  
			

		  </div> <!-- end footer info -->




		</div> <!-- inner footer -->

		<div class="copyright flex-center">
		  <p>Ecoingenio Copyright &copy <span class="year"></span> - All rights reserved</span>
		</div>
		
	  </div>
	<!-- /End Footer Area -->
 
	<!-- Jquery -->
    <script src="{{asset('frontend/js/jquery.min.js')}}"></script>
    <script src="{{asset('frontend/js/jquery-migrate-3.0.0.js')}}"></script>
	<script src="{{asset('frontend/js/jquery-ui.min.js')}}"></script>
	<!-- Popper JS -->
	<script src="{{asset('frontend/js/popper.min.js')}}"></script>
	<!-- Bootstrap JS -->
	<script src="{{asset('frontend/js/bootstrap.min.js')}}"></script>
	<!-- Color JS -->
	<script src="{{asset('frontend/js/colors.js')}}"></script>
	<!-- Slicknav JS -->
	<script src="{{asset('frontend/js/slicknav.min.js')}}"></script>
	<!-- Owl Carousel JS -->
	<script src="{{asset('frontend/js/owl-carousel.js')}}"></script>
	<!-- Magnific Popup JS -->
	<script src="{{asset('frontend/js/magnific-popup.js')}}"></script>
	<!-- Waypoints JS -->
	<script src="{{asset('frontend/js/waypoints.min.js')}}"></script>
	<!-- Countdown JS -->
	<script src="{{asset('frontend/js/finalcountdown.min.js')}}"></script>
	<!-- Nice Select JS -->
	<script src="{{asset('frontend/js/nicesellect.js')}}"></script>
	<!-- Flex Slider JS -->
	<script src="{{asset('frontend/js/flex-slider.js')}}"></script>
	<!-- ScrollUp JS -->
	<script src="{{asset('frontend/js/scrollup.js')}}"></script>
	<!-- Onepage Nav JS -->
	<script src="{{asset('frontend/js/onepage-nav.min.js')}}"></script>
	{{-- Isotope --}}
	<script src="{{asset('frontend/js/isotope/isotope.pkgd.min.js')}}"></script>
	<!-- Easing JS -->
	<script src="{{asset('frontend/js/easing.js')}}"></script>

	<script src="{{asset('frontend/js/general.js')}}"></script>  
	    
    <script src="{{asset('frontend/js/carouselLoop.js')}}"></script>  
	    
    <script src="{{asset('frontend/js/nosotros-animations.js')}}"></script>
	

	<!-- Active JS -->
	<script src="{{asset('frontend/js/active.js')}}"></script>

	
	@stack('scripts')
	<script>
		setTimeout(function(){
		  $('.alert').slideUp();
		},5000);
		$(function() {
		// ------------------------------------------------------- //
		// Multi Level dropdowns
		// ------------------------------------------------------ //
			$("ul.dropdown-menu [data-toggle='dropdown']").on("click", function(event) {
				event.preventDefault();
				event.stopPropagation();

				$(this).siblings().toggleClass("show");


				if (!$(this).next().hasClass('show')) {
				$(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
				}
				$(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
				$('.dropdown-submenu .show').removeClass("show");
				});

			});
		});
	  </script>