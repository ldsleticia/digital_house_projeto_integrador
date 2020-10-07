
$("#form-pesquisa").submit(function( event ) {
 
  event.preventDefault();

  let uf = document.getElementById("cb-estado");
  let style = document.getElementById("tipo-contrato");
  let level = document.getElementById("senioridade");
  let remote = document.getElementById("remoto").checked;
  
  let parameters = '';

  if(uf.selectedIndex > 1 || style.selectedIndex > 1 || level.selectedIndex > 1){
    parameters = '?labels=';

    if (uf.selectedIndex > 1){
      console.log('uf');
      console.log(uf.selectedIndex);
      parameters += uf.value + ',';
    }

    if (style.selectedIndex > 1){
      console.log('style');
      parameters += style.value + ',';
    }

    if (level.selectedIndex > 1){
      console.log('level');
      parameters += level.value + ',';
    }

    parameters = parameters.slice(0, -1);

  }

  remote= remote ? 'remoto' : ''

  const url = "https://api.github.com/repos/frontendbr/vagas/issues" + parameters;

  console.log(url);

  $.get({
    url: url,
    success: function(result){

    $("#container-list-vagas").empty();


    if (result.length === 0) {
      $("#container-list-vagas").append('<h3>Não há resultados</h3>');
    }


    const html = result.map(vaga => (
      `<div class="col mb-1">
        <div class="card h-100 card-vaga">
          <div class="card-top d-flex justify-content-between">
            <h4 class="mt-4">${vaga.title}</h4>
            <h4 class="mt-4">PJ</h4>
          </div>
          <ul class="d-flex flex-wrap px-0">
            <li>Digital House</li>
            <li>São Paulo</li>
            <li>${vaga.created_at}</li>
          </ul>
          <div class="card-botton d-flex">
            <div class="dados-vaga">
              <p>Requisitos: </p>
              <p>Carga horária: </p>
              <p>Salário: </p>
            </div>

            <a id="saiba-mais" href="${vaga.html_url}" target="_blank">+</a>
          </div>
        </div>
      </div>
      `
    ));

    $("#container-list-vagas").append(html);

  }});

});