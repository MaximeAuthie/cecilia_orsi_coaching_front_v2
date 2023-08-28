import { useArticlesStore } from "@/store/article";
import { useUsersStore } from "@/store/user";

export function useArticle() {

    async function getAllArticles() {
            
        try {
            const { verifyToken } = useAuthentification();

            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();
            
            //? Appeler l'api getAllArticles()
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
  
    async function publishArticle(id:number) {

        try {
            const { verifyToken } = useAuthentification();
            const userStore = useUsersStore();
            const articleStore = useArticlesStore();

            //? Définir le contenu du body de la requête
            const body = {
                    id: id,
            };

            //? Transformer l'objet body en json
            const bodyJson  = JSON.stringify(body);

            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();

            //? Exécuter l'appel API si tous les champs sont remplis et que le format de la couleur est correct
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
            

            if (response.status == 200) {
                articleStore.getAllArticles();
                return response;
            } else if (response.status == 498) {
                userStore.token = '';
                navigateTo('/managerApp/logIn/expired-session'); 
            } else {
                return response;
            }
        } catch (error) {
            console.log(error);
            
            return error;
        }
    }
    
    return {
        getAllArticles,
        getValidatedArticles,
        publishArticle
    }
}