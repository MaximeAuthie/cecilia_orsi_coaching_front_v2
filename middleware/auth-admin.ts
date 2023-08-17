import { useUsersStore } from "@/store/user";

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useUsersStore();
    console.log("auth admin ok");
        
    if (store.token == '' || store.token == 'expired-token' || store.token == 'invalid-token' || store.token == 'expired-session') {
        console.log("pbm token");
        
        return navigateTo("/managerApp/logIn");
    }
    
    if (store.role !== 'ROLE_ADMIN') {
        console.log("pbm role");
        return navigateTo("/managerApp/badRights");
    }
    console.log("pas pbm");
})