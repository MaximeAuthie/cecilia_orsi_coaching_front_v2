import { useUsersStore } from "@/store/user";

export function useAuthentification() {

    //! Vérifier si le jwt d'authentification stocké côté client est toujours valide et en obtenir un nouveau si jamais les conditions sont respectées (managerApp)
    async function verifyToken() {

        //? Récupérer l'adresse URL du serveur
        const config    = useRuntimeConfig();
        const serverUrl = config.public.serverUrl;

        //? Récupérer le token dans le store user pour l'utiliser dans le header de la requête
        const store = useUsersStore();
        const token = store.token;

        //? Récupérer l'id de l'utilisateur dans le store user pour l'utiliser dans le body de la requête
        const body = {
            idApplicant : store.id
        }

        //? Transformer l'objet body en json
        const bodyJson = JSON.stringify(body);

        try {

            //? Appeller l'api
            const response = await fetch(serverUrl + 'api/user/jwt/check', {
                method: 'PATCH',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${token}`
                },
                body: bodyJson
            });
            
            //? Retourner la réponse : ici un noouveau token (string)
            const newToken  = await response.toString();
            store.token     = newToken;
            return newToken; 

        //? En cas d'erreur on met fin à la session
        } catch (error) {
            console.log(error)
            return navigateTo("/managerApp/logIn/expired-session");
        }
    }
    
    return {
        verifyToken
    }
}