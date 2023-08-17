<template>
    <div class="last_comments_card">
        <div class="last_comments_card_header">
            Derniers commentaires
            <div class="last_comments_card_header_icon ">
            <nuxt-link to="/managerApp/moderation">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
                </svg>
            </nuxt-link>
            </div>
        </div>
        <div class="last_comments_card_content">
            <ul v-if="comments.length != 0" class="last_comments_card_content_list">
                <li v-for="comment in comments" class="last_comments_card_content_list_item">{{ comment.article.title_article }} - {{ comment.author_name_comment }} - {{ comment.date_comment }} </li>
            </ul>
            <div v-else class="last_comments_card_content_none">Aucun nouveau commentaire à valider</div>
        </div>
    </div>
</template>

<script>
import { useCommentsStore } from '@/store/comment';

export default {
    data() {
        return {
            comments: []
        }
    },
    methods: {
        getComments() {
                const commentStore = useCommentsStore();

                //? Vérifier si les articles sont toujours présents dans le store
                if (commentStore.commentsToValidate.length > 0) {
                    this.comments       = commentStore.commentsToValidate;
                    this.comments.sort((a,b) => (a.id < b.id ? 1 : -1));
                } else {

                //? Si les articles ne sont pas déjà présents dans le store, effectuer l'appel API
                commentStore.getCommentsToValidate()
                    .then(() => {
                        this.comments   = commentStore.commentsToValidate;
                        this.comments.sort((a,b) => (a.id < b.id ? 1 : -1));
                    })

                    //? En cas d'erreur inattendue, capter l'erreur rencontrée
                    .catch((error) => {
                        console.error('Erreur lors de la récupération des articles :', error);
                    });
                }
            },
    },
    mounted() {
        this.getComments();
    }
}
</script>
<style scoped>
    .last_comments_card {
        display: flex;
        flex-direction: column;
        width: 90%;
        border: 1px solid #E04F5F;
        border-radius: 1vh;
        background-color: #FFFFFF;
        margin-top: 5vh;
        overflow: hidden
    }

    .last_comments_card_header {
        position: relative;
        width: 100%;
        border: 1px solid #E04F5F;
        font-size: 1.8em;
        color: #FFFFFF;
        background-color: #E04F5F;
        text-align: center;
        padding: 1vh 0;
    }
    .last_comments_card_header_icon {
        position: absolute;
        top: 0.8vh;
        right: 1vw;
    }
    .last_comments_card_header_icon svg {
        width: 4vh;
        height: 4vh;
    }
    .last_comments_card_header_icon a {
        text-decoration: none;
        color: #FFFFFF;
    }
    .last_comments_card_content {

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 3em;
    }

    .last_comments_card_content_list {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;
        font-size: 0.5em;
        padding: 0;
        margin: 0;
        list-style: none;
        text-align: center;
    }

    .last_comments_card_content_list_item{
        display: block;
        border-top: #E04F5F solid 1px;
        width: 100%;
        padding: 1.5vh 0;
    }

    .last_comments_card_content_none {
        font-size: 0.5em;
        margin: 1vh 0
    }
</style>