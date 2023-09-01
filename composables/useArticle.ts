import { useUsersStore } from "@/store/user";

export function useArticle() {

    //! Récupérer tous les articles de la BDD (managerApp)
    async function getAllArticles() {
            
        try {    

            //? Vérifier et récupérer le token pour l'identification via la fonction verifyToken du composable useAuthentification
            const { verifyToken } = useAuthentification();
            const jwt = await verifyToken();

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;
            
            //? Exécuter l'appel API
            const response = await fetch(serverUrl + 'api/article/all', {
                method:'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${jwt}`
                }
            })

            //? Retourner la réponse
            const articlesList = await response.json();
            return articlesList;

        //? En cas d'erreur inattendue, capter l'erreur rencontrée et emettre une erreur dans la console
        } catch (error) {
            console.error(error); 
        }
    }

    //! Récupérer tous les articles publiés de la BDD (site vitrine)
    async function getValidatedArticles() {
            
        try {

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;
            
            //? Appeler l'api getAllArticles()
            const response = await fetch(serverUrl + 'api/article/validated/all', {
                method:'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })

            //? Retourner la réponse
            const articlesList = await response.json();
            return articlesList;

        //? En cas d'erreur inattendue, capter l'erreur rencontrée et emettre une erreur dans la console
        } catch (error) {
            console.error(error);
        }
    }

    //! Ajouter un article dans la BDD (managerApp)
    async function addArticle(body:object) {
        
        try {

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Transformer l'objet body en json
            const bodyJson = JSON.stringify(body);
            
            //? Vérifier et récupérer le token pour l'identification via la fonction verifyToken() du composable useAuthentification
            const { verifyToken }   = useAuthentification();
            const jwt               = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch(serverUrl + 'api/article/add', {
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
            if (response.status == 200) {
                return response;
            } else if (response.status == 498) {
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

    //! Modifier un article existant dans la BDD (managerApp)
    async function updateArticle(body:object) {
        
        try {

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Transformer l'objet body en json
            const bodyJson = JSON.stringify(body);
            
            //? Vérifier et récupérer le token pour l'identification via la fonction verifyToken() du composable useAuthentification
            const { verifyToken }   = useAuthentification();
            const jwt               = await verifyToken();
            
            //? Exécuter l'appel API
            const response = await fetch(serverUrl + 'api/article/update', {
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

    //! Publier un article existant dans la BDD (managerApp)
    async function publishArticle(id:number) {

        try {

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Définir le contenu du body de la requête
            const body = {
                id: id,
            };

            //? Transformer l'objet body en json
            const bodyJson  = JSON.stringify(body);

            //? Vérifier et récupérer le token pour l'identification via la fonction verifyToken() du composable useAuthentification
            const { verifyToken }   = useAuthentification();
            const jwt               = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch(serverUrl + 'api/article/publish', {
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

    //! Désactiver un article existant dans la BDD (managerApp)
    async function disableArticle(body:object) {
        try {

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Transformer l'objet body en json
            const bodyJson = JSON.stringify(body);
            
            //? Vérifier et récupérer le token pour l'identification via la fonction verifyToken() du composable useAuthentification
            const { verifyToken }   = useAuthentification();
            const jwt               = await verifyToken();
            
            //? Exécuter l'appel API
            const response = await fetch(serverUrl + "api/article/disable", {
                method: "PATCH",
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
        getAllArticles,
        getValidatedArticles,
        addArticle,
        updateArticle,
        publishArticle,
        disableArticle
    }
}