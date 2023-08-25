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
            <section v-if="!isFormSubmit" class="content_form">
                <h2>Envoyer un message</h2>
                <form @submit.prevent="">
                    <label for="firstName">Votre prénom</label><br>
                    <input v-model="formData.firstName" @keyup="checkImputKeyUp" :class="isEmpty.firstName ? 'bad_input' : 'normal_input'" type="text" name="firstName" id="firstName"><br>
                    <p v-if="isEmpty.firstName" class="error_message" id="error_msg_firstName">Veuillez saisir votre prénom</p>

                    <label for="lastName">Votre nom</label><br>
                    <input v-model="formData.lastName" @keyup="checkImputKeyUp" :class="isEmpty.lastName ? 'bad_input' : 'normal_input'" type="text" name="lastName" id="lastName"><br>
                    <p v-if="isEmpty.lastName" class="error_message" id="error_msg_lastName">Veuillez saisir votre nom</p>

                    <label for="email">Votre adresse mail</label><br>
                    <input v-model="formData.email" @keyup="checkImputKeyUp" :class="isEmpty.email ? 'bad_input' : 'normal_input'" type="mail" name="email" id="email"><br>
                    <p v-if="isEmpty.email" class="error_message" id="error_msg_empty_email">Veuillez saisir votre adresse mail</p>
                    <p v-if="!isMailCorrect" class="error_message" id="error_msg_format_email">Format de l'adresse mail incorrect</p>

                    <label for="subject">Sujet de votre message</label><br>
                    <input v-model="formData.subject" @keyup="checkImputKeyUp" :class="isEmpty.subject ? 'bad_input' : 'normal_input'" type="text" name="subject" id="subject"><br>
                    <p v-if="isEmpty.subject" class="error_message" id="error_msg_subject">Veuillez saisir un sujet pour votre message</p>

                    <label for="content">Votre message</label><br>
                    <textarea v-model="formData.content" @keyup="checkImputKeyUp" :class="isEmpty.content ? 'bad_textarea' : 'normal_textarea'"  name="content" id="content"></textarea>
                    <p v-if="isEmpty.content" class="error_message" id="error_msg_content">Veuillez saisir un message</p>

                    <p v-if="serverError" class="error_message p-center" id="serverError">{{ serverResponse }}</p>

                    <input @click="submitForm" class="button button_form" type="button" value="Envoyer">
                </form>
            </section>
            <section v-else class="content_validation_message">
                <h4>Votre message à bien été envoyé.</h4>
            </section>
            <section class="content_tiles">
                <TileComponent v-for="tile in pageData.tiles_list" :pageTitle="tile.title_tile" :pagePath="tile.link_tile" :pageImgUrm="tile.img_url_tile" :full-width="tile.fullWidth" ></TileComponent>
            </section>
        </div>
    </div>
</template>

