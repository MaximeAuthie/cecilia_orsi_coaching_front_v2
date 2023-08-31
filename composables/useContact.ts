export function useContact() {
    
    //! Envoyer un mail de contact à l'administrateur du site (site vitrine)
    async function sendContactMail(body:Object) {
        try {
            
            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Instancier un object message vide
            let message:Object = {
                code: 0,
                text: ''
            };

            //? Transformer l'objet contactData en json
            const bodyJson   = JSON.stringify(body);

            //? Exécuter l'appel API
            const response   = await fetch(serverUrl + 'api/contact', {
                method:'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: bodyJson,
            })

            //? Vérifier la réponse et renvoyer l'objet message approprié
            switch (response.status) {
                case 200 : 
                message = {code: response.status, text: "Votre message a bien été envoyé"};
                break;

                case 422 : 
                message = {code: response.status, text: "Votre message n'a pas pu être envoyé car le format de l'adresse email n'est pas correct"};
                break;

                default :
                message = {code: response.status, text: 'Erreur de connexion au serveur. Veuillez réessayer plus tard.'};
            }

            return message;
            
        //? En cas d'erreur, capter cette erreur et la retourner
        } catch (error) {
            console.error(error); 
        }
    }
  
    return {
        sendContactMail
    }
}