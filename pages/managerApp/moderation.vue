<script setup>
    definePageMeta({
        layout: "admin",
        middleware: "auth"
    });
</script>

<template>
    <div @click="formErrorMessage = ''" class="admin_content">
        <h1>Modération des commentaires</h1>
        <div class="admin_content_filters">
            <div class="admin_content_filters_bloc">
                <label for="status" class="admin_label">Statut :</label>
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
            <div @mouseout="" class="admin_content_filters_bloc">
                <br>
                <button @click="getComments" class="admin_button admin_button_main">Filtrer</button>
            </div>
            
        </div>
        <div class="admin_content_filters_message">
            <span v-if="formErrorMessage" class="admin_content_filters_message_error">{{ formErrorMessage }}</span>
        </div>
            
        <ManagerCommentComposant
            v-if="displayComments"
            v-for="comment in comments"
            @error="errorOnComment"
            :id="comment.id"
            :title="comment.article.title_article"
            :author="comment.author_name_comment"
            :dateTime="comment.date_comment"
            :content="comment.content_comment"
            :isValidated="comment.isValidated_comment">
        </ManagerCommentComposant>
        <div v-if="comments.length == 0" class="admin_content_no_comment">Aucun commentaire à afficher</div>
    </div>
</template>

<script>
    import { useCommentsStore } from '@/store/comment';
    import { useArticlesStore } from '@/store/article';

    export default {
        data() {
            return {
                commentStatus:      '',
                article:            0,
                articles:           [],
                comments:           [],
                displayComments:    false,
                formErrorMessage:   ''
            }
        },
        methods: {

            //! Récupérer les commentaires filtrés par l'utilisateur via le store useCommentsStore
            getComments() {
                const commentStore = useCommentsStore();
                if (this.commentStatus === 'already-validate') {
                    this.comments = commentStore.comments.filter( comment => comment.article.id == this.article);
                } else {
                    this.comments = commentStore.commentsToValidate.filter( comment => comment.article.id == this.article);
                }
                this.displayComments = true;
            },

            //! Récupérer les commentaires déjà modérés via le store useCommentsStore
            getModeratedComments() {
                const commentStore = useCommentsStore();

               //? Vérifier si les articles validés sont toujours présents dans le store, récupérer les données de l'article
               if (commentStore.comments.length > 0) {
                    this.comments                   = commentStore.comments;
                    this.isArticleLoaded            = true;
                } else {

                //? Si les articles ne sont pas déjà présents dans le store, effectuer l'appel API et récupérer les données de l'article
                commentStore.getModeratedComments()
                    .then(() => {
                        this.comments            = commentStore.comments;
                    })

                    //? En cas d'erreur inattendue, capter l'erreur rencontrée
                    .catch((error) => {
                        console.error('Erreur lors de la récupération des commentaires :', error);
                    });
                }
            },

            //! Récupérer les commentaires à valider via le store useCommentsStore
            getCommentsToValidate() {
                const commentStore = useCommentsStore();

               //? Vérifier si les articles validé sont toujours présents dans le store, récupérer les données de l'article
               if (commentStore.comments.length > 0) {
                    this.comments               = commentStore.commentsToValidate;
                    this.isArticleLoaded        = true;
                } else {

                //? Si les articles ne sont pas déjà présents dans le store, effectuer l'appel API et récupérer les données de l'article
                commentStore.getCommentsToValidate()
                    .then(() => {
                        this.comments               = commentStore.commentsToValidate;
                    })

                    //? En cas d'erreur inattendue, capter l'erreur rencontrée
                    .catch((error) => {
                        console.error('Erreur lors de la récupération des commentaires :', error);
                    });
                }
            },

            //! Récupérer les articles à afficher dans les filtres via le store useArticlesStore
            getArticles() {
                const commentStore = useArticlesStore();

                //? Vérifier si les articles sont toujours présents dans le store
                if (commentStore.articles.length > 0) {
                    this.articles           = commentStore.articles;
                    this.frontPageArticle   = commentStore.frontPageArticle;
                    this.loading            = false;
                } else {

                //? Si les articles ne sont pas déjà présents dans le store, effectuer l'appel API
                commentStore.getAllArticles()
                    .then(() => {
                        this.articles           = commentStore.articles;
                        this.frontPageArticle   = commentStore.frontPageArticle;
                        this.loading            = false;
                    })

                    //? En cas d'erreur inattendue, capter l'erreur rencontrée
                    .catch((error) => {
                        console.error('Erreur lors de la récupération des articles :', error);
                        this.loading            = false;
                    });
                }
            },
            
            //! Capter l'évènement "error" du composant enfant ManagerCommentComposant et afficher le message d'erreur renvoyé
            errorOnComment(message) {
                this.formErrorMessage = message;
            }
        },
        mounted() {

            //? Import des store et exécution des méthodes pour récupérer les commentaires et les articles au montage de la page
            const commentStore = useCommentsStore();
            const articleStore = useArticlesStore();

            this.getArticles();
            this.getModeratedComments();
            this.getCommentsToValidate();
            

            //? Souscrire à useCommentsStore pour modifier l'affichage des commentaires en cas de validation ou de rejet d'un commentaire
            commentStore.$subscribe(state => {
                if (this.commentStatus === 'already-validate') {
                    this.comments = commentStore.comments;
                } else if (this.commentStatus === "to-validate" ) {
                    this.comments = commentStore.commentsToValidate;
                }
            })

            //? Souscrire à useArticlesStore pour modifier l'affichage des articles dans les filtres si un article est ajouté ou désactivé
            articleStore.$subscribe(state => {
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

    .admin_content_no_comment {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 55vh;
        font-size: 1.5em;
    }
</style>