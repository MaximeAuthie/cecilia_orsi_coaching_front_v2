import { useUsersStore } from "@/store/user";

export function useArticle() {

    async function getAllArticles() {
            
        try {
            const { verifyToken } = useAuthentification();

            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();
            
            //? Exxecuter l'appel API
            const response = await $fetch('https://127.0.0.1:8000/api/article/all', {
                method:'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${jwt}`
                }
            })

            //? Retourner la réponse
            const articlesList = await response;
            return articlesList;

        //? En cas d'erreur inattendue, capter l'erreur rencontrée et emettre une erreur dans la console
        } catch (error) {
            console.error(error); 
        }
    }

    async function getValidatedArticles() {
            
        try {
            
            //? Appeler l'api getAllArticles()
            const response = await fetch('https://127.0.0.1:8000/api/article/validated/all', {
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

    async function addArticle(body:object) {
        try {
            const userStore = useUsersStore();
            const { verifyToken } = useAuthentification();

            //? Transformer l'objet body en json
            const bodyJson = JSON.stringify(body);
            
            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch('https://127.0.0.1:8000/api/article/add', {
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
    
    async function updateArticle(body:object) {
        try {
            const userStore = useUsersStore();
            const { verifyToken } = useAuthentification();

            //? Transformer l'objet body en json
            const bodyJson = JSON.stringify(body);
            
            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();
            
            //? Exécuter l'appel API
            const response = await fetch('https://127.0.0.1:8000/api/article/update', {
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

    async function publishArticle(id:number) {

        try {
            const { verifyToken } = useAuthentification();
            const userStore = useUsersStore();

            //? Définir le contenu du body de la requête
            const body = {
                    id: id,
            };

            //? Transformer l'objet body en json
            const bodyJson  = JSON.stringify(body);

            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch('https://127.0.0.1:8000/api/article/publish', {
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

    async function disableArticle(body:object) {
        try {
            const userStore = useUsersStore();
            const { verifyToken } = useAuthentification();

            //? Transformer l'objet body en json
            const bodyJson = JSON.stringify(body);
            
            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();
            
            //? Exécuter l'appel API
            const response = await fetch("https://127.0.0.1:8000/api/article/disable", {
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