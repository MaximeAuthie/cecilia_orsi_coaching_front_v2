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
            <ManagerIndexStatCardComponent title="Visites totales" content="12%" color="#8EBBA7"></ManagerIndexStatCardComponent>
            <ManagerIndexStatCardComponent title="Visites 30 jours" content="412" color="#E28250"></ManagerIndexStatCardComponent>
            <ManagerIndexStatCardComponent title="Visites 24h" content="25" color="#6C89B4"></ManagerIndexStatCardComponent>
        </div>
        <ManagerIndexLastCommentsCardComponent></ManagerIndexLastCommentsCardComponent>
    </div>
</template>

<script>
    import { useUsersStore } from "@/store/user";

    export default {
        data() {
            return {
                user: ''
            }
        },
        mounted() {
            const userStore = useUsersStore();
            this.user = userStore.firstName;
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
</style>