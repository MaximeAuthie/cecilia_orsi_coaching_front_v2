export function useComment() {

    async function getValidatedComments() {

        try {

            //? Appeler l'api getValidatedComments()
            let response = await fetch('https://127.0.0.1:8000/api/comment/validated', {
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
              
        } catch (error) {
            console.error(error);
        }      
    }
    
    return {
        getValidatedComments,
        getCommentsToValidate
    }
}