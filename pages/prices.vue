<script setup>
    //? Récupérer le nom de la page pour l'utiliser dans l'appel api
    const route = useRoute();
    const title = route.fullPath;

    //? Récupérer l'adresse URL du serveur et l'url de l'icone d'onglet
    const config    = useRuntimeConfig();
    const serverUrl = config.public.serverUrl;
    const iconUrl = config.public.metaLinkIconUrl;

    //? Exécuter les appels api pour récupérer les données de la page et des tuile de la page côté serveur
    const {data: pageData, pending}     = useFetch(serverUrl + 'api/page/title' + title);
    const {data: tilesData}             = useFetch(serverUrl + 'api/tile/page' + title);
    
    //? Renseigner les balises HTML de <head> pour le SEO côté serveur
    useHead({
        title: 'Cécilia Orsi Coaching - Tarifs',
        meta: [
            {name: 'description', content: 'Détail des prestations que je propose, des tarifs et des réductions associés.'},
            {name:'robots', content:'index, follow'},
            {"http-equiv": 'Content-Language', content: 'fr'},
            {name: 'keywords', content: 'coach, coaching, coaching de vie, toulouse, haute-garonne, tarif, prestations'},
            {property: 'og:title', content: 'Cécilia Orsi Coaching - Tarifs'},
            {property: 'og:type', content: 'website'},
            {property: 'og:url', content:'https://www.cecilia-orsi.fr/prices'},
            {property: 'og:image', content: '/_nuxt/assets/images/logo_header.png'},
            {property: 'og:description', content: 'Détail des prestations que je propose, des tarifs et des réductions associés.'},
            {name: 'twitter:card', content: 'summary_large_image'},
            {name: 'twitter: title', content: 'Cécilia Orsi Coaching - Tarifs'},
            {name: 'twitter:description', content: 'Détail des prestations que je propose, des tarifs et des réductions associés.'},
            {name: 'twitter:image', content: '/_nuxt/assets/images/logo_header.png'}
        ],
        link: [{rel: 'icon', href: iconUrl}]
    })
</script>

<template>
    <LoaderComponent v-if="pending"></LoaderComponent>
    <div v-else>
        <BannerComponent :imgUrl="pageData.banner_url_page" :messages="pageData.BannerTextsList" :isMainButtonActive="pageData.isMainButtonActive_page" :isSecondButtonActive="pageData.isSecondaryButtonActive_page" ></BannerComponent>
        <div class="content">
            <section class="content_description">
                <div class="content_description_quote">
                    <div class="content_description_quote_bar"></div>
                    <h3>Le meilleur investissement que vous puissiez faire, c'est d'investir en vous-même.</h3>
                    <br>
                    <h3>Warren Buffet</h3>
                    <div class="content_description_quote_bar"></div>
                </div>
                
                <!-- <div class="content_description_image" :style="{backgroundImage: 'url(' + pageData.img1_url_page +')'}"></div> -->
                <p class="content_description_adaptable_align">
                    Les rendez-vous se déroulent uniquement en visio.
                    <!-- Les rendez-vous se déroulent en visio via zoom ou sur Toulouse à la Villa santé : -->
                </p>
                <!-- <p class="content_description_center"><strong>19 rue de fenouillet <br> 31200 Toulouse</strong></p> -->
                
                <p class="content_description_adaptable_align">    
                    <strong>ATTENTION :</strong> Toute séance non annulée le jour même est due.<br>
                </p>
                <p class="content_description_adaptable_align">
                    Il est aujourd'hui difficile de se faire aider sans payer le prix fort dans les métiers de l'accompagnement psychologique et du coaching. Hors, il est important pour moi de rencontrer chaque personne qui en a besoin, même sans avoir les moyens de régler 60€ la séance. 
                </p>
                <p class="content_description_adaptable_align">
                    C'est pourquoi, j'ai choisis pour quelques mois de vous donner la possibilité d'un tarif "libre" qui se décline comme ceci : 
                </p>
                <h3>1h d'accompagnement en visio</h3>
                <p class="content_description_adaptable_align">
                    1 séance de coaching pour faire le point sur votre problématique, vous aider à éclaircir la situation et trouver des pistes d’amélioration en fonction de vos besoins.
                </p>
                <p class="content_description_center"><strong>Tarif libre</strong><br>Vous payez le montant qui vous semble juste et qui vous convient en fonction de votre situation financière.</p>
                <!-- <h3>1h d'accompagnement au cabinet </h3>
                <p class="content_description_adaptable_align">
                    1 séance de coaching pour faire le point sur votre problématique, vous aider à éclaircir la situation et trouver des pistes d’amélioration en fonction de vos besoins. 
                </p>
                <p class="content_description_center"><strong>Tarif libre avec un minimum de 15€</strong><br>Vous payez le montant qui vous semble juste et qui vous convient en fonction de votre situation financière + 15€ pour couvrir les frais de location du cabinet</p> -->
                <NuxtLink to="/appointment"><input class="button button_content" type="button" value="Prendre rendez-vous"></NuxtLink>
            </section>
            <section class="content_tiles">
                <TileComponent v-for="tile in tilesData" :pageTitle="tile.title_tile" :pagePath="tile.link_tile" :pageImgUrm="tile.img_url_tile" :full-width="tile.isFullWidth_tile" ></TileComponent>
            </section>
        </div>
    </div>
</template>

<style scoped>

    .content_description_quote {
        margin: 5vh 0;
    }
    .content_description_quote h3 {
        margin: 1vh 0;
    }
    .content_description_quote_bar {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 2px;
        background-color: #8EBBA7;
        cursor: pointer;
        margin: 15px 0;
    }

    .content_description_adaptable_align {
        text-align: justify;
    }

    .content_description_center{
        text-align: center;
    }

    @media screen and (min-width: 1210px) {
        .content_description_adaptable_align {
            text-align: center;
        }
    }
</style>