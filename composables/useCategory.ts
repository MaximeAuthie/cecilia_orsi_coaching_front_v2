import { useUsersStore } from "@/store/user";

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
            
        //? En cas d'erreur, capter cette erreur et la retourner  
        } catch (error) {
            console.error(error);
        }      
    }

    async function addNewCategory(body:object) {

        try {
            const userStore         = useUsersStore();
            const { verifyToken }   = useAuthentification();

            //? Transformer l'objet formData en json
            const bodyJson = JSON.stringify(body);

            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch('https://127.0.0.1:8000/api/category/add', {
                method:'POST',
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

    async function updateCategory(body:object) {

        try {
            const userStore         = useUsersStore();
            const { verifyToken }   = useAuthentification();

            //? Transformer l'objet formData en json
            const bodyJson = JSON.stringify(body);

            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch('https://127.0.0.1:8000/api/category/update', {
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

    async function deleteCategory(body:object) {

        try {
            const userStore         = useUsersStore();
            const { verifyToken }   = useAuthentification();

            //? Transformer l'objet formData en json
            const bodyJson = JSON.stringify(body);

            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch('https://127.0.0.1:8000/api/category/delete', {
                method:'DELETE',
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
        getAllCategories,
        addNewCategory,
        updateCategory,
        deleteCategory
    }
}