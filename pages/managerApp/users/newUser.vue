<script setup>
    definePageMeta({
        layout: "admin",
        middleware: "auth-admin"
    });
</script>

<template>
    <div class="admin_content">
        <NuxtLink to="/managerApp/users">
            <div class="admin_content_link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M20.25 12a.75.75 0 01-.75.75H6.31l5.47 5.47a.75.75 0 11-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06l6.75-6.75a.75.75 0 111.06 1.06l-5.47 5.47H19.5a.75.75 0 01.75.75z" clip-rule="evenodd" />
                </svg>
                Retour à la liste des utilisateurs
            </div>
        </NuxtLink>
        <h1>Nouvel utilisateur</h1>

        <div class="admin_content_form">
            <div class="admin_content_form_bloc">
                <label for="first_name" class="admin_label">Prénom* : </label>
                <input v-model="user.firstName" @keyup="checkInputKeyUp" type="text" name="first_name" :class=" errorMessages.firstNameEmpty != ''  ? 'bad_admin_input_form' : 'admin_input_form'">
                <span class="admin_error_message_form">{{ errorMessages.firstNameEmpty }}</span>
            </div>
            <div class="admin_content_form_bloc">
                <label for="last_name" class="admin_label">Nom* : </label>
                <input v-model="user.lastName" @keyup="checkInputKeyUp" type="text" name="last_name" :class=" errorMessages.lastNameEmpty != ''  ? 'bad_admin_input_form' : 'admin_input_form'">
                <span class="admin_error_message_form">{{ errorMessages.lastNameEmpty }}</span>
            </div>
            <div class="admin_content_form_bloc">
                <label for="email" class="admin_label">Adresse email* : </label>
                <input v-model="user.email" @keyup="checkInputKeyUp" type="text" name="email" :class=" errorMessages.emailEmpty != '' || errorMessages.emailFormat != '' ? 'bad_admin_input_form' : 'admin_input_form'">
                <div class="admin_error_message_form">{{ errorMessages.emailEmpty }}</div>
                <div class="admin_error_message_form">{{ errorMessages.emailFormat }}</div>
            </div>
            <div class="admin_content_form_bloc">
                <label for="password_one" class="admin_label">Mot de passe* : </label>
                <input 
                    v-model="passwords.firstInput"
                    @keyup="checkPasswordKeyUp" 
                    :class=" errorMessages.passwordUppercase != '' || errorMessages.passwordLowercase != '' || errorMessages.passwordNumber != '' || errorMessages.passwordCaracters != '' || errorMessages.passwordsEmpty != '' ? 'bad_admin_input_form' : 'admin_input_form'" 
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
                <label for="password_two" class="admin_label">Ressaisir le mot de passe* : </label>
                <input 
                    v-model="passwords.secondInput"
                    @keyup="checkPasswordKeyUp"
                    :class=" errorMessages.passwordIdentical != ''  || errorMessages.passwordsEmpty != '' ? 'bad_admin_input_form' : 'admin_input_form'"
                    type="password"
                    name="password_two"
                    class="admin_input_form"
                    placeholder="********">
                <div v-if="errorMessages.passwordIdentical != ''" class="admin_error_message_form">{{ errorMessages.passwordIdentical }}</div>
                <div class="admin_error_message_form">{{ errorMessages.passwordsEmpty }}</div>
            </div>
            <div class="admin_content_form_bloc">
                <label for="role" class="admin_label">Rôle* : </label>
                <select v-model="selectedRole" name="role" :class=" errorMessages.firstNameEmpty != ''  ? 'bad_admin_select_form' : 'admin_select_form'">
                    <option value="ROLE_USER" class="admin_option">Utilisateur</option>
                    <option value="ROLE_ADMIN" class="admin_option">Administrateur</option>
                </select>
                <span class="admin_error_message_form">{{ errorMessages.rolesEmpty }}</span>
            </div>
            * champs obligatoires
            <div class="admin_content_filters_message">
                <span v-if="errorMessages.form" class="admin_content_filters_message_error">{{ errorMessages.form }}</span>
                <span v-if="errorMessages.titleEmpty" class="admin_content_filters_message_error">{{ errorMessages.titleEmpty }}</span>
                <span v-if="formSuccessMessage" class="admin_content_filters_message_success">{{ formSuccessMessage }}</span>
            </div>

            <div class="admin_content_form_buttons">
                <button @click="addUser" class="admin_button admin_button_main">Créer</button>
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
                user: {
                    firstName:              '',
                    lastName:               '',
                    email:                  '',
                    password:               '',
                    roles:                  [],
                    idApplicant:            ''
                },
                passwords: {
                    firstInput:             '',
                    secondInput:            ''
                },
                selectedRole:               [],
                formSuccessMessage:         '',
                errorMessages: {
                    form:                   '',
                    firstNameEmpty:         '',
                    lastNameEmpty:          '',
                    emailEmpty:             '',
                    passwordsEmpty:         '',
                    rolesEmpty:             '',
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

            //! Vérifier si les input sont vides et générer les messages d'erreur correspondants quand le formulaire est soumis
            checkInputBeforeSubmit() {
                if (this.user.firstName == '') {
                    this.errorMessages.firstNameEmpty   = "Veuillez saisir un prénom";
                    this.errorMessages.form             = "Veuillez remplir tous les champs obligatoires du formulaire";
                }
                if (this.user.lastName == '') {
                    this.errorMessages.lastNameEmpty    = "Veuillez saisir un nom";
                    this.errorMessages.form             = "Veuillez remplir tous les champs obligatoires du formulaire"
                }
                if (this.user.email == '') {
                    this.errorMessages.emailEmpty       = "Veuillez saisir une adresse email";
                    this.errorMessages.form             = "Veuillez remplir tous les champs obligatoires du formulaire"
                }
                if (this.passwords.firstInput == "") {
                    this.errorMessages.passwordsEmpty   = "Veuillez saisir un mot de passe";
                    this.errorMessages.form             = "Veuillez remplir tous les champs obligatoires du formulaire"
                }
                if (this.passwords.secondInput == "") {
                    this.errorMessages.passwordsEmpty   = "Veuillez saisir un mot de passe";
                    this.errorMessages.form             = "Veuillez remplir tous les champs obligatoires du formulaire"
                }
                if (this.selectedRole == "") {
                    this.errorMessages.rolesEmpty       = "Veuillez renseigner un rôle";
                    this.errorMessages.form             = "Veuillez remplir tous les champs obligatoires du formulaire"
                }
            },
            
            //! Vérifier si les input sont vides et effacer les messages d'erreur correspondants pendant la saisie
            checkInputKeyUp() {
                if (this.user.firstName != '') {
                    this.errorMessages.firstNameEmpty   = "";
                }
                if (this.user.lastName != '') {
                    this.errorMessages.lastNameEmpty    = "";
                }
                if (this.user.email != '') {
                    this.errorMessages.emailEmpty       = "";
                }
                if (this.passwords.firstInput != '') {
                    this.errorMessages.passwordsEmpty   = "";
                }
                if (this.passwords.secondInput != '') {
                    this.errorMessages.passwordsEmpty   = "";
                }
                if (this.selectedRole != []) {
                    this.errorMessages.rolesEmpty       = "";
                }
            },

            //! Vérifier si les champs sont saisis, le format du password et si les deux password sont identique pendant la saisie
            checkPasswordKeyUp() { 
                const { isPasswordIdentical } = useUtils();
                
                //? Vérifier le remplissage des champs obligatoires à chaque frappe
                this.checkInputKeyUp();

                //? Vérifier le format du mot de passe
                this.checkPasswordFormat();

                //? Vérifier si les deux mot de passe sont identiques (composable)
                if (isPasswordIdentical(this.passwords.firstInput, this.passwords.secondInput)) {
                    this.errorMessages.passwordIdentical = "";
                } else {
                    this.errorMessages.passwordIdentical = "Les deux mots de passe ne sont pas identiques";
                }
            },

            //! Vérifier le format de l'adresse mail
            checkMailFormat() {

                //? Définir le regex pour le format mail
                const pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);

                //? Vérifier le si le mail est saisi
                if (this.user.email != '') {

                    //? Vérifier si la saisie correspond au regex
                    if (!pattern.test(this.user.email)) {
                        this.errorMessages.emailFormat = "Le format de l'adresse email n'est pas correct";
                    } else {
                        this.errorMessages.emailFormat = "";
                    }
                }
            },

            //! Vérifier le format du mot de passe
            checkPasswordFormat() {

                //? Importer les fonction du composable useUtils
                const { containUppercase }  = useUtils();
                const { containLowercase }  = useUtils();
                const { containNumber }     = useUtils();
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

                if (!containNumber(this.passwords.firstInput)) {
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
                    || this.errorMessages.passwordsEmpty != ''
                    || this.errorMessages.rolesEmpty != '' 
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

            //! Ajouter l'utilisateur dans la BDD
            async addUser() {

                const userStore                 = useUsersStore();
                const { isMailFormatCorrect }   = useUtils();

                //? Réinitialiser les éventuels précédents messages d'erreurs
                this.errorMessages.form = '';

                //? Vérifier si les champs nécessaires sont bien renseignés
                this.checkInputBeforeSubmit();

                //? Vérifier si le format de l'adresse mail est correct
                if (!isMailFormatCorrect(this.user.email)) {
                    this.errorMessages.emailFormat = "Le format de l'adresse email n'est pas correct"
                } else {
                    this.errorMessages.emailFormat = ""
                }

                if (this.checkErrorMessages()) {

                    //? Mettre à jour les rôles de l'utilisateur
                    if (this.selectedRole == "ROLE_USER") {
                        this.user.roles.push("ROLE_USER");
                    } else if (this.selectedRole == "ROLE_ADMIN") {
                        this.user.roles.push("ROLE_USER");
                        this.user.roles.push("ROLE_ADMIN");
                    }

                    //? Mettre à jours le password
                    this.user.password = this.passwords.firstInput;

                    //? Ajouter l'id de l'utilisateur demandeur à l'objet user
                    this.user.idApplicant = userStore.id;
                    
                    //? Appel de la méthode addUser() du composable useUser
                    const { addUser }    = useUser();
                    const response       = await addUser(this.user);
                    const body           = await response.json();
                    
                    //? En fonction du statut de la réponse, afficher le message d'erreur ou de succès correspondant
                    if (response.status == 200) {
                        console.log(body);
                        this.formSuccessMessage = body.message;
                        userStore.getAllUsers();
                    } else {
                        this.errorMessages.form = body.message;
                    }
                }
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