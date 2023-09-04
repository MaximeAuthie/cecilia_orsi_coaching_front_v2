<script setup>

    //? Récupérer le nom de la page pour l'utiliser dans l'appel api
    const route = useRoute();
    const title = route.fullPath;
    
    //? Récupérer l'adresse URL du serveur et l'url de l'icone d'onglet
    const config    = useRuntimeConfig();
    const serverUrl = config.public.serverUrl;
    const iconUrl = config.public.metaLinkIconUrl;

    //? Exécuter les appels api pour récupérer les données de la page et des tuile de la page côté serveur
    const {data: pageData, pending}     = useFetch(serverUrl + 'api/page/title' + title);
    const {data: tilesData}             = useFetch(serverUrl + 'api/tile/page' + title);
    
    //? Renseigner les balises HTML de <head> pour le SEO côté serveur
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
        link: [{rel: 'icon', href: iconUrl}]
    })
</script>

<template>
    <LoaderComponent v-if="pending"></LoaderComponent>
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
                <TileComponent v-for="tile in tilesData" :pageTitle="tile.title_tile" :pagePath="tile.link_tile" :pageImgUrm="tile.img_url_tile" :full-width="tile.isFullWidth_tile" ></TileComponent>
            </section>
        </div>
    </div>
</template>

<script>

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
                }
            }
        },
        methods: {

            //! Envoyer le contenu du formulaire au backend
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
                    const { sendContactMail } = useContact();
                    sendContactMail(message).then(response => {
                        
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

            //! Remettre tous les booléen de l'objet isEmpty à false
            resetEmptyData() { 
                this.isEmpty.firstName =    false;
                this.isEmpty.lastName =     false;
                this.isEmpty.email =        false;
                this.isEmpty.subject =      false;
                this.isEmpty.content =      false;
                this.isEmpty.atLeastOne =   false;
            },

            //! Vérifier si les input sont remplis et mettre les booléens à true quand le formulaire est soumis
            checkImputSubmit() {
        
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

            //! Vérifier si les input sont vides et mettre les booléens à false pendant la saisie
            checkImputKeyUp() { 

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

            //! Vérifier le format de l'adresse mail
            checkMailFormat() {

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
        }
    }
</script>

<style scoped>
    .content_validation_message {
        height: 80vh;
    }
</style>