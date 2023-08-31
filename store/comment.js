import { defineStore } from 'pinia';

export const useCommentsStore = defineStore('comments', {
    state: () => ({
        comments: [],
        commentsToValidate: []
    }),
    actions: {

        //! Appeler la fonction getValidatedComments() du composable useComment et stocker le retour dans this.comments
        async getModeratedComments() {
            try {

                //? Appel de la méthode getValidatedComments() du composable useComment
                const { getModeratedComments }  = useComment();
                const commentsList              = await getModeratedComments();
                
                //? Stocker les données retournées dans le state this.comments
                this.comments                   = commentsList;
 
                //? Changer le format de date des propriétés date_comment de this.comments
                if (this.comments != '') {

                    //? Parcourir this.comments pour modifier le format de date_article grâce à la méthode formatDate() du composable useUtils
                    this.comments.forEach(comment => {
                        const { formatDatetime } = useUtils();
                        comment.date_comment = formatDatetime(comment.date_comment);
                    })
                }
            
            //? En cas d'erreur inattendue, capter l'erreur rencontrée et emettre une erreur dans la console
            } catch (error) {
                console.error(error);
            }
            
        },

        //! Appeler la fonction commentsToValidate() du composable useComment et stocker le retour dans this.commentsToValidate
        async getCommentsToValidate() {
            
            try {

                //? Appel de la méthode getCommentsToValidate() du composable useComment
                const { getCommentsToValidate }     = useComment();
                const commentsList                  = await getCommentsToValidate();

                //? Stocker les données retournées dans le state this.commentsToValidate
                this.commentsToValidate             = commentsList;

                //? Changer le format de date des propriétés date_comment de this.commentsToValidate
                if (this.commentsToValidate != '') {

                    //? Parcourir this.commentsToValidate pour modifier le format de date_article grâce à la méthode formatDate() du composable useUtils
                    this.commentsToValidate.forEach(comment => {
                        const { formatDatetime } = useUtils();
                        comment.date_comment = formatDatetime(comment.date_comment);
                    })
                }
                
            //? En cas d'erreur inattendue, capter l'erreur rencontrée et emettre une erreur dans la console
            } catch (error) {
                console.error(error);
            }
            
        }
    },
});