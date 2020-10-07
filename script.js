
$("#form-pesquisa").submit(function( event ) {
 
  event.preventDefault();

  const uf = document.getElementById("cb-estado").value;
  const style = document.getElementById("tipo-contrato").value;
  const level = document.getElementById("senioridade").value;
  const remote = document.getElementById("remoto").checked;

  $.ajax({
    type: "POST",
    url: "https://devjobs-dh.herokuapp.com/jobs/",
    data: {
      "uf": !!uf ? uf : null,
      "style": !!style ? style : null,
      "level": !!level ? level : null,
      "remote": remote
    },
    dataType: "json",
    contentType: 'application/json',
    success: function(result){

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

            <a id="saiba-mais" href="${vaga.html_url}">+</a>
          </div>
        </div>
      </div>
      `
    ));

    $("#container-list-vagas").append(html);

    console.log(html);
    

  }});

});