<template>
    <div v-if="!pageDataDownload" class="waiting_div">
        <h2>Bienvenue sur le site de Cécilia Orsi Coaching</h2>
        <h2>Veuillez patienter...</h2>
    </div>
    <div v-else>
        <BannerComponent :imgUrl="pageData.banner_url_page" :messages="pageData.BannerTextsList" :isMainButtonActive="pageData.isMainButtonActive_page" :isSecondButtonActive="pageData.isSecondaryButtonActive_page" ></BannerComponent>
        <div class="content">
            <section class="content_description">
                <div class="content_description_quote">
                    <div class="content_description_quote_bar"></div>
                    <h3>Le meilleur investissement que vous puissiez faire, c'est d'investir en vous-même.</h3>
                    <br>
                    <h3>Warren Buffet</h3>
                </div>
                <div class="content_description_quote_bar"></div>
                <div class="content_description_image" :style="{backgroundImage: 'url(' + pageData.img1_url_page +')'}"></div>
                <p>
                    Les rendez-vous se déroulent en visio via zoom ou sur Toulouse à la Villa santé :
                </p>
                <p class="center"><strong>19 rue de fenouillet <br> 31200 Toulouse</strong></p>
                
                <p>    
                    <strong>ATTENTION :</strong> Toute séance non annulée le jour même est due.<br>
                </p>
                <h3>Coaching de base (60 minutes)</h3>
                <p>
                    1 séance de coaching pour faire le point sur votre problématique, vous aider à éclaircir la situation et trouver des pistes d’amélioration en fonction de vos besoins. <br>
                    Vous pouvez choisir de prendre plusieurs séances ou de vous contenter d’une séance unique.
                </p>
                <p class="center"><strong>55€ tarif plein</strong><br>25€ pour les personnes pour les étudiants et personnes au RSA</p>
                <h3>Coaching de suivi</h3>
                <p>
                    5 séances d’une heure pour vous aider à atteindre un objectif, à dépasser vos blocages, prendre confiance en vous et connaître vos besoins et vos ressources.
                </p>
                <p class="center"><strong>260€ tarif plein</strong><br>115€ pour les personnes pour les étudiants et personnes au RSA</p>
                <NuxtLink to="/appointment"><input class="button button_content" type="button" value="Prendre rendez-vous"></NuxtLink>
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
                pageId :            2,
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
                title: 'Cécilia Orsi Coaching - Tarifs',
                meta: [
                    {name: 'description', content: 'Détail des prestations que je propose, des tarifs et des réductions associés.'},
                    {name:'robots', content:'index, follow'},
                    {"http-equiv": 'Content-Language', content: 'fr'},
                    {name: 'keywords', content: 'coach, coaching, coaching de vie, toulouse, haute-garonne, tarif, prestations'},
                    {property: 'og:title', content: 'Cécilia Orsi Coaching - Tarifs'},
                    {property: 'og:type', content: 'website'},
                    {property: 'og:url', content:'https://www.cecilia-orsi.fr/prices'},
                    {property: 'og:image', content: './assets/images/logo_header.png'},
                    {property: 'og:description', content: 'Détail des prestations que je propose, des tarifs et des réductions associés.'},
                    {name: 'twitter:card', content: 'summary_large_image'},
                    {name: 'twitter: title', content: 'Cécilia Orsi Coaching - Tarifs'},
                    {name: 'twitter:description', content: 'Détail des prestations que je propose, des tarifs et des réductions associés.'},
                    {name: 'twitter:image', content: './assets/images/logo_header.png'}
                ],
                link: [{rel: 'icon', href: './assets/images/icone_tree.png'}]
            })
        },
    };
</script>

<style scoped>

    h3 {
        margin-top: 13vh;
    }
    .content_description_quote {
        margin-top: 3vh;
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
    }
    

    
</style>