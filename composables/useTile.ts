import { useUsersStore } from "@/store/user";

export function useTile() {

    //! Récupérer toutes les tuiles de la BDD (managerApp)
    async function getAllTiles() {

        try {

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Exécuter l'appel API
            let response = await fetch(serverUrl + 'api/tile/all', {
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

    //! Mettre à jour une tuile existante dans la BDD (managerApp)
    async function updateTile(body:object) {

        try {

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Transformer l'objet formData en json
            const bodyJson = JSON.stringify(body);

            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const { verifyToken }   = useAuthentification();
            const jwt               = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch(serverUrl + 'api/tile/update', {
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
        getAllTiles,
        updateTile
    }
}