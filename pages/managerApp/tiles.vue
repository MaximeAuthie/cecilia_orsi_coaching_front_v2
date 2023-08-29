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
        <label for="page" class="admin_label">Tuile :</label>
        <select  v-model="selectedTileId" @change="displayTileData($event)" name="page" id="page" class="admin_select">
            <option v-for="tile in tiles" :value="tile.id" class="admin_option">{{ tile.title_tile }}</option>
        </select>
    </div>
    
    <div v-if="selectedTileId != 0" class="admin_content_form">
        <div class="admin_content_form_bloc">
            <label for="status" class="admin_label">URL de l'image de fond* : </label>
            <input v-model="selectedTileData.img_url_tile" type="text" class="admin_input_form">
        </div>

        <div class="admin_content_form_bloc">
            <label for="status" class="admin_label">Texte de la tuile (20 caractères maximum)* : </label>
            <input v-model="selectedTileData.title_tile" @keyup="ckeckTextLength" type="text" class="admin_input_form">
            <span class="admin_error_message_form">{{ textErrorMessage }}</span>
        </div>
        * champs obligatoires
        <div class="admin_content_filters_message">
            <span v-if="formErrorMessage" class="admin_content_filters_message_error">{{ formErrorMessage }}</span>
            <span v-if="formSuccessMessage" class="admin_content_filters_message_success">{{ formSuccessMessage }}</span>
        </div>
        
        <div class="admin_content_form_buttons_container">
            <button @click="updateTile" class="admin_button admin_button_main">Modifier</button>
        </div>
    </div>
</div>
</template>

<script>
    import { useTilesStore } from '@/store/tile';
    import { useUsersStore } from "@/store/user";

    export default {
        data() {
            return {
                tiles: [],
                selectedTileId: 0,
                selectedTileData: [],
                formSuccessMessage: '',
                formErrorMessage: '',
                textErrorMessage: ''
            }
        },
        methods: {
            getTiles() {
                const tileStore = useTilesStore();

                //? Vérifier si les tuiles sont toujours présentes dans le store 
                if (tileStore.tiles.length > 0) {
                    console.log("store déjà plein")
                    this.tiles           = tileStore.tiles;
                } else {

                //? Si les articles ne sont pas déjà présents dans le store, effectuer l'appel API
                tileStore.getAllTiles()
                    .then(() => {
                        console.log("store à remplir")
                        this.tiles           = tileStore.tiles;
                    })

                    //? En cas d'erreur inattendue, capter l'erreur rencontrée
                    .catch((error) => {
                        console.error('Erreur lors de la récupération des articles :', error);

                    });
                }
            },
            displayTileData(event) { 
                const index = event.target.selectedIndex;
                this.selectedTileData = this.tiles[index];
                console.log(this.selectedTileData);
                this.formErrorMessage ='';
                this.formSuccessMessage = '';
            },
            ckeckTextLength() {
                if (this.selectedTileData.title_tile.length >= 20) {
                    this.textErrorMessage = 'La limite de 20 caractères est dépassée';
                } else {
                    this.textErrorMessage = '';
                }
            },
            async updateTile() {

                const tileStore = useTilesStore();

                //? Réinialiser les éventuels messages d'erreur ou de succès précédents
                this.formErrorMessage       = '';
                this.formSuccessMessage    = '';

                //? Vérifier si tous les champs du formulaires sont remplis
                if (this.selectedTileData.title_tile == '' || this.selectedTileData.img_url_tile == '') {
                    this.formErrorMessage = "Merci de compléter tous les champs du formulaire.";
                    return;
                }

                //? Vérifier si la longueur du texte de la tuile est respectée : 
                if (this.textErrorMessage != "") {
                    this.formErrorMessage = "Veuillez respecter le nombre de caractères maximum pour le texte de la tuile.";
                    return;
                }
         
                //? Appel de la méthode updatePage() du composable usePage
                const { updateTile }    = useTile();
                const response          = await updateTile(this.selectedTileData);
                const body              = await response.json();

                //? En fonction du statut de la réponse, afficher le message d'erreur ou de succès correspondant
                if (response.status == 200) {
                    this.formSuccessMessage = body.message;
                    tileStore.getAllTiles();
                } else {
                    this.formErrorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard';
                }
            }
        },
        mounted() {
            this.getTiles();
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