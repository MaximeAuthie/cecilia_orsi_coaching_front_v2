<script setup>

    //? Récupérer le nom de la page pour l'utiliser dans l'appel api
    const route = useRoute();
    const title = route.fullPath;

    //? Récupérer l'adresse URL du serveur
    const config    = useRuntimeConfig();
    const serverUrl = config.public.serverUrl;

    //? Exécuter les appels api pour récupérer les données de la page et des tuile de la page côté serveur
    const {data: pageData, pending}     = useFetch(serverUrl + 'api/page/title' + title);
    const {data: tilesData}             = useFetch(serverUrl + 'api/tile/page' + title);
    
    //? Renseigner les balises HTML de <head> pour le SEO côté serveur
    useHead({
        title: 'Cécilia Orsi Coaching - Qui je suis?',
        meta: [
            {name: 'description', content: 'Présentation de Cécilia Orsi, coach de vie certifiée à Toulouse.'},
            {name:'robots', content:'index, follow'},
            {"http-equiv": 'Content-Language', content: 'fr'},
            {name: 'keywords', content: 'coach, coaching, coaching de vie, toulouse, haute-garonne, présentation'},
            {property: 'og:title', content: 'Cécilia Orsi Coaching - Qui je suis?'},
            {property: 'og:type', content: 'website'},
            {property: 'og:url', content:'https://www.cecilia-orsi.fr/owner'},
            {property: 'og:image', content: '/_nuxt/assets/images/logo_header.png'},
            {property: 'og:description', content: 'Présentation de Cécilia Orsi, coach de vie certifiée à Toulouse.'},
            {name: 'twitter:card', content: 'summary_large_image'},
            {name: 'twitter: title', content: 'Cécilia Orsi Coaching - Qui je suis?'},
            {name: 'twitter:description', content: 'Présentation de Cécilia Orsi, coach de vie certifiée à Toulouse.'},
            {name: 'twitter:image', content: '/_nuxt/assets/images/logo_header.png'}
        ],
        link: [{rel: 'icon', href: '/_nuxt/assets/images/icone_tree.png'}]
    })
</script>

<template>
    <LoaderComponent v-if="pending"></LoaderComponent>
    <div v-else>
        <BannerComponent :imgUrl="pageData.banner_url_page" :messages="pageData.BannerTextsList" :isMainButtonActive="pageData.isMainButtonActive_page" :isSecondButtonActive="pageData.isSecondaryButtonActive_page" ></BannerComponent>
        <div class="content">
            <section class="content_description" >
                <div class="content_description_avatar" style="background-image: url('~/public/cecilia-orsi.png');"></div>
                <p>
                    Je m’appelle Cécilia Orsi, j’ai 31 ans je vis à Toulouse.<br>
                    <br>
                    Ayant été anxieuse sociale pendant des années, je sais l’importance d’un accompagnement adéquat.
                    Suite à de nombreuses expériences professionnelles (la plupart dans le social et la petite enfance), passionnée de psychologie et de compréhension des comportements humains je décide d’aller plus loin dans mes envies et mes convictions. <br>
                    J’entreprends un travail sur moi qui m’as permis de comprendre mon fonctionnement et de m’ouvrir à ce que j’aime le plus : comprendre et aider les autres.<br>
                    <br>
                    Ma première formation fût en psychologie et plus particulièrement en thérapies brèves (Thérapie cognitivo comportementale).<br>     
                    Une fois obtenue, j’ai par la suite entrepris une formation certifiante en coaching de vie.<br>
                    Aujourd’hui entrepreneuse, j’accompagne des femmes et des hommes dans de multiples problématiques, pour leur permettre d’être en accord avec leurs besoins et leurs envies.<br>
                    <br>
                    Mon but sera de vous accompagner en toute neutralité, de vous aider à cheminer vers un mieux-être ou un objectif définit ensemble. Dans ma pratique il y a bien sur de l’écoute active, des questionnements mais aussi des outils qui vous serons utiles lors de vos réflexions et qui vous permettront d’y voir plus clair.<br>
                    <br>
                    Mon approche est humaniste et j’utilise principalement l’analyse transactionnelle comme méthodologie de travail, cependant je m’adapte à vous et nous voyons ensemble ce qui vous convient le plus.<br>
                    <br>
                    A bientôt!
                </p>
                <NuxtLink to="/appointment"><input class="button button_content" type="button" value="Prendre rendez-vous"></NuxtLink>
            </section>
            <section class="content_tiles">
                <TileComponent v-for="tile in tilesData" :pageTitle="tile.title_tile" :pagePath="tile.link_tile" :pageImgUrm="tile.img_url_tile" :full-width="tile.isFullWidth_tile" ></TileComponent>
            </section>
        </div>
    </div>
</template>

<style scoped>
.content_description_avatar {
    width: 30vh;
    height: 30vh;
    border-radius: 20vh;
    background-size: cover; 
    background-position: center;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    margin: 10vh 0;
}
</style>