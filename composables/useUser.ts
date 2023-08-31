import { useUsersStore } from "@/store/user";

export function useUser() {
    
    //! Récupérer tous les utilisateurs de la BDD (managerApp)
    async function getAllUsers(bodyJson:any) {

        try {

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Vérifier et récupérer le token pour l'identification via la fonction verifyToken() du composable useAuthentification
            const { verifyToken }   = useAuthentification();
            const jwt               = await verifyToken();

            //? Exécuter l'appel API
            let response = await fetch(serverUrl + 'api/user/active/all', {
                method:'PATCH',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${jwt}`
                },
                body: bodyJson
            })

            //? Retourner la réponse
            const usersList = await response.json();   
            return usersList;

        //? En cas d'erreur, capter cette erreur et la retourner 
        } catch (error) {
            console.error(error);
        }      
    }

    //! Identifier de l'utilisateur via login + mdp => envoyer un mail de double authentification (managerApp)
    async function logIn(body:object) {
        try {

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Transformer l'objet body en json
            const bodyJson = JSON.stringify(body);

            //? Exécuter l'appel API
            const response = await fetch(serverUrl + 'api/user/logIn', {
                method:'PATCH',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: bodyJson,
            })

            //? Retourner la réponse
            return response;

        //? En cas d'erreur, capter cette erreur et la retourner
        } catch(error) {
            console.error(error);        
            return error;
        }
    }

    //! Récupérer le rôle et le nom de l'utilisateur pour adapter l'affichage de l'espace admin (managerApp)
    async function getRole(bodyJson:any) {

        try {

            //? Récupérer l'adresse URL du serveur
            const config    = useRuntimeConfig();
            const serverUrl = config.public.serverUrl;

            //? Vérifier et récupérer le token pour l'identification via la fonction verifyToken() du composable useAuthentification
            const { verifyToken }   = useAuthentification();
            const jwt               = await verifyToken();

            //? Exécuter l'appel API
            let response = await fetch(serverUrl + 'api/user/role', {
                method:'PATCH',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${jwt}`
                },
                body: bodyJson
            })

            //? Retourner la réponse
            return response;
              
        } catch (error) {
            console.error(error);
        }      
    }

    //! Ajouter un nouvel utilisateur dans la BDD (managerApp)
    async function addUser(body:object) {

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
            const response = await fetch(serverUrl + 'api/user/add', {
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

    //! Mettre à jour un utilisateur existant dans la BDD (managerApp)
    async function updateUser(body:object) {

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
            const response = await fetch(serverUrl + 'api/user/update', {
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

    //! Désactiver un utilisateur existant dans la BDD (managerApp)
    async function disableUser(body:object) {

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
            const response = await fetch(serverUrl + 'api/user/disable', {
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

    //! Récupérer les données du compte de l'utilisateur connecté dans la BDD pour les afficher dans myAccount (managerApp)
    async function getUserAccount(body:object) {

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
            const response = await fetch(serverUrl + 'api/user/account', {
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

    //! Mettre à jour les données du compte de l'utilisateur connecté dans la BDDs (managerApp)
    async function updateUserAccount(body:object) {

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
            const response = await fetch(serverUrl + 'api/user/account/update', {
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
    return {
        getAllUsers,
        logIn,
        getRole,
        addUser,
        updateUser,
        disableUser,
        getUserAccount,
        updateUserAccount
    }
}