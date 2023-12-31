<script setup>
    definePageMeta({
        layout: "admin",
        middleware: "auth"
    });
</script>

<template>
    <div class="admin_content">
        <NuxtLink to="/managerApp/articles">
            <div class="admin_content_link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M20.25 12a.75.75 0 01-.75.75H6.31l5.47 5.47a.75.75 0 11-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06l6.75-6.75a.75.75 0 111.06 1.06l-5.47 5.47H19.5a.75.75 0 01.75.75z" clip-rule="evenodd" />
                </svg>
                Retour à la liste des articles
            </div>
        </NuxtLink>
        <h1>Nouvel article</h1>

        <div class="admin_content_form">
            <div class="admin_content_form_bloc">
                <label for="title" class="admin_label">Titre (40 caractères maximum) * : </label>
                <input v-model="article.title_article" @keyup="ckeckTitleLength" type="text" name="title" class="admin_input_form" :class=" errorMessages.title!='' ? 'bad_admin_input_form' : 'admin_input_form'">
                <span class="admin_error_message_form">{{ errorMessages.title }}</span>
            </div>
            <div class="admin_content_form_bloc">
                <label for="url" class="admin_label">URL de la bannière : </label>
                <input v-model="article.banner_url_article" type="text" name="url" class="admin_input_form">
            </div>
            <div class="admin_content_form_bloc">
                <label for="description" class="admin_label">Description (160 caractères maximum) : </label>
                <textarea v-model="article.description_article" @keyup="ckeckDescriptionLength"  type="text" name="description" :class=" errorMessages.description!='' ? 'bad_admin_textarea_form' : 'admin_textarea_form'"></textarea>
                <span class="admin_error_message_form">{{ errorMessages.description }}</span>
            </div>
            <div class="admin_content_form_bloc">
               <label for="status" class="admin_label">Mot clés pour SEO : </label>
               <div v-for="keyword in article.kewords_list" class="admin_content_form_bloc_banner_text">
                   <input v-model="keyword.content_keywork" type="text" class="admin_input_form">
                   <svg @click="deleteBannerText(keyword.id)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                       <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                   </svg>
               </div>
               <span @click="addKeyword" class="admin_content_form_bloc_add_banner_text">Ajouter un mot clé</span>
           </div>
           <div class="admin_content_form_bloc">
                <label for="categories" class="admin_label">Catégories :</label>
                <select v-model="selectedCategories" name="categories" id="categories" class="admin_select_multiple" multiple>
                    <option v-for="category in categories" :value="category.id" class="admin_option">{{ category.name_category }}</option>
                </select>
            </div>
            <div class="admin_content_form_bloc"> 
                <label for="description" class="admin_label">Contenu : </label>
                <ArticleEditor v-model="article.content_article"></ArticleEditor>
            </div>
            * champs obligatoires
            <div class="admin_content_filters_message">
                <span v-if="errorMessages.form" class="admin_content_filters_message_error">{{ errorMessages.form }}</span>
                <span v-if="errorMessages.titleEmpty" class="admin_content_filters_message_error">{{ errorMessages.titleEmpty }}</span>
            </div>

            <div class="admin_content_form_buttons_container">
                <button @click="addArticle" class="admin_button admin_button_main">Créer</button>
            </div>
            

        </div>
    </div>
</template>

