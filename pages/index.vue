<script setup>
    import { useArticlesStore } from '@/store/article';
    import { useCategoriesStore } from '@/store/category'

    const articlesStore = useArticlesStore();
    articlesStore.getValidatedArticles();

    const categoriesStore = useCategoriesStore();
    categoriesStore.getAllCategories();
    
    const title = '/index';

    const {data: pageData} = useFetch('https://www.maximeauthie.fr/api/page' + title);
    const {data: tilesData, pending} = useFetch('https://www.maximeauthie.fr/api/tile' + title);
    
    useHead({
        title: 'Cécilia Orsi Coaching',
        meta: [
            {name: 'description', content: 'Cécilia Orsi, coach de vie certifiée à Toulouse'},
            {name:'robots', content:'index, follow'},
            {"http-equiv": 'Content-Language', content: 'fr'},
            {name: 'keywords', content: 'coach, coaching, coaching de vie, toulouse, haute-garonne'},
            {property: 'og:title', content: 'Cécilia Orsi, coach de vie certifiée à Toulouse'},
            {property: 'og:type', content: 'website'},
            {property: 'og:url', content:'https://www.cecilia-orsi.fr/'},
            {property: 'og:image', content: '/_nuxt/assets/images/logo_header.png'},
            {property: 'og:description', content: 'Coach de vie certifiée intervenant en région Toulousaine. Accompagnement personnalisé pour atteindre un mieux-être et/ou réaliser ses objectifs.'},
            {name: 'twitter:card', content: 'summary_large_image'},
            {name: 'twitter: title', content: 'Cécilia Orsi, coach de vie certifiée à Toulouse'},
            {name: 'twitter:description', content: 'Coach de vie certifiée intervenant en région Toulousaine. Accompagnement personnalisé pour atteindre un mieux-être et/ou réaliser ses objectifs.'},
            {name: 'twitter:image', content: '/_nuxt/assets/images/logo_header.png'}
        ],
        link: [{rel: 'icon', href: '/_nuxt/assets/images/icone_tree.png'}]
    })
</script>

<template>
    <div v-if="pending" class="waiting_div">
        <div class="waiting_div_logo">
            <img src="~/assets/images/logo_loader.png" alt="logo">
        </div>
        <h2>Cécilia Orsi Coaching</h2>
        <div class="waiting_div_loader">
            <p>Chargement en cours...</p>
        </div>
    </div>
    <div v-else>
        <BannerComponent :imgUrl="pageData.banner_url_page" :messages="pageData.BannerTextsList" :isMainButtonActive="pageData.isMainButtonActive_page" :isSecondButtonActive="pageData.isSecondaryButtonActive_page" ></BannerComponent>
        <div class="content">
            <section class="content_description">
                <h2>Pourquoi venir en séance?</h2>
                <p>Chacun d’entre nous peut à un moment donné, se retrouver dans une période compliquée. Il est donc normal de se sentir démuni face à certaines situations, à certains changements, à nos manques de décisions, à nos émotions débordantes ou au contraire refoulées, à notre stress… Ce qui devient problématique, c’est lorsque ces situations et ces émotions nous freinent, nous font souffrir et perdurent dans le temps.</p>
                <h3>Comment prendre le recul nécessaire? Par où commencer?</h3>
                <p>C’est précisément dans ces moments-là qu’une personne extérieure, permet de vous aider à débloquer la situation et d’aller de l’avant avec la bonne écoute, les bons outils et des questionnements adéquats pour vous permettre une réflexion appropriée.</p>
                <h3>Ce que vous pouvez faire</h3>
                <p>Accepter de vous livrer, être dans une véritable optique de changement.Si vous vous sentez concernés, si vous souhaitez prendre les choses en main, je vous invite à m’écrire via le formulaire de contact ou à prendre rendez-vous dans la section « Rendez-vous ».</p>
                <NuxtLink to="/appointment"><input class="button button_content" type="button" value="Prendre rendez-vous"></NuxtLink>
            </section>
            <section class="content_tiles">
                <TileComponent v-for="tile in tilesData" :pageTitle="tile.title_tile" :pagePath="tile.link_tile" :pageImgUrm="tile.img_url_tile" :full-width="tile.isFullWidth_tile" ></TileComponent>
            </section>
        </div>
    </div>
</template>
