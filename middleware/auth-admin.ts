//! Middleware pour accéder aux pages de l'espace admin réservées aux administrateur
//? Importer le store user pour récupérér le token et le rôle de l'utilisateur
import { useUsersStore } from "@/store/user";

export default defineNuxtRouteMiddleware((to, from) => {

    //? Stocker le store dans une constante
    const store = useUsersStore();
    
    //? Vérifier s'il n'y a pas un problème d'identification à l'ouverture de la page
    if (store.token == '' || store.token == 'expired-token' || store.token == 'invalid-token' || store.token == 'expired-session' || store.token == 'connexion-fail') {
        return navigateTo("/managerApp/logIn");
    }
    
    //? Vérifier le rôle de l'utilisateur et le rediriger si besoin
    if (store.role !== 'ROLE_ADMIN') {
        return navigateTo("/managerApp/badRights");
    }
    
})