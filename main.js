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

if(navigator.serviceWorker) {
    navigator.serviceWorker
        .register("sw.js")
        .catch(err => console.error('service worker NON register'))
}

//7.1 Notifications non persistantes
// // Vérifie si la fonctionalité est disponible et si
// l'utilisateur n'a pas refusé les notifications
if(window.Notification && window.Notification !== "denied"){
    // demande une permission
    Notification.requestPermission(perm => {
        // vérifie si la permission est acceptée par l'utilisateur
        // 3 valeurs possibles : default | granted | denied
        if(perm === "granted"){
            console.log("Notification acceptée");
            // On crée une nouvelle notification
            const notif = new Notification("Hello notification");
        }
        else{
            // Notification refusée
            console.log("Notification refusée");
        }
    })
}