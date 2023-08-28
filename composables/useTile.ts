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
              
        } catch (error) {
            console.error(error);
        }      
    }
    
    return {
        getAllTiles
    }
}