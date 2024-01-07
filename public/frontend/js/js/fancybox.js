$(document).ready(function() {
	$(".fancybox").fancybox();

	$(".fancybox-iframe").fancybox({
		type: 'iframe',
		'width':   738,
		'height':  680,
		'fitToView' : false,
		helpers   : { 
		   overlay : {closeClick: false} // prevents closing when clicking OUTSIDE fancybox 
		}
	});

	$(".fancybox-pagamento").fancybox({
		type: 'iframe',
		'width':   980,
		'height':  680,
		'fitToView' : false,
		helpers   : { 
		   overlay : {closeClick: false} // prevents closing when clicking OUTSIDE fancybox 
		}
	});
});