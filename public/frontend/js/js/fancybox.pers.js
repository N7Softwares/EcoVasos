// JavaScript Document
$(document).ready(function() {
	$(".fancybox-iframe").fancybox({
		type: 'iframe'
	});
	$(".fancybox").fancybox({
		type: 'image'
	});
	$(".fancybox-open-frame").fancybox({
		type: 'iframe',
		'width'  : 1280,
		'height' : 768,
		'autoSize' : false
	});

	$(".fancybox-open-frame-small").fancybox({
		type: 'iframe',
		'width'  : 600,
		'height' : 400,
		'autoSize' : false
	});

	$(".fancybox-open-frame-medium").fancybox({
		type: 'iframe',
		'width'  : 600,
		'height' : 460,
		'autoSize' : false
	});
});