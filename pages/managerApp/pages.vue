<script setup>
    definePageMeta({
        layout: "admin",
        middleware: "auth"
    });
</script>

<template>
    <div class="admin_content">
        <h1>Gestion du contenu des pages</h1>
        <div class="admin_content_filters_bloc">
            <label for="page" class="admin_label">Page :</label>
            <select  v-model="selectedPageId" @change="displayPageData($event)" name="page" id="page" class="admin_select">
                <option v-for="page in pages" :value="page.id" class="admin_option">{{ page.title_page }}</option>
            </select>
        </div>
       <div v-if="selectedPageId != 0" class="admin_content_form">
            <div class="admin_content_form_bloc">
                <label for="status" class="admin_label">URL de la bannière *: </label>
                <input v-model="selectedPageData.banner_url_page" @keyup="checkInputKeyUp" type="text" :class=" errorMessages.bannerUrlEmpty != ''  ? 'bad_admin_input_form' : 'admin_input_form'">
                <span class="admin_error_message_form">{{ errorMessages.bannerUrlEmpty }}</span>
            </div>
            <div class="admin_content_form_bloc">
                <label for="status" class="admin_label">Texte de la bannière: *</label>
                <div v-for="bannerText in selectedPageData.BannerTextsList" class="admin_content_form_bloc_banner_text">
                    <input v-model="bannerText.content_banner_text" @keyup="checkInputKeyUp" type="text" class="admin_input_form">
                    <svg @click="deleteBannerText(bannerText.id)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </div>
                <div @click="addBannerText" class="admin_content_form_bloc_add_banner_text">Ajouter un texte de bannière</div>
                <div class="admin_error_message_form">{{ errorMessages.bannerTextEmpty }}</div>
            </div>
            <div class="admin_content_form_bloc">
                <label for="status" class="admin_label">URL de l'image 1 : </label>
                <input v-model="selectedPageData.img1_url_page" type="text" class="admin_input_form">
            </div>
            <div class="admin_content_form_bloc">
                <label for="status" class="admin_label">URL de l'image 2 : </label>
                <input v-model="selectedPageData.img2_url_page" type="text" class="admin_input_form">
            </div>
            * champs obligatoires
            <div class="admin_content_filters_message">
                <span v-if="errorMessages.form" class="admin_content_filters_message_error">{{ formErrorMessage }}</span>
                <span v-if="formSuccessMessage" class="admin_content_filters_message_success">{{ formSuccessMessage }}</span>
            </div>
            <div class="admin_content_form_buttons_container">
                <button @click="updatePage()" class="admin_button admin_button_main">Modifier</button>
            </div>
       </div>

   </div>
</template>

