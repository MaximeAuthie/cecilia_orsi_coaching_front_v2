export function useStat() {

    async function getVisitsStats() {

        try {

            //? Importer le composable permettant de vérifier le jwt
            const { verifyToken } = useAuthentification();

            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();

            //? Appeler l'api getVisitsStats()
            let response = await fetch('https://127.0.0.1:8000/api/visit/stats', {
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
    
    return {
        getVisitsStats
    }
}