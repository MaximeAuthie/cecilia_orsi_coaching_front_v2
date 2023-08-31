import { useUsersStore } from "@/store/user";

export function useCategory() {

    //! Récupérer toutes les catégories de la BDD (site vitrine)
    async function getAllCategories() {

        try {
            
            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Appeler l'api getAllCategories()
            let response = await fetch(serverUrl + 'api/category/all', {
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

    //! Ajouter une nouvelle catégorie dans la BDD (managerApp)
    async function addNewCategory(body:object) {

        try {
            
            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Transformer l'objet formData en json
            const bodyJson = JSON.stringify(body);

            //? Vérifier et récupérer le token pour l'identification via la fonction verifyToken du composable useAuthentification
            const { verifyToken }   = useAuthentification();
            const jwt               = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch(serverUrl + 'api/category/add', {
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
                const userStore         = useUsersStore();
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

    //! Modifier une catégorie existante dans la BDD (managerApp)
    async function updateCategory(body:object) {

        try {
            
            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Transformer l'objet formData en json
            const bodyJson = JSON.stringify(body);

            //? Vérifier et récupérer le token pour l'identification via la fonction verifyToken() du composable useAuthentification
            const { verifyToken }   = useAuthentification();
            const jwt               = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch(serverUrl + 'api/category/update', {
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

    //! Supprimer une catégorie existante dans la BDD (managerApp)
    async function deleteCategory(body:object) {

        try {

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Transformer l'objet formData en json
            const bodyJson = JSON.stringify(body);

            //? Vérifier et récupérer le token pour l'identification via la fonction verifyToken du composable useAuthentification
            const { verifyToken }   = useAuthentification();
            const jwt               = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch(serverUrl + 'api/category/delete', {
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
        getAllCategories,
        addNewCategory,
        updateCategory,
        deleteCategory
    }
}