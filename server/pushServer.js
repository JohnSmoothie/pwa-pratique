
// 8.5 Envoyer une notification push depuis Node
// Import des objets et librairies nécessaires
const webPush = require('web-push');
const pushServerKeys = require('./pushServerKeys.json');
const pushClientSubscription = require('./pushClientSubscription.json');
console.log(pushServerKeys, pushClientSubscription);

// En production on ferait une boucle de l'ensemble des souscriptions pour envoyer les notifications
// Configuration des "details" permettant au FCM de nous contacter
webPush.setVapidDetails('mailto:quentinbc@gmail.com', pushServerKeys.publicKey, pushServerKeys.privateKey);

// Pour sendNotification API reference sendNotification(pushSubscription, payload, options)
// voir https://github.com/web-push-libs/web-push#sendnotificationpushsubscription-payload-options
webPush.sendNotification(pushClientSubscription, 'Notification envoyée depuis le serveur push node :)')
    .then(
        function(result){
            console.log("sendNotification SUCCESS", result);
        },
        function(err){
            console.log("sendNotification ERROR", err);
        }
    )
    .catch(
        function(err){
            console.log("sendNotification ERROR catch", err);
        }
    );

