<script setup>
    definePageMeta({
        layout: "admin",
        middleware: "auth-admin"
    });
</script>

<template>
    <div class="admin_content">
        <NuxtLink to="/managerApp">
            <div class="admin_content_link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M20.25 12a.75.75 0 01-.75.75H6.31l5.47 5.47a.75.75 0 11-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06l6.75-6.75a.75.75 0 111.06 1.06l-5.47 5.47H19.5a.75.75 0 01.75.75z" clip-rule="evenodd" />
                </svg>
                Retour à l'accueil
            </div>
        </NuxtLink>
        <h1>Mettre à jour mon compte</h1>

        <div class="admin_content_form">
            <div class="admin_content_form_bloc">
                <label for="first_name" class="admin_label">Prénom* : </label>
                <input v-model="user.first_name_user" @keyup="checkInputKeyUp" type="text" name="first_name" :class=" errorMessages.firstNameEmpty != ''  ? 'bad_admin_input_form' : 'admin_input_form'">
                <span class="admin_error_message_form">{{ errorMessages.firstNameEmpty }}</span>
            </div>
            <div class="admin_content_form_bloc">
                <label for="last_name" class="admin_label">Nom* : </label>
                <input v-model="user.last_name_user" @keyup="checkInputKeyUp" type="text" name="last_name" :class=" errorMessages.lastNameEmpty != ''  ? 'bad_admin_input_form' : 'admin_input_form'">
                <span class="admin_error_message_form">{{ errorMessages.lastNameEmpty }}</span>
            </div>
            <div class="admin_content_form_bloc">
                <label for="email" class="admin_label">Adresse email* : </label>
                <input v-model="user.email" @keyup="checkInputKeyUp" type="text" name="email" :class=" errorMessages.emailEmpty != '' || errorMessages.emailFormat != '' ? 'bad_admin_input_form' : 'admin_input_form'">
                <div class="admin_error_message_form">{{ errorMessages.emailEmpty }}</div>
                <div class="admin_error_message_form">{{ errorMessages.emailFormat }}</div>
            </div>
            <div class="admin_content_form_bloc">
                <label for="password_one" class="admin_label">Mot de passe : </label>
                <input 
                    v-model="passwords.firstInput"
                    @keyup="checkPasswordKeyUp" 
                    :class=" errorMessages.passwordUppercase != '' || errorMessages.passwordLowercase != '' || errorMessages.passwordNumber != '' || errorMessages.passwordCaracters != '' ? 'bad_admin_input_form' : 'admin_input_form'" 
                    type="password" 
                    name="password_one" 
                    class="admin_input_form" 
                    placeholder="********">
                <div v-if="errorMessages.passwordUppercase != ''" class="admin_error_message_form">{{ errorMessages.passwordUppercase }}</div>
                <div v-if="errorMessages.passwordLowercase != ''" class="admin_error_message_form">{{ errorMessages.passwordLowercase }}</div>
                <div v-if="errorMessages.passwordNumber != ''" class="admin_error_message_form">{{ errorMessages.passwordNumber }}</div>
                <div v-if="errorMessages.passwordCaracters != ''" class="admin_error_message_form">{{ errorMessages.passwordCaracters }}</div>
            </div>
            <div class="admin_content_form_bloc">
                <label for="password_two" class="admin_label">Ressaisir le mot de passe : </label>
                <input 
                    v-model="passwords.secondInput"
                    @keyup="checkPasswordKeyUp"
                    :class=" errorMessages.passwordIdentical != ''  ? 'bad_admin_input_form' : 'admin_input_form'"
                    type="password"
                    name="password_two"
                    class="admin_input_form"
                    placeholder="********">
                <div v-if="errorMessages.passwordIdentical != ''" class="admin_error_message_form">{{ errorMessages.passwordIdentical }}</div>
            </div>
            * champs obligatoires
            <div class="admin_content_filters_message">
                <span v-if="errorMessages.form" class="admin_content_filters_message_error">{{ errorMessages.form }}</span>
                <span v-if="errorMessages.titleEmpty" class="admin_content_filters_message_error">{{ errorMessages.titleEmpty }}</span>
                <span v-if="formSuccessMessage" class="admin_content_filters_message_success">{{ formSuccessMessage }}</span>
            </div>

            <div class="admin_content_form_buttons">
                <button @click="updateUserAccount" class="admin_button admin_button_main">Modifier</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { useUsersStore } from "@/store/user";

    export default {
        data() {
            return {
                id:                         0,
                user:                       {},
                passwords: {
                    firstInput:             '',
                    secondInput:            ''
                },
                formSuccessMessage:         '',
                errorMessages: {
                    form:                   '',
                    firstNameEmpty:         '',
                    lastNameEmpty:          '',
                    emailEmpty:             '',
                    emailFormat:            '',
                    passwordIdentical:      '',
                    passwordUppercase:      '',
                    passwordLowercase:      '',
                    passwordNumber:         '',
                    passwordCaracters:      ''
                },
                isError:                    false
            }
        },
        methods: {

            //! Récupérer les données du compte pour les afficher dans le formulaire via le store useArticlesStore
            async getUserAccount() {
                const userStore = useUsersStore();
                
                //? Définir l'objet body
                const body =  {
                    idApplicant: userStore.id
                }

                //? Appel de la méthode getUserAccount() du composable useUser
                const { getUserAccount }    = useUser();
                const response              = await getUserAccount(body);
                const responseBody          = await response.json();
                
                //? En fonction du statut de la réponse, afficher le message d'erreur ou de succès correspondant
                if (response.status == 200) {
                    this.user = responseBody;
                } else {
                    this.errorMessages.form = responseBody.message;
                }
            },

            //! Vérifier si les input sont vides et générer les messages d'erreur correspondants quand le formulaire est soumis
            checkInputBeforeSubmit() {

                //? Vérifier si chacun des champs obligatoires est bien complété
                if (this.user.first_name_user == '') {
                    this.errorMessages.firstNameEmpty   = "Veuillez saisir un prénom";
                    this.errorMessages.form             = "Veuillez remplir tous les champs obligatoires du formulaire";
                }
                if (this.user.last_name_user == '') {
                    this.errorMessages.lastNameEmpty    = "Veuillez saisir un nom";
                    this.errorMessages.form             = "Veuillez remplir tous les champs obligatoires du formulaire"
                }
                if (this.user.email == '') {
                    this.errorMessages.emailEmpty       = "Veuillez saisir une adresse email";
                    this.errorMessages.form             = "Veuillez remplir tous les champs obligatoires du formulaire"
                }
            },

            //! Vérifier si les input sont vides et effacer les messages d'erreur correspondants pendant la saisie            
            checkInputKeyUp() {

                //? Vérfier si chacun des champs obligatoire à été complété après chaque frappe
                if (this.user.first_name_user != '') {
                    this.errorMessages.firstNameEmpty   = "";
                }
                if (this.user.last_name_user != '') {
                    this.errorMessages.lastNameEmpty    = "";
                }
                if (this.user.email != '') {
                    this.errorMessages.emailEmpty       = "";
                }
            },

            //! Vérifier si les champs sont saisis, le format du password et si les deux password sont identique pendant la saisie
            checkPasswordKeyUp() { //Vérifie si les champs sont remplis lors de la saisir et vérifie le format du password
                const { isPasswordIdentical } = useUtils();
                
                //? Vérifie le remplissage des champs obligatoires à chaque frappe
                this.checkInputKeyUp();

                //? Vérifie le format du mot de passe
                this.checkPasswordFormat();

                //? Vérifie si les deux mot de passe sont identiques (composable)
                if (isPasswordIdentical(this.passwords.firstInput, this.passwords.secondInput)) {
                    this.errorMessages.passwordIdentical = "";
                } else {
                    this.errorMessages.passwordIdentical = "Les deux mots de passe ne sont pas identiques";
                }
            },

            //! Vérifier le format du mot de passe
            checkPasswordFormat() {
                
                //? Importer les fonction du composable useUtils
                const { containUppercase }  = useUtils();
                const { containLowercase }  = useUtils();
                const { containNumbber }    = useUtils();
                const { isLongEnough }      = useUtils();
                
                //? Réinitialiser les message d'erreur
                this.errorMessages.passwordUppercase    = "";
                this.errorMessages.passwordLowercase    = "";
                this.errorMessages.passwordNumber       = "";
                this.errorMessages.passwordCaracters    = "";

                
                //? Vérifier les différents critères du format et générer les mesages d'erreur correspondants
                if (!containUppercase(this.passwords.firstInput)) {
                    this.errorMessages.passwordUppercase = "Le mot de passe doit contenir au moins une majuscule"
                }

                if (!containLowercase(this.passwords.firstInput)) {
                    this.errorMessages.passwordLowercase = "Le mot de passe doit contenir au moins une minuscule"
                }

                if (!containNumbber(this.passwords.firstInput)) {
                    this.errorMessages.passwordNumber = "Le mot de passe doit contenir au moins un chiffre"
                }

                if (!isLongEnough(this.passwords.firstInput)) {
                    this.errorMessages.passwordCaracters = "Le mot de passe doit contenir au moins 14 caractères"
                }
            },

            //! Vérifier si un message d'erreur est encore affiché
            checkErrorMessages() {
                if (
                    this.errorMessages.form !='' 
                    || this.errorMessages.firstNameEmpty != '' 
                    || this.errorMessages.lastNameEmpty != '' 
                    || this.errorMessages.emailEmpty != ''
                    || this.errorMessages.emailFormat != '' 
                    || this.errorMessages.passwordIdentical != '' 
                    || this.errorMessages.passwordUppercase != '' 
                    || this.errorMessages.passwordLowercase != '' 
                    || this.errorMessages.passwordNumber != '' 
                    || this.errorMessages.passwordCaracters != '' 
                ) {
                    return false;
                } else {
                    return true;
                }
                      
            },

            //! Mettre à jour les données du compte utilisateur dans le BDD
            async updateUserAccount() {
                
                const { verifyToken } = useAuthentification();
                const { isMailFormatCorrect }   = useUtils();

                //? Réinitialiser les éventuels précédents messages d'erreurs ou de succès
                this.errorMessages.form = '';
                this.formSuccessMessage = '';

                //? Vérifier si les champs nécessaires sont bien renseignés
                this.checkInputBeforeSubmit();

                //? Vérifier si le format de l'adresse mail est correct
                if (!isMailFormatCorrect(this.user.email)) {
                    this.errorMessages.emailFormat = "Le format de l'adresse email n'est pas correct"
                } else {
                    this.errorMessages.emailFormat = ""
                }

                //? Déclaration de l'objet utilisateur à envoyer avec l'appel API
                let userToUpdate = {
                    id:             this.user.id,
                    firstName:      this.user.first_name_user,
                    lastName:       this.user.last_name_user,
                    email:          this.user.email,
                    password:       '',
                }

                if (this.checkErrorMessages()) {

                    //? Mettre à jours le password si renseigné 
                    if (this.passwords.firstInput != '' && this.passwords.secondInput !='') {
                        userToUpdate.password = this.passwords.firstInput;
                    }

                    //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
                    const jwt = await verifyToken();

                    //? Appel de la méthode updateUserAccount() du composable useUser
                    const { updateUserAccount }     = useUser();
                    const response                  = await updateUserAccount(userToUpdate);
                    const responseBody              = await response.json();
                    
                    //? En fonction du statut de la réponse, afficher le message d'erreur ou de succès correspondant
                    if (response.status == 200) {
                        this.formSuccessMessage = responseBody.message;
                    } else {
                        this.errorMessages.form = responseBody.message;
                    }
                }
            },
        },
        mounted() {
            //? Exécution de la méthode getUserAccount() pour récupérer les données à afficher
            this.getUserAccount();
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

   .admin_content_form_buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
   }

   option:active {
    background-color: #E04F5F;
   }

</style>