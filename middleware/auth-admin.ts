//! Middleware pour accéder aux pages de l'espace admin réservées aux administrateur

import { useUsersStore } from "@/store/user";

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useUsersStore();
        
    if (store.token == '' || store.token == 'expired-token' || store.token == 'invalid-token' || store.token == 'expired-session' || store.token == 'connexion-fail') {
        return navigateTo("/managerApp/logIn");
    }
    
    if (store.role !== 'ROLE_ADMIN') {
        return navigateTo("/managerApp/badRights");
    }
    console.log("pas pbm");
})