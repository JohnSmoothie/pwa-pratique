const technonameField = document.querySelector('#techno-name');
const technoDescriptionField = document.querySelector('#techno-description');
const technoUrlField = document.querySelector('#techno-url');
const addTechnoForm = document.querySelector('#add-techno-form');

addTechnoForm.addEventListener('submit', evt => {
    evt.preventDefault();

    /*
    const payload = {
        name: technonameField.value,
        description: technoDescriptionField.value,
        url: technoUrlField.value
    }
*/
    //9.3 Branchement de notre Bdd Firebase
    const payload = {
        id: Date.now(), // On ajoute l'id pour notre FASS
        name: technonameField.value,
        description: technoDescriptionField.value,
        url: technoUrlField.value
    };

    fetch('https://us-central1-pwa-techno-boix.cloudfunctions.net/addTechno', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(resp => {
            console.log(resp);
        })
        // 9.5 Ajouter les données en local lors de la déconnexion
        // Hors ligne le POST échoue
        .catch(() => {
            // test si service worker ET "syncManager" existent
            if ('serviceWorker' in navigator && 'SyncManager' in window) {
                console.log('SyncManager supported by browser');
                console.log('we are probably offline');
                navigator.serviceWorker.ready.then(registration => {
                    // API entre en action lors de la déconnexion puis reconnexion
                    // put techno pour sauvegarder en local dans IndexedDB
                    return putTechno(payload, payload.id).then(() => {
                        // Tague le service de synchronisation pour l'utiliser après
                        return registration.sync.register('sync-technos')
                    });
                })
            } else {
                // TODO browser does NOT support SyncManager: send data to server via ajax
                console.log('SyncManager NOT supported by your browser');
            }
        })
        .then(() => {
            clearForm();
        })
        .catch(error => console.error(error));

    // 9.5 Ajouter les données en local lors de la déconnexion
    // Vide le formulaire
    const clearForm = () => {
        technonameField.value = '';
        technoDescriptionField.value = '';
        technoUrlField.value = '';
        technonameField.focus();
    };
});