<script>
    import { usePagesStore } from '@/store/page';

    export default {
        data() {
            return {
                pages: [],
                selectedPageId: 0,
                selectedPageData: [],
                formSuccessMessage: '',
                formErrorMessage: '',
                errorMessages: {
                    form:                '',
                    bannerUrlEmpty:      '',
                    bannerTextEmpty:     '',
                },
            }
        },
        methods: {
            //! Récupérer les informations des pages du site vitrine via le store usePagesStore
            getPages() {
                const pageStore = usePagesStore();

                //? Vérifier si les articles sont toujours présents dans le store
                if (pageStore.pages.length > 0) {
                    this.pages           = pageStore.pages;
                } else {

                //? Si les articles ne sont pas déjà présents dans le store, effectuer l'appel API
                pageStore.getAllPages()
                    .then(() => {
                        this.pages           = pageStore.pages;
                    })

                    //? En cas d'erreur inattendue, capter l'erreur rencontrée
                    .catch((error) => {
                        console.error('Erreur lors de la récupération des articles :', error);
                    });
                }
            },

            //! Changer les informations affichées dans le formulaire quand l'utilisateur change de page dans la liste déroulate
            displayPageData(event) {
                const index = event.target.selectedIndex;
                this.selectedPageData = this.pages[index];
                this.errorMessages.form ='';
                this.formSuccessMessage = '';
            },

            //! Ajouter un texte de bannière dans l'objet this.selectedPageData
            addBannerText() {
                this.selectedPageData.BannerTextsList.push({
                    id: '',
                    content_banner_text: ''
                })
            },

            //! Supprimer un texte de bannière dans l'objet this.selectedPageData
            deleteBannerText(id) {
                //? Rechercher l'objet dans le tableau pour récupérer son index
                const textToDelete = this.selectedPageData.BannerTextsList.find(item => item.id == id);
                const indexToDelete = this.selectedPageData.BannerTextsList.indexOf(textToDelete);

                //? Suppression de l'objet dans le tableau
                this.selectedPageData.BannerTextsList.splice(indexToDelete,1);
            },

            //! Vérifier si les input sont vides et générer les messages d'erreur correspondants quand le formulaire est soumis
            checkInputBeforeSubmit() {
                if (this.selectedPageData.banner_url_page == '') {
                    this.errorMessages.bannerUrlEmpty   = "Veuillez renseigner une URL pour la bannière de la page";
                    this.errorMessages.form             = "Veuillez remplir tous les champs obligatoires du formulaire";
                }
                if (this.selectedPageData.BannerTextsList == '') {
                    this.errorMessages.bannerTextEmpty  = "Veuillez saisir au moins un texte pour la bannière de la page";
                    this.errorMessages.form             = "Veuillez remplir tous les champs obligatoires du formulaire"
                }
            },

            //! Vérifier si un message d'erreur est encore affiché
            checkErrorMessages() {
                if (
                    this.errorMessages.form                 != '' 
                    || this.errorMessages.bannerUrlEmpty    != '' 
                    || this.errorMessages.bannerTextEmpty   != '' 
                ) {
                    return false;
                } else {
                    return true;
                }
            },

            //! Vérifier si les input sont vides et effacer les messages d'erreur correspondants pendant la saisie
            checkInputKeyUp() {
                if (this.selectedPageData.banner_url_page != '') {
                    this.errorMessages.bannerUrlEmpty   = "";
                }
                if (this.selectedPageData.BannerTextsList != '') {
                    this.errorMessages.bannerTextEmpty    = "";
                }
            },

            //! Mettre à jour la page dans la BDD
            async updatePage() {

                const pageStore = usePagesStore();
                
                //? Rénitialiser les messages d'erreur
                this.errorMessages.form ='';
                this.formSuccessMessage = '';

                //? Vérifier si les champs nécessaires sont bien renseignés
                this.checkInputBeforeSubmit();

                if (this.checkErrorMessages()) {
                    //? Appel de la méthode updatePage() du composable usePage
                    const { updatePage }    = usePage();
                    const response          = await updatePage(this.selectedPageData);
                    const body              = await response.json();

                    //? En fonction du statut de la réponse, afficher le message d'erreur ou de succès correspondant
                    if (response.status == 200) {
                        this.formSuccessMessage = body.message;
                        pageStore.getAllPages();
                    } else {
                        this.errorMessages.form ='Une erreur est survenue. Veuillez réessayer plus tard';
                    }
                }
            },
        },
        mounted() {
            
            //? Exécuter this.getPages()
            this.getPages();
        },
    }
</script>

<style scoped>
       h1 {
       font-family: Arial, Helvetica, sans-serif;
       font-size: 2.2em;
       color: #4B453F;
       text-shadow: none;
   }

   .admin_content_form_bloc_banner_text {
       display: flex;
       flex-direction: row;
   }
   .admin_content_form_bloc_banner_text svg{
       width: 3vh;
       height: auto;
   }
   .admin_content_form_bloc_banner_text svg:hover{
       fill:#E04F5F;
   }
   .admin_content_form_bloc_add_banner_text {
       font-size: 0.7em;
       cursor: pointer;
   }

   .admin_content_form_bloc_add_banner_text:hover {
       text-decoration: underline;
       color: #E04F5F ;
   }


</style>