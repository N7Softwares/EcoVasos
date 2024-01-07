$(document).ready(function(){
    if($('.arts-slider').length) {
		var slider = $('.arts-slider');
		slider.slick({
			dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false,
            variableWidth: true
		});
	}

	if($('.elements-slider').length) {
		var slider = $('.elements-slider');
		slider.slick({
			dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false,
            variableWidth: true
		});
	}
});