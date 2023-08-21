<script setup>
    definePageMeta({
        layout: "admin",
        middleware: "auth"
    });
</script>

<template>
    <div class="admin_content">
        <h1>Gestion des catégories</h1>
        <div class="admin_content_filters">
            <div class="admin_content_filters_bloc">
                <label for="status" class="admin_label">Nom de la catégorie :</label>
                <input @click="resetMessages" @keyup="ckeckNameLength" v-model="formData.name" type="text" class="admin_input_filter">
            </div>
            <div class="admin_content_filters_bloc">
                <label for="status" class="admin_label">Couleur de la catégorie :</label>
                <input @click="resetMessages" v-model="formData.color" @keyup="checkColorFormat" type="text" class="admin_input_filter">
            </div>
            <div class="admin_content_filters_bloc_buttons">
                <br>
                <button v-if="!categoryUpdate" @click="addNewCategory" class="admin_button admin_button_main">Créer</button>
                <button v-if="categoryUpdate" @click="updateCategory" class="admin_button admin_button_main">Modifier</button>
                <button v-if="categoryUpdate" @click="cancelUpdate" class="admin_button admin_button_secondary">Annuler</button>
            </div>
        </div>
        <div class="admin_content_filters_message">
            <div v-if="errorMessages.form" class="admin_content_filters_message_error">{{ errorMessages.form }}</div>
            <div v-if="errorMessages.nameLength" class="admin_content_filters_message_error">{{ errorMessages.nameLength }}</div>
            <div v-if="errorMessages.colorFormat" class="admin_content_filters_message_error">{{ errorMessages.colorFormat }}</div>
            <div v-if="formSuccessMessage" class="admin_content_filters_message_success">{{ formSuccessMessage }}</div>
        </div>
        <ManagerCategoriesListComponent @update="activateUpdateCategory"></ManagerCategoriesListComponent>
    </div>
</template>

<script>
    import { useCategoriesStore } from '@/store/category';
    import { useUsersStore } from "@/store/user";

    export default {
        data() {
            return {
                formData : {
                    id:     0,
                    name :  '',
                    color:  ''
                },
                formErrorMessage:       '',
                formSuccessMessage:     '',
                errorMessages: {
                    form:               '',
                    nameLength:         '',
                    colorFormat :       ''
                },
                categoryUpdate:         false,
            }
        },
        methods: {
            ckeckNameLength() {
                if (this.formData.name.length >= 15) {
                    this.errorMessages.nameLength = 'Le nom de la catégorie ne doit pas dépasser 15 caractères.';
                } else {
                    this.errorMessages.nameLength = '';
                }
            },
            async addNewCategory() {
                const categoryStore = useCategoriesStore();
                const userStore = useUsersStore();
                const { verifyToken } = useAuthentification();

                //? Appel des méthodes pour vérifier la conformité des données saisies
                this.checkImputEmpty();
                this.checkColorFormat();
                this.ckeckNameLength();

                //? Transformer l'objet formData en json
                const bodyJson = JSON.stringify(this.formData);

                //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
                const jwt = await verifyToken();

                //? Exécuter l'appel API si tous les champs sont remplis et que le format de la couleur est correct
                console.log(this.checkErrorMessages());
                if (this.checkErrorMessages()) {
                    await fetch('https://127.0.0.1:8000/api/category/add', {
                        method:'POST',
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
                            categoryStore.getAllCategories();
                        } else if (response.status == 498) {
                            userStore.token = '';
                            navigateTo('/managerApp/logIn/expired-session'); 
                        } else {
                            this.formErrorMessage       = body.message;
                        }

                        //? Réinitialiser les data pour repasser en mode création de catégorie
                        this.resetFetchedData();
                    })
                    .catch(error => {
                        console.error(error);
                        this.errorMessages.form = "Une erreur est survenue. Veuillez réessayer plus tard.";
                    })
                }
            },
            async updateCategory() {
                const categoryStore = useCategoriesStore();
                const userStore = useUsersStore();
                const { verifyToken } = useAuthentification();

                //? Appel des méthodes pour vérifier la conformité des données saisies
                this.checkImputEmpty();
                this.checkColorFormat();
                this.ckeckNameLength();

                //? Transformer l'objet formData en json
                const bodyJson = JSON.stringify(this.formData);

                //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
                const jwt = await verifyToken();

                //? Exécuter l'appel API si tous les champs sont remplis et que le format de la couleur est correct
                if (this.checkErrorMessages()) {
                    await fetch('https://127.0.0.1:8000/api/category/update', {
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
                            categoryStore.getAllCategories();
                        } else if (response.status == 498) {
                            userStore.token = '';
                            this.$router.push('/managerApp/logIn/expired-session'); 
                        } else {
                            this.errorMessages.form       = body.message;
                        }

                        //? Réinitialiser les data pour repasser en mode création de catégorie
                        this.resetFetchedData();
                    })
                    .catch(error => {
                        console.error(error);
                        this.errorMessages.form = "Une erreur est survenue. Veuillez réessayer plus tard.";

                        //? Réinitialiser les data pour repasser en mode création de catégorie
                        this.resetFetchedData();
                    });
                }
            },
            cancelUpdate() {
                this.resetMessages();
                this.resetFetchedData();
            },
            resetMessages() { //? Remettre les datas à leur état initial
                this.errorMessages.nameLength       = '';
                this.errorMessages.colorFormat      = '';
                this.errorMessages.form             = '';
                this.formSuccessMessage             = ''
            },
            resetFetchedData() { //? Réinitiliser des datas après update d'une catégorie
                this.categoryUpdate     = false;
                this.formData.id        = 0,
                this.formData.name      = '',
                this.formData.color     = ''
            },
            checkErrorMessages() {
                if (
                    this.errorMessages.form !='' 
                    || this.errorMessages.nameLength != '' 
                    || this.errorMessages.colorFormat != '' 
                ) {
                    return false;
                } else {
                    return true;
                }
            },
            checkColorFormat() { //? Vérifier si le format de la couleur est correct
                console.log("checkColorFormat lancé");
                //? Définir le regex pour le format mail
                const pattern = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);

                //? Vérifier le si le mail est saisi
                if (this.formData.color != '') {

                    //? Vérifier si la saisie correspond au regex
                    if (pattern.test(this.formData.color)) {
                        this.errorMessages.colorFormat = '';
                    } else {
                        this.errorMessages.colorFormat = 'La couleur doit être renseignée au format hexadécimal.';
                    }
                }
            },
            checkImputEmpty() { //? Vérifier si tous les champs sont bien complétés
                if (this.formData.name != '' && this.formData.color != '') {
                    this.errorMessages.form = "";
                } else {
                    this.errorMessages.form = "Veuillez compléter tous les champs du formulaire.";
                }
            },
            activateUpdateCategory(id, name, color) { //? Réagir à l'évènement "update" du composant "ManagerCategoriesListComponent"

                //? Réinitialiser les éventuels messages
                this.resetMessages();
                
                //? Renseigner les datas du composant aves les datas remontées des composants enfants
                this.categoryUpdate     = true;
                this.formData.id        = id;
                this.formData.name      = name;
                this.formData.color     = color;
                
                //? Remonter en haut de la page en utilisant un effet "smooth"
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                });
            },
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