<script>
    import { useArticlesStore } from "@/store/article";
    import { useCategoriesStore } from '@/store/category';
    import ArticleEditor from '../../../components/Manager/articles/editorComponent.vue';

    export default {
        components: {ArticleEditor},
        data() {
            return {
                article: {
                    title_article:          '',
                    banner_url_article:     '',
                    description_article:    '',
                    kewords_list:           [],
                    categories_list:        [],
                    content_article:        '',
                    user_id:                1
                },
                categories:                 [],
                selectedCategories:         [],
                errorMessages: {
                    form:                   '',
                    title:                  '',
                    description:            ''
                },
                isError:                    true
            }
        },
        methods: {
            //! Récupérer les catégories à afficher dans le formulaire via le store useArticlesStore
            getCategories() {
                const categoryStore = useCategoriesStore();
                const { verifyToken } = useAuthentification();

                //? Vérifier si les catégories sont toujours présentes dans le store
                if (categoryStore.categories.length > 0) {
                    this.categories         = categoryStore.categories;
                } else {

                //? Si les catégories ne sont pas déjà présents dans le store, effectuer l'appel API
                categoryStore.getAllCategories()
                    .then(() => {
                        this.categories       = categoryStore.categories;
                    })

                    //? En cas d'erreur inattendue, capter l'erreur rencontrée
                    .catch((error) => {
                        console.error('Erreur lors de la récupération des catégories :', error);
                    });
                }
            },

            //! Ajouter un mot clé à la liste kewords_list de this.articles
            addKeyword() {
               this.article.kewords_list.push({
                   id: '',
                   content_keywork: ''
               })
            },

            //! Supprimer un mot clé à la liste kewords_list de this.articles
            deleteBannerText(id) {
               //? Rechercher l'objet dans le tableau pour récupérer son index
               const textToDelete = this.article.kewords_list.find(item => item.id == id);
               const indexToDelete = this.article.kewords_list.indexOf(textToDelete);

               //? Suppression de l'objet dans le tableau
               this.article.kewords_list.splice(indexToDelete,1);
            },

            //! Ajouter l'article dans la BDD
            async addArticle() {
                const articleStore = useArticlesStore();

                //? Vérifier si le titre est au moins renseigné 
                if (this.article.title_article == '') {
                    this.errorMessages.title = 'Veuillez renseigner au moins un titre pour cet article.';
                    this.errorMessages.form = 'Veuillez renseigner tous les champs obligatoires du formulaire.';
                    return;
                }

                //? Vérifier si les longueurs de caractères pour titre et description sont respectées
                if (this.errorMessages.title != '' || this.errorMessages.description != "") {
                    this.errorMessages.form = 'Veuillez respecter le nombre de caractères maximum pour le titre et/ou la description.';
                    return;
                }

                //? Réinitialiser les éventuels précédents messages d'erreurs
                this.errorMessages.form         = '';

                //? Mettre à jour la liste des catégories de l'article
                this.article.categories_list = [];
                this.selectedCategories.forEach(category => {
                    const cat = this.categories.find( item => item.id == category);
                    this.article.categories_list.push(cat);
                })

                //? Appel de la méthode addArticle() du composable useArticle
                const { addArticle } = useArticle();
                const response = await addArticle(this.article);
                
                //? Récupérer le body de la réponse
                const responseBody = await response.json()
                
                //? En fonction du statut de la réponse, afficher le message d'erreur ou de succès correspondant
                if (response.status == 200) {
                    articleStore.getAllArticles();
                    alert("L'article " + this.article.title_article + " à été créé avec succès." );
                    navigateTo('/managerApp/articles');
                } else {
                    this.errorMessages.form = responseBody.message;
                }
            },

            //! Vérifier la longueur du titre de l'article
            ckeckTitleLength() {
                if (this.article.title_article.length >= 40) {
                    this.errorMessages.title = 'La limite de 40 caractères est dépassée';
                } else {
                    this.errorMessages.title = '';
                }
            },

            //! Vérifier la longueur de la description de l'article
            ckeckDescriptionLength() {
                if (this.article.description_article.length >= 160) {
                    this.errorMessages.description = 'La limite de 160 caractères est dépassée';
                } else {
                    this.errorMessages.description = '';
                }
            }
        },
        mounted() {
            //? Exécuter this.getCategories()
            this.getCategories();
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

    .admin_content_link {
        display: flex;
        flex-direction: row;
        align-items: center;
        text-decoration:none;
        color: #4B453F;
    }

    .admin_content_link:hover {
        color: #E04F5F;
    }

    .admin_content_link svg {
        height: 3vh;
        width: auto;

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

    option:active {
        background-color: #E04F5F;
    }

</style>