<script>
    import ContactService from '@/services/ContactService';
    import { usePagesStore } from '@/store/page';

    export default {
        
        data() {
            return {
                isFormSubmit:   false,
                isMailCorrect:  true,
                serverResponse: '',
                serverError:    false,
                isEmpty:  {
                    firstName:      false,
                    lastName:       false,
                    email:          false,
                    subject:        false,
                    content:        false,
                    atLeastOne:     false
                },
                formData: {
                    firstName:  '',
                    lastName:   '',
                    email:      '',
                    subject:    '',
                    content:    '',
                },
                pageId :            5,
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
                } else {

                //? Si les articles ne sont pas déjà présents dans le store, effectuer l'appel API
                pageStore.getAllPages()
                    .then(() => {
                        this.pageData       = pageStore.pages[this.pageId];
                        this.addTilesWidth();
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

                this.pageDataDownload   = true;
            },
            submitForm() {
                //? Exécuter les fonction de vérification des saisies
                this.checkImputSubmit();
                this.checkMailFormat();

                //? Vérifier si les saisies sont correctes
                if (this.isEmpty.atLeastOne == false && this.isMailCorrect == true) {
                    
                    //? Construire l'objet à passer en paramètre de la méthode sendContactMail() du service ContactService
                    const message = {
                        firstName:    this.formData.firstName,
                        lastName:     this.formData.lastName,
                        email:        this.formData.email,
                        subject:      this.formData.subject,
                        content:      this.formData.content
                    }
                 
                     //? Appeller la métode sendContactMail() du service ContactService
                    ContactService.sendContactMail(message).then(response => {
                        
                        if (response.code === 200) {
                            this.isFormSubmit = true;
                        } else {
                            this.isFormSubmit = false;
                            this.serverError = true;
                            this.serverResponse = response.text;
                        }
                    })
                }
            },
            resetEmptyData() { //Remet tous les booléen de l'objet isEmpty à false
                this.isEmpty.firstName =    false;
                this.isEmpty.lastName =     false;
                this.isEmpty.email =        false;
                this.isEmpty.subject =      false;
                this.isEmpty.content =      false;
                this.isEmpty.atLeastOne =   false;
            },
            checkImputSubmit() { // Vérifie si tous les champs sont remplis
        
                //? Réinitialiser les booléens
                this.resetEmptyData();

                //? Vérifier chaque data pour modifier la valeur des booléens
                if (this.formData.firstName == '') {
                    this.isEmpty.firstName =    true;
                    this.isEmpty.atLeastOne =   true;
                }
                if (this.formData.lastName == '') {
                    this.isEmpty.lastName  =    true;
                    this.isEmpty.atLeastOne =   true;
                }
                if (this.formData.email == '') {
                    this.isEmpty.email =        true;
                    this.isEmpty.atLeastOne =   true;
                }
                if (this.formData.subject == '') {
                    this.isEmpty.subject =      true;
                    this.isEmpty.atLeastOne =   true;
                }
                if (this.formData.content == '') {
                    this.isEmpty.content =      true;
                    this.isEmpty.atLeastOne =   true;
                }
            },
            checkImputKeyUp() { // Vérifie si le champs est remplis au moment où l'utilisateur saisi dans un champs

                if (this.formData.firstName != '') {
                    this.isEmpty.firstName = false;
                } 
                if (this.formData.lastName != '') {
                    this.isEmpty.lastName = false;
                } 
                if (this.formData.email != '') {
                    this.isEmpty.email = false;
                } 
                if (this.formData.subject != '') {
                    this.isEmpty.subject = false;
                } 
                if (this.formData.content != '') {
                    this.isEmpty.content = false;
                } 
            },
            checkMailFormat() { // Vérifie si le format du mail est correct

                //? Réinitialiser le booléen
                this.isMailCorrect = true;
                
                //? Définir le regex pour le format mail
                const pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);

                //? Vérifier le si le mail est saisi
                if (this.formData.email != '') {

                    //? Vérifier si la saisie correspond au regex
                    if (pattern.test(this.formData.email)) {
                        this.isMailCorrect = true;
                    } else {
                        this.isMailCorrect = false;
                    }
                }
            }
        },
        mounted() {

            //? Exécution de la méthode récupérant les données de la page dans la BDD et qui les place dans l'objet this.pageData
            this.getPageData();

            //? Renseigner les balises HTML de <head< pour le SEO
            useHead({
                title: 'Cécilia Orsi Coaching - Contact',
                meta: [
                    {name: 'description', content: 'Vous avez des questions? Vous voulez en savoir plus ou prendre rendez-vous? Utilisez le formulaire de contact.'},
                    {name:'robots', content:'index, follow'},
                    {"http-equiv": 'Content-Language', content: 'fr'},
                    {name: 'keywords', content: 'coach, coaching, coaching de vie, toulouse, haute-garonne, tarif, prestations'},
                    {property: 'og:title', content: 'Cécilia Orsi Coaching - Contact'},
                    {property: 'og:type', content: 'website'},
                    {property: 'og:url', content:'https://www.cecilia-orsi.fr/blog'},
                    {property: 'og:image', content: '/_nuxt/assets/images/logo_header.png'},
                    {property: 'og:description', content: 'Vous avez des questions? Vous voulez en savoir plus ou prendre rendez-vous? Utilisez le formulaire de contact.'},
                    {name: 'twitter:card', content: 'summary_large_image'},
                    {name: 'twitter: title', content: 'Cécilia Orsi Coaching - Contact'},
                    {name: 'twitter:description', content: 'Vous avez des questions? Vous voulez en savoir plus ou prendre rendez-vous? Utilisez le formulaire de contact.'},
                    {name: 'twitter:image', content: '/_nuxt/assets/images/logo_header.png'}
                ],
                link: [{rel: 'icon', href: '/_nuxt/assets/images/icone_tree.png'}]
            })
        },      
    }
</script>

<style scoped>
    .content_validation_message {
        height: 80vh;
    }
</style>