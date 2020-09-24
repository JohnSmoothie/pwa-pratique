console.log('hello depuis main');
const technosDiv = document.querySelector('#technos');

function loadTechnologies(technos) {
    fetch('http://localhost:3001/technos')
        .then(response => {
            response.json()
                .then(technos => {
                    const allTechnos = technos.map(t => `<div class="card">
                        <div class="card-body">
                        <h5 class="card-title">${t.name}</h5>
                        <p class="card-text">${t.description}</p>
                        <a href="${t.url}" class="card-link">site de ${t.name}</a>
                        </div></div>`)
                        .join('');

                    technosDiv.innerHTML = allTechnos;
                });
        })
        .catch(console.error);
}

loadTechnologies(technos);
