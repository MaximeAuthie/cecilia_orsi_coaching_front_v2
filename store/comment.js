import { defineStore } from 'pinia';

export const useCommentsStore = defineStore('comments', {
    state: () => ({
        comments: [],
        commentsToValidate: []
    }),
    actions: {
        async getValidatedComments() {
            try {

                //? Appel de la méthode getValidatedComments() du composable useComment
                const { getValidatedComments }  = useComment();
                const commentsList              = await getValidatedComments();
                
                //? Affecter le json de la réponse à this.articles
                this.comments                   = commentsList;
 
                //? Changer le format de date des propriétés date_comment de this.comments
                this.formatCommentsDates();
                
            
            //? En cas d'erreur inattendue, capter l'erreur rencontrée et emettre une erreur dans la console
            } catch (error) {
                console.error(error);
            }
            
        },
        async getCommentsToValidate() {
            
            try {

                //? Appel de la méthode getCommentsToValidate() du composable useComment
                const { getCommentsToValidate }     = useComment();
                const commentsList                  = await getCommentsToValidate();

                //? Affecter le json de la réponse à this.articles
                this.commentsToValidate             = commentsList;

                //? Changer le format de date des propriétés date_comment de this.comments
                if (this.commentsToValidate != '') {

                    //? Parcourir this.comments pour modifier le format de date_article grâce à la méthode formatDate() du service Utils
                    this.commentsToValidate.forEach(comment => {
                        const { formatDatetime } = useUtils();
                        comment.date_comment = formatDatetime(comment.date_comment);
                    })
                }
                
            //? En cas d'erreur inattendue, capter l'erreur rencontrée et emettre une erreur dans la console
            } catch (error) {
                console.error(error);
            }
            
        },
        formatCommentsDates() {
            const { formatDatetime } = useUtils();
            //? On vérifie que le this.comments n'est pas vide
            if (this.comments != '') {

                //? Parcourir this.comments pour modifier le format de date_article grâce à la méthode formatDate() du service Utils
                this.comments.forEach(comment => {
                    comment.date_comment = formatDatetime(comment.date_comment);
                })
            }
        }
    },
});