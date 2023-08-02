<template>
    <div class="admin_content">
        <h1>Gestion des catégories</h1>
        <div class="admin_content_filters">
            <div class="admin_content_filters_bloc">
                <label for="status" class="admin_label">Nom de la catégorie :</label>
                <input @click="resetMessages" v-model="formData.name" type="text" class="admin_input_filter">
            </div>
            <div class="admin_content_filters_bloc">
                <label for="status" class="admin_label">Couleur de la catégorie :</label>
                <input @click="resetMessages" v-model="formData.color" type="text" class="admin_input_filter">
            </div>
            <div class="admin_content_filters_bloc_buttons">
                <br>
                <button v-if="!categoryUpdate" @click="addNewCategory" class="admin_button admin_button_main">Créer</button>
                <button v-if="categoryUpdate" @click="updateCategory" class="admin_button admin_button_main">Modifier</button>
                <button v-if="categoryUpdate" @click="resetFetchedData" class="admin_button admin_button_secondary">Annuler</button>
            </div>
        </div>
        <div class="admin_content_filters_message">
            <span v-if="formErrorMessage" class="admin_content_filters_message_error">{{ formErrorMessage }}</span>
            <span v-if="formSuccessMessage" class="admin_content_filters_message_success">{{ formSuccessMessage }}</span>
        </div>
        <ManagerCategoriesListComponent @update="activateUpdateCategory"></ManagerCategoriesListComponent>
    </div>
</template>

<script>
    import { useCategoriesStore } from '@/store/category';
    
    definePageMeta({
            layout: "admin"
        });

    export default {
        data() {
            return {
                formData : {
                    id:     0,
                    name :  '',
                    color:  ''
                },
                isAnInputEmpty:         true,
                isColorCorrect:         true,
                formErrorMessage:       '',
                formSuccessMessage:     '',
                categoryUpdate:         false,
            }
        },
        methods: {
            async addNewCategory() { //? Méthode pour ajouter une catégorie à la BDD

                //? Appel des méthodes pour vérifier la conformité des données saisies
                this.checkImputEmpty()
                this.checkColorFormat();

                //? Transformer l'objet formData en json
                const bodyJson = JSON.stringify(this.formData);


                //? Exécuter l'appel API si tous les champs sont remplis et que le format de la couleur est correct
                if (this.isAnInputEmpty == false && this.isColorCorrect ==true) {
                    await fetch('https://127.0.0.1:8000/api/category/add', {
                        method:'POST',
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        },
                        body: bodyJson,
                    })
                    .then(async response => {
                        const body = await response.json()
                        
                        if (response.status == 200) {
                            this.formSuccessMessage     = body.message;
                            const store = useCategoriesStore();
                            store.getAllCategories();
                        } else {
                            this.formErrorMessage       = body.message;
                        }

                        //? Réinitialiser les data pour repasser en mode création de catégorie
                        this.resetFetchedData();
                    })
                    .catch(error => this.formErrorMessage = "Une erreur est survenue. Veuillez réessayer plus tard.")
                }
            },
            async updateCategory() {

                //? Appel des méthodes pour vérifier la conformité des données saisies
                this.checkImputEmpty()
                this.checkColorFormat();

                //? Transformer l'objet formData en json
                const bodyJson = JSON.stringify(this.formData);

                //? Exécuter l'appel API si tous les champs sont remplis et que le format de la couleur est correct
                if (this.isAnInputEmpty == false && this.isColorCorrect ==true) {
                    await fetch('https://127.0.0.1:8000/api/category/update', {
                        method:'PATCH',
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        },
                        body: bodyJson,
                    })
                    .then(async response => {
                        const body = await response.json()
                        
                        if (response.status == 200) {
                            this.formSuccessMessage     = body.message;
                            const store = useCategoriesStore();
                            store.getAllCategories();
                        } else {
                            this.formErrorMessage       = body.message;
                        }

                        //? Réinitialiser les data pour repasser en mode création de catégorie
                        this.resetFetchedData();
                    })
                    .catch(error => {
                        this.formErrorMessage = "Une erreur est survenue. Veuillez réessayer plus tard.";
                        this.resetFetchedData();
                    });
                }
            },
            resetMessages() { //? Remettre les datas à leur état initial
                this.isAnInputEmpty         = true;
                this.isColorCorrect         = true;
                this.formErrorMessage       = '';
                this.formSuccessMessage     = ''
            },
            resetFetchedData() { //? Réinitiliser des datas après update d'une catégorie
                this.categoryUpdate     = false;
                this.formData.id        = 0,
                this.formData.name      = '',
                this.formData.color     = ''
            },
            checkColorFormat() { //? Vérifier si le format de la couleur est correct

                //? Réinitialiser le booléen
                this.isColorCorrect = true;

                //? Définir le regex pour le format mail
                const pattern = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);

                //? Vérifier le si le mail est saisi
                if (this.formData.color != '') {

                    //? Vérifier si la saisie correspond au regex
                    if (pattern.test(this.formData.color)) {
                        this.isColorCorrect = true;
                    } else {
                        this.isColorCorrect = false;
                        this.formErrorMessage = 'La couleur doit être renseignée au format hexadécimal.'
                    }
                }
            },
            checkImputEmpty() { //? Vérifier si tous les champs sont bien complétés
                if (this.formData.name != '' && this.formData.color != '') {
                    this.isAnInputEmpty = false;
                } else {
                    this.formErrorMessage = "Veuillez compléter tous les champs du formulaire.";
                }
            },
            activateUpdateCategory(id, name, color) { //? Réagir à l'évènement "update" du composant "ManagerCategoriesListComponent"

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