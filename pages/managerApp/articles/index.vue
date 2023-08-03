<template>
    <div class="admin_content">
        <h1>Gestion des articles</h1>
        
        <nuxt-link to="/managerApp/articles/newArticle" class="article_item_icon_link">
            <button class="admin_button admin_button_main">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                Nouvel article
            </button>
        </nuxt-link>
            
        
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

    .article_item_icon_link {
        color: #FFFFFF;
    }

    .admin_button svg {
        width: 3vh;
    }
</style>
