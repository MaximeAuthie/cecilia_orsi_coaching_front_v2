<script setup>

    //? Récupérer le nom de la page pour l'utiliser dans l'appel api
    const route = useRoute();
    const title = route.fullPath;

    //? Récupérer l'adresse URL du serveur, l'url de l'icone d'onglet et le numéro de téléphone
    const config    = useRuntimeConfig();
    const serverUrl = config.public.serverUrl;
    const iconUrl = config.public.metaLinkIconUrl;
    const phone = config.public.phoneNumber;

    //? Exécuter les appels api pour récupérer les données de la page et des tuile de la page côté serveur
    const {data: pageData, pending}     = useFetch(serverUrl + 'api/page/title' + title);
    const {data: tilesData}             = useFetch(serverUrl + 'api/tile/page' + title);
    
    //? Renseigner les balises HTML de <head> pour le SEO côté serveur
    useHead({
        title: 'Cécilia Orsi Coaching - Rendez-vous',
        meta: [
            {name: 'description', content: 'Prenez rendez-vous directement en ligne, par téléphone ou via le formulaire de contact.'},
            {name:'robots', content:'index, follow'},
            {"http-equiv": 'Content-Language', content: 'fr'},
            {name: 'keywords', content: 'coach, coaching, coaching de vie, toulouse, haute-garonne, tarif, prestations'},
            {property: 'og:title', content: 'Cécilia Orsi Coaching - Rendez-vous'},
            {property: 'og:type', content: 'website'},
            {property: 'og:url', content:'https://www.cecilia-orsi.fr/blog'},
            {property: 'og:image', content: '/_nuxt/assets/images/logo_header.png'},
            {property: 'og:description', content: 'Prenez rendez-vous directement en ligne, par téléphone ou via le formulaire de contact.'},
            {name: 'twitter:card', content: 'summary_large_image'},
            {name: 'twitter: title', content: 'Cécilia Orsi Coaching - Rendez-vous'},
            {name: 'twitter:description', content: 'Prenez rendez-vous directement en ligne, par téléphone ou via le formulaire de contact.'},
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
                <div class="content_description_images_pack">
                    <div class="content_description_image" :style="{backgroundImage: 'url(' + pageData.img1_url_page + ')'}">
                        <h5>A la Villa Santé</h5>
                    </div>
                    <div class="content_description_image" :style="{backgroundImage: 'url(' + pageData.img2_url_page + ')'}">
                        <h5>En visio</h5>
                    </div>
                </div>
                    <p class="center">
                        Les rendez-vous se déroulent en visio via zoom ou sur Toulouse à la Villa santé :
                    </p>
                    <p class="center"><strong>19 rue de fenouillet <br> 31200 Toulouse</strong></p>
                    <p class="center">    
                        <strong>ATTENTION :</strong> Toute séance non annulée le jour même est due.<br>
                    </p>
                    <h3>Prise de rendez-vous en ligne</h3>
                    <div class="content_description_appointment_module">
                        <iframe src="https://soins.calendoc.net/pro/4907/119973888727169/book/date/embedded"></iframe>
                    </div>
                    <h3>Prise de rendez-vous classique</h3>
                    <p class="center">
                        Vous avez des questions ou des demandes particulières concernant votre rendez-vous?<br>
                        N’hésitez pas à utiliser notre formulaire de contact ou à ma joindre par téléphone
                    </p>
                    <div class="content_description_image_buttons">
                        <NuxtLink to="/contact"><input class="button button_content" type="button" value="Formulaire de contact"></NuxtLink>
                        <NuxtLink :to="'tel:' + phone"><input class="button button_content" type="button" value="Appel gratuit"></NuxtLink>
                    </div>
                    
                
            </section>
            <section class="content_tiles">
                <TileComponent v-for="tile in tilesData" :pageTitle="tile.title_tile" :pagePath="tile.link_tile" :pageImgUrm="tile.img_url_tile" :full-width="tile.isFullWidth_tile" ></TileComponent>
            </section>
        </div>
    </div>
</template>

<style scoped>
    .content_description_images_pack {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    .content_description_image h5 {
        z-index: 5;
    }

    .button_content {
        margin: 1vh;
    }
    .content_description_image_buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 5vh 0;
    }

    .content_description_appointment_module {
        width: 100%;
        margin-bottom: 5vh;
    }

    .content_description_appointment_module iframe {
        width: 100%;
        height: 800px;
    }


    @media screen and (min-width: 1210px) {
        .content_description_images_pack {
            flex-direction: row;
            justify-content: space-around;
        }
        .content_description_appointment_module iframe {
            display: block;
            width: 80%;
            height: 1000px;
            margin: auto;
        }
    }
</style>