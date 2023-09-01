import { useUsersStore } from "@/store/user";

export function useComment() {

    //! Récupérer tous les commentaires déjà modérés de la BDD (site vitrine)
    async function getModeratedComments() {

        try {

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Appeler l'api getValidatedComments()
            let response = await fetch(serverUrl + 'api/comment/moderated', {
                method:'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })

            //? Retourner la réponse
            const commentsList = await response.json();
            return commentsList;
            
        //? En cas d'erreur, capter cette erreur et la retourner
        } catch (error) {
            console.error(error);
        }      
    }

    //! Récupérer tous les commentaires pas encore modérés de la BDD (managerApp)
    async function getCommentsToValidate() {

        try {

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Vérifier et récupérer le token pour l'identification via la fonction verifyToken() du composable useAuthentification
            const { verifyToken }   = useAuthentification();
            const jwt               = await verifyToken();

            //? Appeler l'api getCommentsToValidate()
            let response = await fetch(serverUrl + 'api/comment/toValidate', {
                method:'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${jwt}`
                }
            })

            //? Retourner la réponse
            const commentsList = await response.json();
            return commentsList;

        //? En cas d'erreur, capter cette erreur et la retourner
        } catch (error) {
            console.error(error);
        }      
    }
    
    //! Ajouter un commentaire dans la BDD (site vitrine)
    async function addComment(body:object) {
        
        try {

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Transformer l'objet body en json
            const bodyJson = JSON.stringify(body);

            //? Exécuter l'appel API
            const response = await fetch(serverUrl + 'api/comment/add', {
                method:'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: bodyJson,
            })

            //? Retourner la réponse
            return response;

        //? En cas d'erreur, capter cette erreur et la retourner
        } catch(error) {
            console.error(error);      
            return error;
        }
    }

    //! Valider un commentaire dans la BDD (managerApp)
    async function validateComment(body:object) {

        try {
            
            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Transformer l'objet body en json
            const bodyJson = JSON.stringify(body);
            
            //? Vérifier et récupérer le token pour l'identification via la fonction verifyToken() du composable useAuthentification
            const { verifyToken }   = useAuthentification();
            const jwt               = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch(serverUrl + 'api/comment/validate', {
                    method:'PATCH',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Authorization": `Bearer ${jwt}`
                    },
                    body: bodyJson
                })

            //? Retourner la réponse
            if (response.status == 498) {
                const userStore = useUsersStore();
                userStore.token = '';
                navigateTo('/managerApp/logIn/expired-session'); 
            } else {
                return response;
            }

        //? En cas d'erreur, capter cette erreur et la retourner
        } catch(error) {
            console.error(error);   
            return error;
        }
    }

    //! Rejeter un commentaire dans la BDD (managerApp)
    async function rejectComment(body:object) {

        try {

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Transformer l'objet body en json
            const bodyJson = JSON.stringify(body);
        
            //? Vérifier et récupérer le token pour l'identification via la fonction verifyToken() du composable useAuthentification
            const { verifyToken }   = useAuthentification();
            const jwt               = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch(serverUrl + 'api/comment/reject', {
                method:'PATCH',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${jwt}`
                },
                body: bodyJson
            })

            //? Retourner la réponse
            if (response.status == 498) {
                const userStore = useUsersStore();
                userStore.token = '';
                navigateTo('/managerApp/logIn/expired-session'); 
            } else {
                return response;
            }

        //? En cas d'erreur, capter cette erreur et la retourner
        } catch(error) {
            console.error(error);         
            return error;
        }
    }
    
    return {
        getModeratedComments,
        getCommentsToValidate,
        addComment,
        validateComment,
        rejectComment
    }
}