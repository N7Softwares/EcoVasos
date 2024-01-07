$(document).ready(function(){
  let cookie = null;
  let corCopo = null;
  let cores = null;
  let id_medida = null;
  let tipoFerramenta = null;
  let quantidade = null;

  $(".tipos-personalizacao").on('click', function(){
      cookie = $(this).data("cookie");
  });

  $(".select-colors").on('click', function(){
      cores = $(this).data('cores');
      if(cores >= 1 && cores <= 4) {
          tipoFerramenta = 'serigrafia';
          quantidade = 25;
      } else {
          tipoFerramenta = 'fullcolor';
          quantidade = 4000;
      }

      $(".select-colors").css('background', '#FFF');
      $(this).css('background', '#D9D9D9');
      console.log('teste')
  });

  $(".measure").on('click', function(){
      id_medida = $(this).data('id-medida');

      if(cores) {
          $(".measure").css('background', '#FFF');
          $(this).css('background', '#D9D9D9');

          if(id_medida == 1) {
              corCopo = 13;
          } else {
              corCopo = 9;
          }

          // console.log("https://ecovasos.com/qero/personalizacao-online/"+tipoFerramenta+"?id_medida="+id_medida+"&cor_copo="+corCopo+"&quantidade="+quantidade+"&cookie="+cookie);
          window.location.href = "./personalizacion"+tipoFerramenta+"?id_medida="+id_medida+"&cor_copo="+corCopo+"&quantidade="+quantidade+"&toques="+cores+"&cookie="+cookie;
      }
  });
});