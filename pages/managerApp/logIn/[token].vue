<script setup>
    definePageMeta({
        layout: "admin-before-auth"
    });
</script>

<template>
    <div class="admin_content">
        <h1>Connexion à l'espace d'administration</h1>

        <div class="admin_content_warning">
            <svg v-if="successMessage" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="admin_content_warning_success">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <svg v-if="errorMessage" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="admin_content_warning_error">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
            </svg>
        </div>
        

        <div class="admin_content_filters_message">
            <span v-if="successMessage" class="admin_content_filters_message_success">{{ successMessage }}</span>
            <span v-if="errorMessage" class="admin_content_filters_message_error">{{ errorMessage }}</span>
        </div>
        <NuxtLink to="/managerApp/logIn">
            <div v-if="errorMessage" class="admin_content_link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clip-rule="evenodd" />
                </svg>
                Retour à la page d'authentification.
            </div>
        </NuxtLink>
    </div>
</template>

<script>
    import { useUsersStore } from "@/store/user";
    import { useArticlesStore } from '@/store/article';
    import { usePagesStore } from '@/store/page';
    import { useCategoriesStore } from '@/store/category'
    import { useCommentsStore } from '@/store/comment';
    import { useTilesStore } from '@/store/tile';
    import { useVisitsStore } from '@/store/visit';

    export default {
        data() {
            return {
                errorMessage:   '',
                successMessage: ''
            }
        },
        mounted() {
            //? Récupération du token dans la route à l'ouverture de la page
            const userStore = useUsersStore();
            let token = this.$route.params.token.toString();
            
            if (token == 'expired-token') {
                this.errorMessage   = 'Le token a expiré. Merci de renouveller votre demande de connexion';
                userStore.token     = 'expired-token';
            } else if (token == 'invalid-token') {
                this.errorMessage   = 'Une erreur est survenue: token invalide';
                userStore.token     = 'invalid-token';
            } else if (token == 'expired-session') {
                this.errorMessage   = 'Votre session a expirée. Merci de vous reconnecter si vous souhaitez accéder à nouveau à l\'espace d\'administration.';
                userStore.token     = 'expired-session';
            } else if (token == 'connexion-fail') {
                this.errorMessage   = 'Une erreur est survenue. Merci de réessayer plus tard.';
                userStore.token     = 'connexion-fail';
            } else {

                //? Récupérer le jwt dans le paramètre
                userStore.token = token.toString().split('!').slice(0, -1).join('!');
                
                //? Récupérer l'id de l'utilisateur dans le paramètre
                userStore.id = token.toString().split('!').pop();

                //? Appel des méthodes get des autres stores pour précharcher les informations de tout l'espace admin
                const visitsStore = useVisitsStore();
                visitsStore.getVisitsStats();
                
                const commentsStore = useCommentsStore();
                commentsStore.getCommentsToValidate();
                commentsStore.getModeratedComments();
                
                const articlesStore = useArticlesStore();
                articlesStore.getAllArticles();

                const pagesStore = usePagesStore();
                pagesStore.getAllPages();

                const categoriesStore = useCategoriesStore();
                categoriesStore.getAllCategories();

                const tilesStore = useTilesStore();
                tilesStore.getAllTiles();

                //? Afficher le message de réussité à l'utilisateur
                this.successMessage = 'Connexion réussie. Vous allez être redirigé vers la page d\'accueil';

                //? Appel de la méthode getRole() du store User pour récupérer le rôle de l'utilisateur
                userStore.getRole()
                
            }
        }
    }
</script>

<style scoped>
    .admin_content {
        float: none;
        width: 100%;
    }

    h1 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 2.2em;
        color: #4B453F;
        text-shadow: none;
    }
    .admin_content_filters_message {
        margin-top: 7vh;
    }
    .admin_content_link { 
        margin-top: 7vh;
    }
    .admin_content_warning svg {
        height: 25vh;
        width: auto;
        margin-top: 3vh;
    }
    .admin_content_warning_success {
        stroke: #7DD274;
    }

    .admin_content_warning_error {
        stroke: #ee818e;
    }
</style>  