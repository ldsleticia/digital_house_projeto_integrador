
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
      parameters += uf.value + ',';
    }

    if (style.selectedIndex > 1){
      parameters += style.value + ',';
    }

    if (level.selectedIndex > 1){
      parameters += level.value + ',';
    }

    if (remote){
      parameters += 'Remoto,';
    }

    parameters = parameters.slice(0, -1);

  }

  remote= remote ? 'remoto' : ''

  const url = "https://api.github.com/repos/frontendbr/vagas/issues" + parameters;

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
            <h4 class="mt-4">${style.selectedIndex > 1 ? style.value : 'A Combinar'}</h4>
          </div>
          <ul class="d-flex flex-wrap px-0">
            <li>${vaga.user.login}</li>
            <li>${uf.selectedIndex > 1 ? uf.value : "Remoto"}</li>
            <li>${vaga.created_at.substring(0,10)}</li>
          </ul>
          <div class="card-botton d-flex">
            <div class="dados-vaga">
              <p>Requisitos: ${level.selectedIndex > 1 ? level.selectedIndex : '2'} anos de experiência</p>
              <p>Carga horária: 8:00 às 17:00</p>
              <p>Salário: A Combinar</p>
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