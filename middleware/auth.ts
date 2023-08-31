//! Middleware pour accéder aux pages de l'espace admin accessibles aux utilisateurs standards et aux administrateurs

import { useUsersStore } from "@/store/user";

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useUsersStore();
    
    if (store.token == '' || store.token == 'expired-token' || store.token == 'invalid-token' || store.token == 'expired-session' || store.token == 'connexion-fail') {
        return navigateTo("/managerApp/logIn");
    }
    
})