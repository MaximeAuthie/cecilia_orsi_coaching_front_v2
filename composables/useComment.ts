import { useCommentsStore } from '@/store/comment';
import { useUsersStore } from "@/store/user";

export function useComment() {

    async function getModeratedComments() {

        try {

            //? Appeler l'api getValidatedComments()
            let response = await fetch('https://127.0.0.1:8000/api/comment/moderated', {
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

    async function getCommentsToValidate() {

        try {

            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const { verifyToken } = useAuthentification();
            const jwt = await verifyToken();

            //? Appeler l'api getCommentsToValidate()
            let response = await fetch('https://127.0.0.1:8000/api/comment/toValidate', {
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
    
    async function validateComment(body:object) {

        try {
            const userStore         = useUsersStore();
            const { verifyToken }   = useAuthentification();

            //? Transformer l'objet body en json
            const bodyJson = JSON.stringify(body);
            
            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch('https://127.0.0.1:8000/api/comment/validate', {
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

    async function rejectComment(body:object) {

        try {
            const userStore = useUsersStore();
            const { verifyToken } = useAuthentification();

            //? Transformer l'objet body en json
            const bodyJson = JSON.stringify(body);
        
            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();

            const response = await fetch('https://127.0.0.1:8000/api/comment/reject', {
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
        validateComment,
        rejectComment
    }
}