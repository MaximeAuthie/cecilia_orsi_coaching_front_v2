import { useUsersStore } from "@/store/user";

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useUsersStore();
    
    if (store.token == '') {
        return navigateTo("/managerApp/logIn");
    }
    
})