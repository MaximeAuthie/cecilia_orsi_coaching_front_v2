<script setup>
    definePageMeta({
        layout: "admin",
        middleware: "auth"
    });
</script>

<template>
    <div class="admin_content">
        <h1>Bienvenue dans l’espace d’administration {{ user }}</h1>
        <div class="admin_content_stats">
            <ManagerIndexStatCardComponent title="Visites totales" :content="stats.all" color="#8EBBA7"></ManagerIndexStatCardComponent>
            <ManagerIndexStatCardComponent title="Visites 30 jours" :content="stats.month" color="#E28250"></ManagerIndexStatCardComponent>
            <ManagerIndexStatCardComponent title="Visites 24h" :content="stats.day" color="#6C89B4"></ManagerIndexStatCardComponent>
        </div>
        <ManagerIndexLastCommentsCardComponent></ManagerIndexLastCommentsCardComponent>
    </div>
</template>

<script>
    import { useUsersStore } from "@/store/user";
    import { useVisitStore } from '@/store/visit';

    export default {
        data() {
            return {
                user:   '',
                stats:  {}
            }
        },
        mounted() {

            //? Récupérer le prénom de l'utilisateur au montage de la page
            const userStore = useUsersStore();
            this.user = userStore.firstName;
            
            //? Récupérer les statistiques de visite au montage de la page
            const visitsStore = useVisitStore();
            this.stats = visitsStore.stats;
        }
    }
</script>

<style scoped>

    h1 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 2.2em;
        color: #4B453F;
        text-shadow: none;
    }
    .admin_content_stats{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width:90%;
        margin-top: 5vh;
    }
</style>store/visit