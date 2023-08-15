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
        <div class="admin_content_filters_message">
            <span v-if="formErrorMessage" class="admin_content_filters_message_error">{{ formErrorMessage }}</span>
            <span v-if="formSuccessMessage" class="admin_content_filters_message_success">{{ formSuccessMessage }}</span>
        </div>
       <div v-if="selectedPageId != 0" class="admin_content_form">
            <div class="admin_content_form_bloc">
                <label for="status" class="admin_label">URL de la bannière : </label>
                <input v-model="selectedPageData.banner_url_page" type="text" class="admin_input_form">
            </div>
            <div class="admin_content_form_bloc">
                <label for="status" class="admin_label">Texte de la bannière: </label>
                <div v-for="bannerText in selectedPageData.BannerTextsList" class="admin_content_form_bloc_banner_text">
                    <input v-model="bannerText.content_banner_text" type="text" class="admin_input_form">
                    <svg @click="deleteBannerText(bannerText.id)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </div>
                <span @click="addBannerText" class="admin_content_form_bloc_add_banner_text">Ajouter un texte de bannière</span>
            </div>
            <div class="admin_content_form_bloc">
                <label for="status" class="admin_label">URL de l'image 1 : </label>
                <input v-model="selectedPageData.img1_url_page" type="text" class="admin_input_form">
            </div>
            <div class="admin_content_form_bloc">
                <label for="status" class="admin_label">URL de l'image 2 : </label>
                <input v-model="selectedPageData.img2_url_page" type="text" class="admin_input_form">
            </div>
            <div class="admin_content_form_buttons_container">
                <button v-if="!categoryUpdate" @click="updatePage()" class="admin_button admin_button_main">Modifier</button>
            </div>
       </div>

   </div>
</template>

<script>
    import { usePagesStore } from '@/store/page';
    import { useUsersStore } from "@/store/user";

    export default {
        data() {
            return {
                pages: [],
                selectedPageId: 0,
                selectedPageData: [],
                formSuccessMessage: '',
                formErrorMessage: ''
            }
        },
        methods: {
            getPages() {
                const store = usePagesStore();

                //? Vérifier si les articles sont toujours présents dans le store
                if (store.pages.length > 0) {
                    console.log("store déjà plein")
                    this.pages           = store.pages;
                } else {

                //? Si les articles ne sont pas déjà présents dans le store, effectuer l'appel API
                store.getAllPages()
                    .then(() => {
                        console.log("store à remplir")
                        this.pages           = store.pages;
                    })

                    //? En cas d'erreur inattendue, capter l'erreur rencontrée
                    .catch((error) => {
                        console.error('Erreur lors de la récupération des articles :', error);
                    });
                }
            },
            displayPageData(event) { //! A MODIFIER
                const index = event.target.selectedIndex;
                this.selectedPageData = this.pages[index];
                this.formErrorMessage ='';
                this.formSuccessMessage = '';
            },
            addBannerText() {
                this.selectedPageData.BannerTextsList.push({
                    id: '',
                    content_banner_text: ''
                })
            },
            async updatePage() {
                //? Rénitialiser les messages d'erreur
                this.formErrorMessage ='';
                this.formSuccessMessage = '';

                //? Transformer l'objet selectedPageData en json
                const bodyJson  = JSON.stringify(this.selectedPageData);

                //? Récupérer le jwt pour le header de la requête
                const userStore = useUsersStore();
                const jwt       = userStore.token;
                    
                //? Exécuter l'appel API si tous les champs sont remplis et que le format de la couleur est correct
                await fetch('https://127.0.0.1:8000/api/page/update', {
                    method:'PATCH',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Authorization": `Bearer ${jwt}`
                    },
                    body: bodyJson,
                })
                .then(async response => {
                    const body = await response.json()
                    if (response.status == 200) {
                        this.formSuccessMessage     = body.message;
                        const store = usePagesStore();
                        store.getAllPages();
                    } else if (response.status == 498) {
                        userStore.token = '';
                        this.$router.push('/managerApp/logIn/expired-session'); 
                    } else {
                        this.formErrorMessage       = body.message;
                    }
                })
                .catch(error => {
                    this.formErrorMessage = "Une erreur est survenue. Veuillez réessayer plus tard.";
                });
            },
            deleteBannerText(id) {
                //? Rechercher l'objet dans le tableau pour récupérer son index
                const textToDelete = this.selectedPageData.BannerTextsList.find(item => item.id == id);
                const indexToDelete = this.selectedPageData.BannerTextsList.indexOf(textToDelete);

                //? Suppression de l'objet dans le tableau
                this.selectedPageData.BannerTextsList.splice(indexToDelete,1);
            },
    
        },
        mounted() {
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