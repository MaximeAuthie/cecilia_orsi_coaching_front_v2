<template>
    <div class="admin_content">
       <h1>Gestion du contenu des pages</h1>
       <div class="admin_content_filters_bloc">
           <label for="page" class="admin_label">Tuile :</label>
           <select  v-model="selectedTileId" @change="displayTileData($event)" name="page" id="page" class="admin_select">
               <option v-for="tile in tiles" :value="tile.id" class="admin_option">{{ tile.title_tile }}</option>
           </select>
       </div>
       <div class="admin_content_filters_message">
           <span v-if="formErrorMessage" class="admin_content_filters_message_error">{{ formErrorMessage }}</span>
           <span v-if="formSuccessMessage" class="admin_content_filters_message_success">{{ formSuccessMessage }}</span>
       </div>
       <div v-if="selectedTileId != 0" class="admin_content_form">
           <div class="admin_content_form_bloc">
               <label for="status" class="admin_label">URL de l'image de fond : </label>
               <input v-model="selectedTileData.img_url_tile" type="text" class="admin_input_form">
           </div>

           <div class="admin_content_form_bloc">
               <label for="status" class="admin_label">Texte de la tuile : </label>
               <input v-model="selectedTileData.title_tile" type="text" class="admin_input_form">
           </div>

           <button v-if="!tileUpdate" @click="updateTile" class="admin_button admin_button_main">Modifier</button>
       </div>



   </div>
</template>

<script>
   import { useTilesStore } from '@/store/tile';

   definePageMeta({
       layout: "admin"
   });

   export default {
       data() {
           return {
              tiles: [],
              selectedTileId: 0,
              selectedTileData: [],
              formSuccessMessage: '',
              formErrorMessage: ''
           }
       },
       methods: {
           getTiles() {
               const store = useTilesStore();

               //? Vérifier si les tuiles sont toujours présentes dans le store 
               if (store.tiles.length > 0) {
                   console.log("store déjà plein")
                   this.tiles           = store.tiles;
               } else {

               //? Si les articles ne sont pas déjà présents dans le store, effectuer l'appel API
               store.getAllTiles()
                   .then(() => {
                       console.log("store à remplir")
                       this.tiles           = store.tiles;
                   })

                   //? En cas d'erreur inattendue, capter l'erreur rencontrée
                   .catch((error) => {
                       console.error('Erreur lors de la récupération des articles :', error);

                   });
               }
           },
           displayTileData(event) { //! A MODIFIER
               const index = event.target.selectedIndex;
               this.selectedTileData = this.tiles[index];
               console.log(this.selectedTileData);
               this.formErrorMessage ='';
               this.formSuccessMessage = '';
           },
           async updateTile() {
              
               //? Transformer l'objet selectedPageData en json
               const bodyJson = JSON.stringify(this.selectedTileData);
               console.log(bodyJson);
               //? Exécuter l'appel API si tous les champs sont remplis et que le format de la couleur est correct
               await fetch('https://127.0.0.1:8000/api/tile/update', {
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
                   console.log(body);
                   if (response.status == 200) {
                       this.formSuccessMessage     = body.message;
                       const store = useTilesStore();
                       store.getAllTiles();
                   } else {
                       this.formErrorMessage       = body.message;
                   }
               })
               .catch(error => {
                   this.formErrorMessage = "Une erreur est survenue. Veuillez réessayer plus tard.";
               });
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