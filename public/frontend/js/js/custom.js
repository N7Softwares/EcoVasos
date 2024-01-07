$( document ).ready(function() {
  // Desativa F5
if ( window.history.replaceState ) {
      window.history.replaceState( null, null, window.location.href );
  }

  $(".remove").click(function(e){
  e.preventDefault();
  if(confirm('Estas seguro que deseas eliminar este registro?')) {
    $(window.document.location).attr('href',this.href);
  }
});

  $(".confirm").click(function(e){
  e.preventDefault();
  if(confirm(this.title)) {
    $(window.document.location).attr('href',this.href);
    //window.open(this.href, '_blank');
  }
});

  $("select.updateField, input.updateField").change(function(){
      var id = $(this).data('id');
      var table = $(this).data('table');
      var field = $(this).data('field');
      var value = $(this).val();
      var input = $(this);
  
      if(id) {
          $.ajax({
              type: "POST",
              url: '/mack-color/updateField/',
              data: {'id': id, 'table': table, field: field, 'value': value },
              success: function(data) {
                  input.css('border', '1px solid green')
              },
              error: function () {
                  input.css('border', '1px solid red')
              }
          });
      }
  });

  $( 'div.arrow-slide' ).on('click', function() {
  if($( '.arrow-slide' ).hasClass('arrow-slide-up')){
    $( '.arrow-slide' ).removeClass('arrow-slide-up');
  } else {
    $( '.arrow-slide' ).addClass('arrow-slide-up');
  }

  $( '.lista-produtos' ).slideToggle(500);
});

  if ($('.page-perfil').length) {
  $('body').on('click', '.item-produto h4.categoria', function(event) {
    $(this).next().slideToggle();
  });
}

if (($('.page-sobre-nos').length) || ($('.page-contato').length)) {
  $('body').on('click', '.item-produto .categoria', function(event) {
    $(this).next().slideToggle();
  });
}

  $('.outter, .close-menu').click(function(ev){
  $('.collapsable').slideUp();
  $('.outter').fadeOut(200);
  if ($('.outter').hasClass('from-menu')) {
    $('.outter').removeClass('from-menu');
  }
  if ($('.navbar-nav').hasClass('menu-aberto')) {
    $('.navbar-nav').removeClass('menu-aberto');
    $('.navbar-nav').hide(200);
  }
  if ($('.categoria').hasClass('categoria-hovered')) {
    $('.categoria').removeClass('categoria-hovered');
  }
});

if($('.page-pedidos-abertos').length || $('.page-meus-dados') ) {
  $('.lateral .slideable').click(function(event) {
    if ($('.lateral').hasClass('aparece')) {
      $('.lateral').removeAttr('style');
      $('.lateral').removeClass('aparece');	
      $('.lateral').removeClass('aparece');
      return false;
    }
    $('.lateral').css('top', 'calc(100% - '+ $('.lateral').css('height') +')');
    $('.lateral').addClass('aparece');
  });
}

$('.icone-burger').click(() => {
  $('.bg-burger').fadeIn(400);
  $('.hidden-bar').addClass('hidden-bar-view');
  
});

$('.close-bar').click(() => {
  $('.bg-burger').fadeOut(400);
  $('.hidden-bar').removeClass('hidden-bar-view');
});
});

function formataValor(valor) {
return number_format(valor, 2, ',', '.');
}

function formataData(data) {
const myArray = data.split("-");

return myArray[2] + '/' + myArray[1] + '/' + myArray[0];
}

function inserirValor(valor) {
if(valor) {
  return parseFloat(valor.replace('.', '').replace(',', '.'));
}
}

function number_format(number, decimals, dec_point, thousands_sep) {
number = (number + '')
.replace(/[^0-9+\-Ee.]/g, '');
var n = !isFinite(+number) ? 0 : +number,
prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
s = '',
toFixedFix = function(n, prec) {
  var k = Math.pow(10, prec);
  return '' + (Math.round(n * k) / k)
  .toFixed(prec);
};
// Fix for IE parseFloat(0.55).toFixed(0) = 0;
s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
.split('.');
if (s[0].length > 3) {
  s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
}
if ((s[1] || '')
.length < prec) {
  s[1] = s[1] || '';
  s[1] += new Array(prec - s[1].length + 1)
  .join('0');
}
return s.join(dec);
}