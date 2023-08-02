<template>
    <div v-if="!pageDataDownload" class="waiting_div">
        <h2>Bienvenue sur le site de Cécilia Orsi Coaching</h2>
        <h2>Veuillez patienter...</h2>
    </div>
    <div v-else>
        <BannerComponent :imgUrl="pageData.banner_url_page" :messages="pageData.BannerTextsList" :isMainButtonActive="pageData.isMainButtonActive_page" :isSecondButtonActive="pageData.isSecondaryButtonActive_page" ></BannerComponent>
        <div class="content">
            <section class="content_description">
                <div class="content_description_images">
                    <div class="content_description_image" :style="{backgroundImage: 'url(' + pageData.img1_url_page + ')'}">
                        <h5>A la Villa Santé</h5>
                    </div>
                    <div class="content_description_image" :style="{backgroundImage: 'url(' + pageData.img2_url_page + ')'}">
                        <h5>En visio</h5>
                    </div>
                </div>
                    <p>
                        Les rendez-vous se déroulent en visio via zoom ou sur Toulouse à la Villa santé :
                    </p>
                    <p class="center"><strong>19 rue de fenouillet <br> 31200 Toulouse</strong></p>
                    <p>    
                        <strong>ATTENTION :</strong> Toute séance non annulée le jour même est due.<br>
                    </p>
                    <h3>Prise de rendez-vous en ligne</h3>
                    <div class="content_description_appointment_module">
                        <iframe src="https://soins.calendoc.net/pro/4907/119973888727169/book/date/embedded"></iframe>
                    </div>
                    <h3>Prise de rendez-vous classique</h3>
                    <p>
                        Vous avez des questions ou des demandes particulières concernant votre rendez-vous?<br>
                        <br>
                        N’hésitez pas à utiliser notre formulaire de contact ou à ma joindre par téléphone
                    </p>
                    <div class="content_description_image_buttons">
                        <NuxtLink to="/contact"><input class="button button_content" type="button" value="Formulaire de contact"></NuxtLink>
                        <NuxtLink to="tel:+33139380101"><input class="button button_content" type="button" value="Appel gratuit"></NuxtLink>
                    </div>
                    
                
            </section>
            <section class="content_tiles">
                <TileComponent v-for="tile in pageData.tiles_list" :pageTitle="tile.title_tile" :pagePath="tile.link_tile" :pageImgUrm="tile.img_url_tile" :full-width="tile.fullWidth" ></TileComponent>
            </section>
        </div>
    </div>
</template>

<script>
    import { usePagesStore } from '@/store/page';

    export default {
        data() {
            return {
                pageId :            4,
                pageData :          {},
                pageDataDownload :  false
            }
        },
        methods: {
            getPageData() {
                const store = usePagesStore();

                //? Vérifier si les articles sont toujours présents dans le store
                if (store.pages.length > 0) {
                    this.pageData       = store.pages[this.pageId];
                    this.addTilesWidth();
                    this.pageDataDownload   = true;
                } else {

                //? Si les articles ne sont pas déjà présents dans le store, effectuer l'appel API
                store.getAllPages()
                    .then(() => {
                        this.pageData       = store.pages[this.pageId];
                        this.addTilesWidth();
                        this.pageDataDownload   = true;
                    })

                    //? En cas d'erreur inattendue, capter l'erreur rencontrée
                    .catch((error) => {
                    console.error('Erreur lors de la récupération des articles :', error);
                    this.pageDataDownload   = false;
                    });
                }

                
            },
            addTilesWidth() {
                //? On ajoute un proprité fullWitdh à chaque objet de this.data.tilesList (pour gérer la largueur des tuiles via une props)
                let tilesNumber = this.pageData.tiles_list.length;
                for (let i=0 ; i<tilesNumber; i++) {
                        this.pageData.tiles_list[i].fullWidth = false;
                    }

                //? Si le nombre de tuiles est impair, la valeur de la propriété fullWidth passe à true pour la dernière tuile
                if (tilesNumber%2 != 0) {
                        this.pageData.tiles_list[tilesNumber-1].fullWidth = true;
                    }
            },
        },
        mounted() {

            //? Exécution de la méthode récupérant les données de la page dans la BDD et qui les place dans l'objet this.pageData
            this.getPageData();

            //? Renseigner les balises HTML de <head> pour le SEO

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
                    {property: 'og:image', content: './assets/images/logo_header.png'},
                    {property: 'og:description', content: 'Prenez rendez-vous directement en ligne, par téléphone ou via le formulaire de contact.'},
                    {name: 'twitter:card', content: 'summary_large_image'},
                    {name: 'twitter: title', content: 'Cécilia Orsi Coaching - Rendez-vous'},
                    {name: 'twitter:description', content: 'Prenez rendez-vous directement en ligne, par téléphone ou via le formulaire de contact.'},
                    {name: 'twitter:image', content: './assets/images/logo_header.png'}
                ],
                link: [{rel: 'icon', href: './assets/images/icone_tree.png'}]
            })
        },
    };
</script>

<style scoped>
    .content_description_images {
        display: flex;
        flex-direction: column;
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
    }

    .content_description_appointment_module iframe {
        width: 100%;
        height: 800px;
    }


    @media screen and (min-width: 1210px) {
        .content_description_images {
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