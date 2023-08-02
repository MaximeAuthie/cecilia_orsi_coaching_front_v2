<template>
    <div v-if="!pageDataDownload" class="waiting_div">
        <h2>Bienvenue sur le site de Cécilia Orsi Coaching</h2>
        <h2>Veuillez patienter...</h2>
    </div>
    <div v-else>
        <BannerComponent :imgUrl="pageData.banner_url_page" :messages="pageData.BannerTextsList" :isMainButtonActive="pageData.isMainButtonActive_page" :isSecondButtonActive="pageData.isSecondaryButtonActive_page" ></BannerComponent>
        <div class="content">
            <section class="content_categories">
                <div @click="showCategories" class="content_categories_title">
                    <div class="content_categories_title_content">
                        <h5>Catégories</h5>
                        <svg v-if="isCategoriesVisible" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                        <svg v-if="!isCategoriesVisible" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                    </div>
                </div>
                <div v-if="isCategoriesVisible" class="content_categories_list">
                    <CategoryTagComponent v-for="category in categories"
                        :name="category.name_category"
                        :color="category.color_category">
                    </CategoryTagComponent>
                </div>
            </section>
            <section class="content_articles">
                <div class="content_article_title">
                    <h5>A la une</h5>
                </div>
                <ArticlesFrontPageComponent
                    :id="frontPageArticle.id"
                    :title="frontPageArticle.title_article"
                    :bannerUrl="frontPageArticle.banner_url_article"
                    :categories="frontPageArticle.categories_list">
                </ArticlesFrontPageComponent>
                <div class="content_articles_list">
                    <ArticlesTileComponent v-for="article in articles"
                        :id="article.id"
                        :title="article.title_article"
                        :bannerUrl="article.banner_url_article"
                        :summary="article.summary_article"
                        :date="article.date_article"
                        :user="article.user"
                        :categories="article.categories_list"
                    ></ArticlesTileComponent>
                </div>
                <div v-if="isMoreThenNineArticles" class="content_articles_more">
                    <div class="content_categories_title_content">
                        <h5>Voir plus</h5>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </div>
            </section>
            <br>
            <br>
            <br>
            <section class="content_tiles">
                <TileComponent v-for="tile in pageData.tiles_list" :pageTitle="tile.title_tile" :pagePath="tile.link_tile" :pageImgUrm="tile.img_url_tile" :full-width="tile.fullWidth" ></TileComponent>
            </section>
        </div>
    </div>
</template>

<script>

import { usePagesStore } from '@/store/page';
import { useArticlesStore } from '@/store/article';
import { useCategoriesStore } from '@/store/category'

    export default {
        data() {
            return {
                pageId:                     3,
                isMoreThenNineArticles:     false,
                pageData:                   {},
                categories :                [],
                isCategoriesVisible:        false,
                frontPageArticle:           {},
                articles:                   [],
                pageDataDownload :          false
            }
        },
        methods: {
            getArticles() {
                const store = useArticlesStore();

                //? Vérifier si les articles sont toujours présents dans le store
                if (store.articles.length > 0) {
                    this.articles           = store.articles;
                    this.frontPageArticle   = store.frontPageArticle;
                    this.loading            = false;
                } else {

                //? Si les articles ne sont pas déjà présents dans le store, effectuer l'appel API
                store.getAllArticles()
                    .then(() => {
                    this.articles           = store.articles;
                    this.frontPageArticle   = store.frontPageArticle;
                    this.loading            = false;
                    })

                    //? En cas d'erreur inattendue, capter l'erreur rencontrée
                    .catch((error) => {
                    console.error('Erreur lors de la récupération des articles :', error);
                    this.loading            = false;
                    });
                }

            },
            getCategories() {
                const store = useCategoriesStore();

                //? Vérifier si les articles sont toujours présents dans le store
                if (store.categories.length > 0) {
                    this.categories           = store.categories;
                } else {

                //? Si les articles ne sont pas déjà présents dans le store, effectuer l'appel API
                store.getAllCategories()
                    .then(() => {
                    this.categories           = store.categories;
                    })

                    //? En cas d'erreur inattendue, capter l'erreur rencontrée
                    .catch((error) => {
                    console.error('Erreur lors de la récupération des articles :', error);
                    });
                }
            },
            showCategories() {
                this.isCategoriesVisible = !this.isCategoriesVisible;
            },
            showMoreArticles() {

            },
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
            this.getArticles();
            this.getCategories();

            //?Vérifier le nombre d'articles pour afficher la barre "voir plus"
            if (this.articles.length > 9) {
                this.isMoreThenNineArticles = true;
            }

            //? Renseigner les balises HTML de <head> pour le SEO
            useHead({
                title: 'Cécilia Orsi Coaching - Blog',
                meta: [
                    {name: 'description', content: 'Retrouvez ici tous mes articles et venez commenter et échanger avec la communauté.'},
                    {name:'robots', content:'index, follow'},
                    {"http-equiv": 'Content-Language', content: 'fr'},
                    {name: 'keywords', content: 'coach, coaching, coaching de vie, toulouse, haute-garonne, tarif, prestations'},
                    {property: 'og:title', content: 'Cécilia Orsi Coaching - Blog'},
                    {property: 'og:type', content: 'website'},
                    {property: 'og:url', content:'https://www.cecilia-orsi.fr/blog'},
                    {property: 'og:image', content: './assets/images/logo_header.png'},
                    {property: 'og:description', content: 'Retrouvez ici tous mes articles et venez commenter et échanger avec la communauté.'},
                    {name: 'twitter:card', content: 'summary_large_image'},
                    {name: 'twitter: title', content: 'Cécilia Orsi Coaching - Blog'},
                    {name: 'twitter:description', content: 'Retrouvez ici tous mes articles et venez commenter et échanger avec la communauté.'},
                    {name: 'twitter:image', content: './assets/images/logo_header.png'}
                ],
                link: [{rel: 'icon', href: './assets/images/icone_tree.png'}]
            })
        },
    };
</script>

<style scoped>
    .content_categories {
        margin-top: 5vh;
        /* background-color: aqua; */
    }
    
    .content_categories_list {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .content_categories_title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 2px;
        background-color: #E28250;
        margin-bottom: 3vh;
        cursor: pointer;
    }

    .content_categories_title svg {
        stroke: #E28250;
        width: 25px;
        height: 25px;
    }
    .content_categories_title_content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 5vh;
        padding-left: 1vh;
        padding-right: 1vh;
        background-color: #FFFFFF;
    }

    h5 {
        color: #E28250;
        font-size: 2.5em;
    }

    .content_article_title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 2px;
        background-color: #E28250;
        margin-top: 7vh;
        margin-bottom: 3vh;
    }

    .content_article_title h5 {
        background-color: #FFFFFF;
        height: 5vh;
        padding-left: 1vh;
        padding-right: 1vh;
    }

    .content_articles_list {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .content_article_more_content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 5vh;
        padding-left: 1vh;
        padding-right: 1vh;
        background-color: #FFFFFF;
    }

    .content_articles_more {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 2px;
        background-color: #E28250;
        margin-top: 7vh ;
        cursor: pointer;
    }
    .content_articles_more svg {
        stroke: #E28250;
        width: 25px;
        height: 25px;
    }

    @media screen and (min-width: 1210px) {
        .content_categories_list {
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
            align-items: center;
            margin-top: 5vh;
            /* background-color: blueviolet; */
        }
        h5 {
            color: #E28250;
            font-size: 3em;
        }
    }
</style>