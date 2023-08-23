<template>
    <div v-if="!pageDataDownload" class="waiting_div">
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
            <section class="content_categories">
                <div @click="showCategories" class="content_categories_title">
                    <div class="content_categories_title_content">
                        <h5>Catégories</h5>
                        <svg v-if="!isCategoriesVisible" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                        <svg v-if="isCategoriesVisible" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                    </div>
                </div>
                <div v-if="isCategoriesVisible" class="content_categories_list">
                    <CategoryTagComponent
                        @select="filterByCategory"
                        v-for="category in categories"
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
                isFilterActivate:          false,
                frontPageArticle:           {},
                articles:                   [],
                pageDataDownload :          false
            }
        },
        methods: {
            getArticles() {
                const articleStore = useArticlesStore();

                //? Vérifier si les articles sont toujours présents dans le store
                if (articleStore.validatedArticles.length > 0) {
                    this.articles           = articleStore.validatedArticlesToShow;
                    this.frontPageArticle   = articleStore.frontPageArticle;
                    this.loading            = false;
                } else {

                //? Si les articles ne sont pas déjà présents dans le store, effectuer l'appel API
                articleStore.getValidatedArticles()
                    .then(() => {
                        this.articles           = articleStore.validatedArticlesToShow;
                        this.frontPageArticle   = articleStore.frontPageArticle;
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
                const categoryStore = useCategoriesStore();

                //? Vérifier si les catégories sont toujours présentes dans le store
                if (categoryStore.categories.length > 0) {
                    this.categories           = categoryStore.categories;
                } else {

                //? Si les catégories ne sont pas déjà présentes dans le store, effectuer l'appel API
                categoryStore.getAllCategories()
                    .then(() => {
                        this.categories           = categoryStore.categories;
                    })

                    //? En cas d'erreur inattendue, capter l'erreur rencontrée
                    .catch((error) => {
                        console.error('Erreur lors de la récupération des catégories :', error);
                    });
                }
            },
            showCategories() {
                this.isCategoriesVisible = !this.isCategoriesVisible;
            },
            showMoreArticles() {

            },
            getPageData() {
                const pageStore = usePagesStore();

                //? Vérifier si les pages sont toujours présents dans le store
                if (pageStore.pages.length > 0) {
                    this.pageData       = pageStore.pages[this.pageId];
                    this.addTilesWidth();
                } else {

                //? Si les pages ne sont pas déjà présents dans le store, effectuer l'appel API
                pageStore.getAllPages()
                    .then(() => {
                        this.pageData       = pageStore.pages[this.pageId];
                        this.addTilesWidth();
                    })

                    //? En cas d'erreur inattendue, capter l'erreur rencontrée
                    .catch((error) => {
                    console.error('Erreur lors de la récupération des pages :', error);
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

                this.pageDataDownload   = true;
            },
            filterByCategory(categoryName, isSelected) {
                //? Déclarer la variable articleStore
                const articleStore = useArticlesStore();

                //? Si les filtres n'ont pas encore été utilisé
                if (this.isFilterActivate == false) {

                        //? Passer isFilterActivate à true => on vide this.articles pour n'y mettre que les articles de la caétgorie sélectionnée
                        this.isFilterActivate = true;
                        this.articles = [];
                        const filteredArticles = articleStore.validatedArticles.filter(article => {
                            return article.categories_list.some(category => category.name_category === categoryName);
                        });
                        filteredArticles.forEach(article => this.articles.push(article));
                } else {

                    //? Vérifier si la catégorie à été sélectionnée
                    if (isSelected) {
                        
                        //? Chercher les articles du store appartenant à cette catégorie
                        const filteredArticles = articleStore.validatedArticles.filter(article => {
                            return article.categories_list.some(category => category.name_category === categoryName);
                        });
                        
                        //? Vérifier si les articles sont déjà présents dans this.articles
                        filteredArticles.forEach(article => {
                            
                            if (!this.articles.indexOf(article) === false) {
                                
                                //? Si les articles à ajouter ne sont pas présents dans this.article => on les ajoute
                                this.articles.push(article)
                            }
                        });
                    } else {
                        
                        //? Si la catégorie a été désélectionnée ==> rechercher les articles du store appartenant à cette catégorie
                        const filteredArticles = articleStore.validatedArticles.filter(article => {
                            return article.categories_list.some(category => category.name_category === categoryName);
                        });
                        
                        filteredArticles.forEach(article => {
                            //? Rechercher l'index de chaque article dans this.article
                            const articleIndex = this.articles.indexOf(article);
                            
                            //? Supprimer l'article de this.articles grace à son index
                            this.articles.splice(articleIndex,1);
                        });
                    }
                }

                if (this.articles == '') {
                    this.articles = articleStore.validatedArticles;
                    this.isFilterActivate = false
                }
            } 
        },
        mounted() {
            //? Exécution de la méthode récupérant les données de la page dans la BDD et qui les place dans l'objet this.pageData
            this.getArticles();
            this.getCategories();
            this.getPageData();

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
        /* width: 100%; */
        display: flex;
        flex-direction: row;
        justify-content:center;
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