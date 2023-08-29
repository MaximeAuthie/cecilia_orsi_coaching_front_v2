import { useUsersStore } from "@/store/user";

export function useTile() {

    async function getAllTiles() {

        try {

            //? Appeler l'api getVisitsStats()
            let response = await fetch('https://127.0.0.1:8000/api/tile/all', {
                method:'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })

            //? Retourner la réponse
            const tilesList = await response.json();
            return tilesList;
            
        //? En cas d'erreur, capter cette erreur et la retourner
        } catch (error) {
            console.error(error);
        }      
    }
    
    async function updateTile(body:object) {

        try {
            const userStore         = useUsersStore();
            const { verifyToken }   = useAuthentification();

            //? Transformer l'objet formData en json
            const bodyJson = JSON.stringify(body);

            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch('https://127.0.0.1:8000/api/tile/update', {
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
        getAllTiles,
        updateTile
    }
}