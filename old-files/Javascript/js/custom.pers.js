
$( document ).ready(function() {
  // Desativa F5
if ( window.history.replaceState ) {
      window.history.replaceState( null, null, window.location.href );
  }

  $(".confirm").click(function(e){
  e.preventDefault();
  if(confirm(this.title)) {
    $(window.document.location).attr('href',this.href);
  }
});

  $(".print-etiquetas").click(function(e){
      e.preventDefault();
      var pageURL		= this.href;
      var w 			= 480;
      var h 			= 300;
      var left 		= (screen.width/2)-(w/2);
      var top 		= (screen.height/2)-(h/2);
      var targetWin 	= window.open (pageURL, 'Etiqueta', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
  });

  $("select.updateField, input.updateField").blur(function(){
      var id = $(this).data('id');
      var table = $(this).data('table');
      var field = $(this).data('field');
      var change = $(this).data('change') || 'id';
      var mask = $(this).data('mask') || null;
      var value = $(this).val();
      var el = $(this);
  
      if(id) {
          $.ajax({
              type: "POST",
              url: '/painel-savanti/updateField/',
              data: {'id': id, 'table': table, 'field': field, 'change': change, 'value': value, 'mask': mask },
              success: function(data) {
                  el.css('border', '1px solid green')
              },
              error: function () {
                  el.css('border', '1px solid red')
              }
          });
      }
  });

  $(".data-link").click(function(e){
      var link = $(this).data('link');
      $(window.document.location).attr('href', link);
  });

  $(".print-etiquetas").click(function(e){
  e.preventDefault();
  var pageURL		= this.href;
  var w 			= 480;
  var h 			= 300;
  var left 		= (screen.width/2)-(w/2);
  var top 		= (screen.height/2)-(h/2);
  var targetWin 	= window.open (pageURL, 'Etiqueta', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
});

  $(".closeFancybox").click(function(e){
      parent.Fancybox.close();
  });

  $(".closeRefreshFancybox").click(function(e){
      parent.Fancybox.close();
      parent.location.reload();
  });

  $("#avancarFinalizacaoAberto").click(function(e){
      $("div#buttons-finalizar-injecao").fadeOut();
      $("div#options-finalizar-injecao").fadeIn();
  });

  $('label.to-check').click(function(){
      var borda = $(this).css('border-color');
      borda == 'rgb(249, 249, 249)' ? $(this).css({'border-color' : '#198754', 'background-color' : '#f9f9f9'}) : $(this).css({'border-color' : 'rgb(249, 249, 249)', 'background-color' : 'transparent'});

  });

  $('#btn-refugos').click(function(){
      if($('#tab-refugos').hasClass('ativo')){
          $('#tab-refugos').removeClass('ativo');
      } else {
          $('#tab-refugos').addClass('ativo');
      }
  });

  $('p.fechar').click(function(){
      $('#btn-refugos').trigger('click');
  });
});