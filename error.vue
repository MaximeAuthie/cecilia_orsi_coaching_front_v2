<script setup>
    defineProps(['error'])
</script>

<template>
    <HeaderComponent></HeaderComponent>
    <div class="content">
        <section class="content_description" >
            <div class="waiting_div_logo">
                <img src="~/assets/images/logo_loader.png" alt="logo">
            </div>
            <h3>La page demandée n'existe pas</h3>

            <NuxtLink to="/appointment"><input class="button button_content" type="button" value="Retour à l'accueil"></NuxtLink>
        </section>
    </div>
    
    <FooterComponent></FooterComponent>
</template>

<style scoped>
    .waiting_div_logo {
        margin-top: 10vh;
    }
</style>