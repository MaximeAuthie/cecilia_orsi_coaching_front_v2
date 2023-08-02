<template>
    <div class="admin_content">
        <h1>Gestion des articles</h1>
        <ManagerArticlesListComponent></ManagerArticlesListComponent>
    </div>
</template>

<script>

    definePageMeta({
        layout: "admin"
    });
</script>

<style scoped>
    h1 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 2.2em;
        color: #4B453F;
        text-shadow: none;
    }
</style>
