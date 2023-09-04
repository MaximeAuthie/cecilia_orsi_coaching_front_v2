<template>
    <div class="display_comments_div">
        <h3>Commentaires</h3>
        <CommentsDisplayComponent v-for="comment in comments" :id="comment.id" :author-name="comment.author_name_comment" :date="comment.date_comment" :content="comment.content_comment" ></CommentsDisplayComponent>
        <div class="display_comments_div_form">
            <form v-if="!isFormSubmit" @submit.prevent="">
                <h6>Poster un commentaire</h6>
                <label for="authorName">Vos prénom et nom</label><br>
                <input v-model="newComment.authorName" @keyup="checkImputKeyUp" :class="isEmpty.authorName ? 'bad_input' : 'normal_input'" type="text" name="authorName" id="authorName"><br>
                <p v-if="isEmpty.authorName" class="error_message" id="error_msg_authorName">Veuillez saisir votre prénom et votre nom</p>

                <label for="authorEmail">Votre adresse mail</label><br>
                <input v-model="newComment.authorEmail" @keyup="checkImputKeyUp" :class="isEmpty.authorEmail ? 'bad_input' : 'normal_input'" type="email" name="authorEmail" id="authorEmail"><br>
                <p v-if="isEmpty.authorEmail" class="error_message" id="error_msg_empty_authorEmail">Veuillez saisir votre adresse email</p>
                <p v-if="!isMailCorrect" class="error_message" id="error_msg_format_authorEmail">Format de l'adresse mail incorrect</p>

                <label for="content">Votre commentaire</label><br>
                <textarea v-model="newComment.content" @keyup="checkImputKeyUp" :class="isEmpty.content ? 'bad_textarea' : 'normal_textarea'"  name="content" id="content"></textarea>
                <p v-if="isEmpty.content" class="error_message" id="error_msg_content">Veuillez saisir un commentaire</p>

                <input @click="submitForm" class="button button_form" type="button" value="Poster">
            </form>
            <div v-else class="content_validation_message">
                <h6 v-if="isError" class="error_message">Echec lors de l'envoi de votre commentaire. <br> Veuillez réessayer plus tard.</h6>
                <h6 v-else>Votre commentaire à bien été pris en compte. <br> Il sera affiché après validation par nos équipes</h6>
            </div>

        </div>
    </div>
</template>

<script>

    export default {
        props: {
            articleId: {
                type:       String,
                required:   true
            },
            comments: {
                type:       Object,
                required:   true
            }
        },
        data() {
            return {
                isFormSubmit:   false,
                isError:        false,
                isMailCorrect:  true ,
                newComment: {
                    authorName:     '',
                    authorEmail:    '',
                    content:        ''
                },
                isEmpty: {
                    authorName:     false,
                    authorEmail:    false,
                    content:        false,
                    atLeastOne:     false
                }
            }
        },
        methods: {
            //! Ajouter un commentaire à la BDD
            async submitForm() {
                //? Importer la méthode getCurrentDateTime du composable useUtils.ts
                const { getCurrentDateTime } = useUtils();

                //? Exécuter les fonction de vérification des saisies
                this.checkImputSubmit();
                this.checkMailFormat();

                //? Vérifier si les saisies sont correctes
                if (this.isEmpty.atLeastOne == false && this.isMailCorrect == true) {
                
                    let body = {
                        author_name_comment:    this.newComment.authorName,
                        author_email_comment:   this.newComment.authorEmail,
                        date_comment:           getCurrentDateTime(),
                        content_comment:        this.newComment.content,
                        articleId:              this.articleId
                    }

                    //? Appel de la méthode addComment() du composable useComment
                    const { addComment }    = useComment();
                    const response          = await addComment(body);
                    
                    //? En fonction du statut de la réponse, afficher le message d'erreur ou de succès correspondant
                    if (response.status == 200) {
                        this.isError = false;
                    } else {
                        this.isError = true;
                    }
                    this.isFormSubmit = true;
                }
            },

            //! Remettre tous les booléen de l'objet isEmpty à false
            resetEmptyData() { 
                this.isEmpty.authorName =   false;
                this.isEmpty.authorEmail =  false;
                this.isEmpty.content =      false;
                this.isEmpty.atLeastOne =   false;
            },

            //! Vérifier si tous les champs sont remplis au moment de soumettre le formulaire
            checkImputSubmit() { 
        
                //? Réinitialiser les booléens
                this.resetEmptyData();

                //? Vérifier chaque data pour modifier la valeur des booléens
                if (this.newComment.authorName == '') {
                    this.isEmpty.authorName =   true;
                    this.isEmpty.atLeastOne =   true;
                }
                if (this.newComment.authorEmail == '') {
                    this.isEmpty.authorEmail =  true;
                    this.isEmpty.atLeastOne =   true;
                }
                if (this.newComment.content == '') {
                    this.isEmpty.content =      true;
                    this.isEmpty.atLeastOne =   true;
                }
            },

            //! Vérifier si les champs sont remplis au moment où l'utilisateur saisit dans un champs
            checkImputKeyUp() {

                if (this.newComment.authorName != '') {
                    this.isEmpty.authorName = false;
                } 
                if (this.newComment.authorEmail != '') {
                    this.isEmpty.authorEmail = false;
                } 
                if (this.newComment.content != '') {
                    this.isEmpty.content = false;
                } 
            },

            //! Vérifie si le format du mail est correct
            checkMailFormat() {

                //? Réinitialiser le booléen
                this.isMailCorrect = true;

                //? Définir le regex pour le format mail
                const pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);

                //? Vérifier le si le mail est saisi
                if (this.newComment.authorEmail != '') {

                    //? Vérifier si la saisie correspond au regex
                    if (pattern.test(this.newComment.authorEmail)) {
                        this.isMailCorrect = true;
                    } else {
                        this.isMailCorrect = false;
                    }
                }
            }
        }
    }

</script>

<style scoped>
    h3 {
        margin-bottom: 3vh;
    }

    .display_comments_div {
        display: block;
        width: 100;
        margin: 10vh 0;
    }
    .content_validation_message {
        height: 60vh;
    }
</style>