import { useUsersStore } from "@/store/user";

export function useUser() {

    async function getAllUsers(bodyJson:any) {

        try {

            //? Importer le composable permettant de vérifier le jwt
            const { verifyToken } = useAuthentification();

            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();

            //? Appeler l'api getVisitsStats()
            let response = await fetch('https://127.0.0.1:8000/api/user/active/all', {
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
    async function logIn(body:object) {
        try {
            //? Transformer l'objet body en json
            const bodyJson = JSON.stringify(body);

            //? Exécuter l'appel API
            const response = await fetch('https://localhost:8000/api/user/logIn', {
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
    async function getRole(bodyJson:any) {

        try {

            //? Importer le composable permettant de vérifier le jwt
            const { verifyToken } = useAuthentification();

            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();

            //? Appeler l'api getVisitsStats()
            let response = await fetch('https://127.0.0.1:8000/api/user/role', {
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
            const usersData = await response.json();
            return usersData;
              
        } catch (error) {
            console.error(error);
        }      
    }
    async function addUser(body:object) {

        try {
            const userStore = useUsersStore();
            const { verifyToken } = useAuthentification();

            //? Transformer l'objet body en json
            const bodyJson = JSON.stringify(body);
            
            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch('https://127.0.0.1:8000/api/user/add', {
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
    async function updateUser(body:object) {

        try {
            const userStore = useUsersStore();
            const { verifyToken } = useAuthentification();

            //? Transformer l'objet body en json
            const bodyJson = JSON.stringify(body);
            
            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch('https://127.0.0.1:8000/api/user/update', {
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
    async function disableUser(body:object) {

        try {
            const userStore = useUsersStore();
            const { verifyToken } = useAuthentification();

            //? Transformer l'objet body en json
            const bodyJson = JSON.stringify(body);
            
            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch('https://127.0.0.1:8000/api/user/disable', {
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
    async function getUserAccount(body:object) {

        try {
            const userStore = useUsersStore();
            const { verifyToken } = useAuthentification();

            //? Transformer l'objet body en json
            const bodyJson = JSON.stringify(body);
            
            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch('https://127.0.0.1:8000/api/user/account', {
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
    async function updateUserAccount(body:object) {

        try {
            const userStore = useUsersStore();
            const { verifyToken } = useAuthentification();

            //? Transformer l'objet body en json
            const bodyJson = JSON.stringify(body);
            
            //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
            const jwt = await verifyToken();

            //? Exécuter l'appel API
            const response = await fetch('https://127.0.0.1:8000/api/user/account/update', {
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