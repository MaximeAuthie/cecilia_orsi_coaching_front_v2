<template>
    <div v-if="!pageDataDownload" class="waiting_div">
        <h2>Bienvenue sur le site de Cécilia Orsi Coaching</h2>
        <h2>Veuillez patienter...</h2>
    </div>
    <div v-else>
        <BannerComponent :imgUrl="pageData.banner_url_page" :messages="pageData.BannerTextsList" :isMainButtonActive="pageData.isMainButtonActive_page" :isSecondButtonActive="pageData.isSecondaryButtonActive_page" ></BannerComponent>
        <div class="content">
            <section class="content_description">
                <div class="content_description_avatar" :style="{backgroundImage: 'url(' + pageData.img1_url_page + ')'}"></div>
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
                pageId :            1,
                pageData :          {},
                pageDataDownload :  false
            }
        },
        methods: {
            getPageData() {
                const pageStore = usePagesStore();

                //? Vérifier si les articles sont toujours présents dans le store
                if (pageStore.pages.length > 0) {
                    this.pageData       = pageStore.pages[this.pageId];
                    this.addTilesWidth();
                    this.pageDataDownload   = true;
                } else {

                //? Si les articles ne sont pas déjà présents dans le store, effectuer l'appel API
                pageStore.getAllPages()
                    .then(() => {
                        this.pageData       = pageStore.pages[this.pageId];
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
                title: 'Cécilia Orsi Coaching - Qui je suis?',
                meta: [
                    {name: 'description', content: 'Présentation de Cécilia Orsi, coach de vie certifiée à Toulouse.'},
                    {name:'robots', content:'index, follow'},
                    {"http-equiv": 'Content-Language', content: 'fr'},
                    {name: 'keywords', content: 'coach, coaching, coaching de vie, toulouse, haute-garonne, présentation'},
                    {property: 'og:title', content: 'Cécilia Orsi Coaching - Qui je suis?'},
                    {property: 'og:type', content: 'website'},
                    {property: 'og:url', content:'https://www.cecilia-orsi.fr/owner'},
                    {property: 'og:image', content: './assets/images/logo_header.png'},
                    {property: 'og:description', content: 'Présentation de Cécilia Orsi, coach de vie certifiée à Toulouse.'},
                    {name: 'twitter:card', content: 'summary_large_image'},
                    {name: 'twitter: title', content: 'Cécilia Orsi Coaching - Qui je suis?'},
                    {name: 'twitter:description', content: 'Présentation de Cécilia Orsi, coach de vie certifiée à Toulouse.'},
                    {name: 'twitter:image', content: './assets/images/logo_header.png'}
                ],
                link: [{rel: 'icon', href: './assets/images/icone_tree.png'}]
            })
        },
    };
</script>

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