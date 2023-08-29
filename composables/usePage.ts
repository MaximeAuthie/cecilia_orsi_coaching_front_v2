import { useUsersStore } from '@/store/user';

export function usePage() {

    async function getAllPages() {

        try {

            //? Appeler l'api getAllPages()
            let response = await fetch('https://127.0.0.1:8000/api/page/all', {
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

    async function updatePage(body:object) {
        try {

            const userStore = useUsersStore();
            const { verifyToken } = useAuthentification();

            //? Transformer l'objet body en json
            const bodyJson  = JSON.stringify(body);
            
            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();
            
            //? Exécuter l'appel API 
            const response = await fetch('https://127.0.0.1:8000/api/page/update', {
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