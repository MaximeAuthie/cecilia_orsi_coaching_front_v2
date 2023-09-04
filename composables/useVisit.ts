export function useVisit() {
    
    //! Récupérer les statistique de visite pour la page d'accueil (managerApp)
    async function getVisitsStats() {

        try {

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Vérifier et récupérer le token pour l'identification via la fonction verifyToken() du composable useAuthentification
            const { verifyToken }   = useAuthentification();
            const jwt               = await verifyToken();

            //? Exécuter l'appel API
            let response = await fetch(serverUrl + 'api/visit/stats', {
                method:'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${jwt}`
                }
            })

            //? Retourner la réponse
            const statsList = await response.json();
            return statsList;
        
        //? En cas d'erreur, capter cette erreur et la retourner
        } catch (error) {
            console.error(error);
        }      
    }

     //! Ajouter une visite dans la BDD (site vitrine)
     async function addVisit(body:object) {
        
        try {

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Transformer l'objet body en json
            const bodyJson = JSON.stringify(body);

            //? Exécuter l'appel API
            const response = await fetch(serverUrl + 'api/visit/add', {
                method:'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: bodyJson,
            })

            //? Retourner la réponse
            const ip = await response.json();

        //? En cas d'erreur, capter cette erreur et la retourner
        } catch(error) {
            console.error(error);      
        }
    }
    
    return {
        getVisitsStats,
        addVisit
    }
}