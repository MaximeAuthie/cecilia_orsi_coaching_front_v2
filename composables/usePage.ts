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
    
    return {
        getAllPages
    }
}