<template>
    <div class="admin_content">
        <h1>Modération des commentaires</h1>
        <div class="admin_content_filters">
            <div class="admin_content_filters_bloc">
                <label for="status" class="admin_label">Status :</label>
                <select v-model="commentStatus" name="status" id="status" class="admin_select">
                    <option value="to-validate" class="admin_option">A valider</option>
                    <option value="already-validate" class="admin_option">Déjà validés</option>
                </select>
            </div>
            <div class="admin_content_filters_bloc">
                <label for="article" class="admin_label">Article :</label>
                <select v-model="article" name="article" id="article" class="admin_select">
                    <option v-for="article in articles" :value="article.id" class="admin_option">{{article.title_article}}</option>
                </select>
            </div>
            <div class="admin_content_filters_bloc">
                <br>
                <button @click="getComments" class="admin_button admin_button_main">Filtrer</button>
            </div>
        </div>    
        <ManagerCommentComposant v-if="displayComments" v-for="comment in comments"
            :id="comment.id"
            :title="comment.article.title_article"
            :author="comment.author_name_comment"
            :dateTime="comment.date_comment"
            :content="comment.content_comment"
            :isValidated="comment.isValidated_comment">
        </ManagerCommentComposant>
    </div>
</template>

<script>
    import { useCommentsStore } from '@/store/comment';
    import { useArticlesStore } from '@/store/article';

    definePageMeta({
        layout: "admin"
    });

    export default {
        data() {
            return {
                commentStatus:      '',
                article:            0,
                articles:           [],
                comments:           [],
                displayComments:    false
            }
        },
        methods: {
            getComments() {
                const store = useCommentsStore();
                if (this.commentStatus === 'already-validate') {
                    this.comments = store.comments.filter( comment => comment.article.id == this.article);
                    this.comments.sort((a,b) => (a.id < b.id ? 1 : -1));
                } else {
                    this.comments = store.commentsToValidate.filter( comment => comment.article.id == this.article);
                    this.comments.sort((a,b) => (a.id < b.id ? 1 : -1));
                }
                this.displayComments = true;
            },
            getValidatedComments() {
                const store = useCommentsStore();

               //? Vérifier si les articles validés sont toujours présents dans le store, récupérer les données de l'article
               if (store.comments.length > 0) {
                    this.comments                   = store.comments;
                    this.comments.sort((a,b) => (a.id < b.id ? 1 : -1));
                    this.isArticleLoaded            = true;
                } else {

                //? Si les articles ne sont pas déjà présents dans le store, effectuer l'appel API et récupérer les données de l'article
                store.getValidatedComments()
                    .then(() => {
                        this.comments            = store.comments;
                        this.comments.sort((a,b) => (a.id < b.id ? 1 : -1));
                    })

                    //? En cas d'erreur inattendue, capter l'erreur rencontrée
                    .catch((error) => {
                        console.error('Erreur lors de la récupération des commentaires :', error);
                    });
                }
            },
            getCommentsToValidate() {
                const store = useCommentsStore();

               //? Vérifier si les articles validé sont toujours présents dans le store, récupérer les données de l'article
               if (store.comments.length > 0) {
                    this.comments               = store.commentsToValidate;
                    this.comments.sort((a,b) => (a.id < b.id ? 1 : -1));
                    this.isArticleLoaded        = true;
                } else {

                //? Si les articles ne sont pas déjà présents dans le store, effectuer l'appel API et récupérer les données de l'article
                store.getCommentsToValidate()
                    .then(() => {
                        this.comments               = store.commentsToValidate;
                        this.comments.sort((a,b) => (a.id < b.id ? 1 : -1));
                    })

                    //? En cas d'erreur inattendue, capter l'erreur rencontrée
                    .catch((error) => {
                        console.error('Erreur lors de la récupération des commentaires :', error);
                    });
                }
            },
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
            }
        },
        mounted() {
            this.getArticles();
            this.getValidatedComments();
            this.getCommentsToValidate();
            const store = useCommentsStore();
            store.$subscribe(state => {
                
                if (this.commentStatus === 'already-validate') {
                    console.log("changement store already-validate");
                    this.comments = store.comments;
                } else if (this.commentStatus === "to-validate" ) {
                    console.log("changement store to-validate");
                    this.comments = store.commentsToValidate;
                }
            })

            const articleStore = useArticlesStore();
            articleStore.$subscribe(state => {
                console.log("changement store article");
                this.articles = articleStore.articles;
            })
        }
    }
    
</script>

<style scoped>
    h1 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 2.2em;
        color: #4B453F;
        text-shadow: none;
    }
</style>