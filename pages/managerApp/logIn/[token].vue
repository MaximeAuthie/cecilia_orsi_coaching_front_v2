<script setup>
    definePageMeta({
        layout: "admin-before-auth"
    });
</script>

<template>
    <div class="admin_content">
        <h1>Connexion à l'espace d'administration</h1>

        <div class="admin_content_filters_message">
            <span v-if="errorMessage" class="admin_content_filters_message_error">{{ errorMessage }}</span>
        </div>
    </div>
</template>

<script>
    import { useUsersStore } from "@/store/user";

    export default {
        data() {
            return {
                errorMessage: ''
            }
        },
        mounted() {
            //? Récupération du token dans la route à l'ouverture de la page
            const store = useUsersStore();
            store.token = this.$route.params.token.toString();

            if (store.token == 'expired-token') {
                this.errorMessage = 'Le token a expiré. Merci de renouveller votre demande de connexion';
            } else if (store.token == 'invalid-token') {
                this.errorMessage = 'Une erreur est survenue: token invalide';
            } else {
                this.$router.push('/managerApp'); 
            }
        }
    }
</script>

<style scoped>
    .admin_content {
        float: none;
        width: 100%;
    }

    .admin_content_form_bloc {
        width: 60%;
    }

    h1 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 2.2em;
        color: #4B453F;
        text-shadow: none;
    }

    .admin_content_form_buttons {
        margin-top: 5vh;
    }
</style>  