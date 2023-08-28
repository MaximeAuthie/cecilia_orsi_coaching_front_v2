export function useCategory() {

    async function getAllCategories() {

        try {

            //? Appeler l'api getAllCategories()
            let response = await fetch('https://127.0.0.1:8000/api/category/all', {
                method:'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })

            //? Retourner la réponse
            const categoriesList = await response.json();
            
            return categoriesList;
              
        } catch (error) {
            console.error(error);
        }      
    }
    
    return {
        getAllCategories
    }
}