window.onload=()=>{"use strict";"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js")},function(e){"use strict";e(document).on("ready",function(){e(".menu").slicknav({prependTo:".mobile-nav",duration:300,animateIn:"fadeIn",animateOut:"fadeOut",closeOnClick:!0}),jQuery(window).on("scroll",function(){e(this).scrollTop()>200?e(".header").addClass("sticky"):e(".header").removeClass("sticky")}),e(".top-search a").on("click",function(){e(".search-top").toggleClass("active")}),e(".home-slider").owlCarousel({items:1,autoplay:!0,autoplayTimeout:5e3,smartSpeed:400,animateIn:"fadeIn",animateOut:"fadeOut",autoplayHoverPause:!0,loop:!0,nav:!0,merge:!0,dots:!1,navText:['<i class="ti-angle-left"></i>','<i class="ti-angle-right"></i>'],responsive:{0:{items:1},300:{items:1},480:{items:2},768:{items:3},1170:{items:4}}}),e(".popular-slider").owlCarousel({items:1,autoplay:!0,autoplayTimeout:5e3,smartSpeed:400,animateIn:"fadeIn",animateOut:"fadeOut",autoplayHoverPause:!0,loop:!0,nav:!0,merge:!0,dots:!1,navText:['<i class="ti-angle-left"></i>','<i class="ti-angle-right"></i>'],responsive:{0:{items:1},300:{items:1},480:{items:2},768:{items:3},1170:{items:4}}}),e(".quickview-slider-active").owlCarousel({items:1,autoplay:!0,autoplayTimeout:5e3,smartSpeed:400,autoplayHoverPause:!0,nav:!0,loop:!0,merge:!0,dots:!1,navText:['<i class=" ti-arrow-left"></i>','<i class=" ti-arrow-right"></i>']}),e(".home-slider-4").owlCarousel({items:1,autoplay:!0,autoplayTimeout:5e3,smartSpeed:400,autoplayHoverPause:!0,nav:!0,loop:!0,merge:!0,dots:!1,navText:['<i class=" ti-arrow-left"></i>','<i class=" ti-arrow-right"></i>']}),e("[data-countdown]").each(function(){var a=e(this),t=e(this).data("countdown");a.countdown(t,function(e){a.html(e.strftime('<div class="cdown"><span class="days"><strong>%-D</strong><p>Days.</p></span></div><div class="cdown"><span class="hour"><strong> %-H</strong><p>Hours.</p></span></div> <div class="cdown"><span class="minutes"><strong>%M</strong> <p>MINUTES.</p></span></div><div class="cdown"><span class="second"><strong> %S</strong><p>SECONDS.</p></span></div>'))})}),jQuery(".flexslider-thumbnails").flexslider({animation:"slide",controlNav:"thumbnails"});var a=e(".cart-plus-minus");a.prepend('<div class="dec qtybutton">-</div>'),a.append('<div class="inc qtybutton">+</div>'),e(".qtybutton").on("click",function(){var a=e(this),t=a.parent().find("input").val();if("+"===a.text())var s=parseFloat(t)+1;else s=t>0?parseFloat(t)-1:1;a.parent().find("input").val(s)}),e(".scroll").on("click",function(a){var t=e(this);e("html, body").stop().animate({scrollTop:e(t.attr("href")).offset().top-0},900),a.preventDefault()}),e('input[type="checkbox"]').change(function(){e(this).is(":checked")?e(this).parent("label").addClass("checked"):e(this).parent("label").removeClass("checked")}),e(".qty-box .quantity-right-plus").on("click",function(){var a=e(".qty-box .input-number"),t=parseInt(a.val(),10);isNaN(t)||a.val(t+1)}),e(".qty-box .quantity-left-minus").on("click",function(){var a=e(".qty-box .input-number"),t=parseInt(a.val(),10);!isNaN(t)&&t>1&&a.val(t-1)}),e(".video-popup").magnificPopup({type:"iframe",removalDelay:300,mainClass:"mfp-fade"}),e.scrollUp({scrollText:'<span><i class="fa fa-angle-up"></i></span>',easingType:"easeInOutExpo",scrollSpeed:900,animation:"fade"})}),e("select").niceSelect(),e(".preloader").delay(2e3).fadeOut("slow"),setTimeout(function(){e("body").removeClass("no-scroll")},2e3)}(jQuery);