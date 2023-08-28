export function useUser() {

    async function getAllUsers(bodyJson:any) {

        try {

            //? Importer le composable permettant de vérifier le jwt
            const { verifyToken } = useAuthentification();

            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();

            //? Appeler l'api getVisitsStats()
            let response = await fetch('https://127.0.0.1:8000/api/user/active/all', {
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
            const usersList = await response.json();
            
            return usersList;
              
        } catch (error) {
            console.error(error);
        }      
    }

    async function getRole(bodyJson:any) {

        try {

            //? Importer le composable permettant de vérifier le jwt
            const { verifyToken } = useAuthentification();

            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();

            //? Appeler l'api getVisitsStats()
            let response = await fetch('https://127.0.0.1:8000/api/user/role', {
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
            const usersData = await response.json();
            
            return usersData;
              
        } catch (error) {
            console.error(error);
        }      
    }
    
    return {
        getAllUsers,
        getRole
    }
}