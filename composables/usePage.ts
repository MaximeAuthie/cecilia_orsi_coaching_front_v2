import { useUsersStore } from '@/store/user';

export function usePage() {

    //! Récupérer tous les pages de la BDD (managerApp)
    async function getAllPages() {

        try {

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Exécuter l'appel API
            let response = await fetch(serverUrl + 'api/page/all', {
                method:'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })

            //? Retourner la réponse
            const pagesList = await response.json();
            return pagesList;
              
        } catch (error) {
            console.error(error);
        }      
    }

    //! Mettre à jour une page existante dans la BDD (managerApp)
    async function updatePage(body:object) {
        try {

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Transformer l'objet body en json
            const bodyJson  = JSON.stringify(body);
            
            //? Vérifier et récupérer le token pour l'identification via la fonction verifyToken du composable useAuthentification
            const { verifyToken }   = useAuthentification();
            const jwt               = await verifyToken();
            
            //? Exécuter l'appel API 
            const response = await fetch(serverUrl + 'api/page/update', {
                method:'PATCH',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${jwt}`
                },
                body: bodyJson,
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
        getAllPages,
        updatePage
    }
}