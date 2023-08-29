<script setup>
    definePageMeta({
        layout: "admin-before-auth"
    });
</script>

<template>
    <div class="admin_content">
        <h1>Connexion à l'espace d'administration</h1>

        <div class="admin_content_form">
            <div class="admin_content_form_bloc">
                <label for="email" class="admin_label">Adresse email : </label>
                <input v-model="authentificationData.email" @keyup="checkInputKeyUp" :class=" errorMessages.emailEmpty != ''  ? 'bad_admin_input_form' : 'admin_input_form'" type="text" name="email">
                <span class="admin_error_message_form">{{ errorMessages.emailEmpty }}</span>
            </div>
            <div class="admin_content_form_bloc">
                <label for="password" class="admin_label">Mot de passe : </label>
                <input v-model="authentificationData.password" @keyup="checkInputKeyUp" :class=" errorMessages.passwordEmpty != ''  ? 'bad_admin_input_form' : 'admin_input_form'" type="password" name="password">
                <span class="admin_error_message_form">{{ errorMessages.passwordEmpty }}</span>
            </div>
        </div>
        <div class="admin_content_filters_message">
            <span v-if="errorMessages.form" class="admin_content_filters_message_error">{{ errorMessages.form }}</span>
            <span v-if="formSuccessMessage" class="admin_content_filters_message_success">{{ formSuccessMessage }}</span>
        </div>
        <div class="admin_content_form_buttons">
            <button @click="logIn" class="admin_button admin_button_main">Se connecter</button>
        </div>
    </div>
</template>

<script>
    
    export default {
        data() {
            return {
                authentificationData: {
                    email:          '',
                    password:       ''     
                },
                errorMessages: {
                    emailEmpty:     '',
                    passwordEmpty:  ''
                },
                formSuccessMessage: ''
            }
        },
        methods: {
            checkInputBeforeSubmit() {
                if (this.authentificationData.email == '') {
                    this.errorMessages.emailEmpty   = "Veuillez saisir votre email de connexion";
                }
                if (this.authentificationData.password == '') {
                    this.errorMessages.passwordEmpty    = "Veuillez saisir votre mot de passe";
                }
            },
            checkInputKeyUp() {
                if (this.authentificationData.email != '') {
                    this.errorMessages.emailEmpty   = "";
                }
                if (this.authentificationData.password != '') {
                    this.errorMessages.passwordEmpty    = "";
                }
            },
            checkErrorMessages() {
                if (this.errorMessages.emailEmpty != '' || this.errorMessages.passwordEmpty != '') {
                    return false;
                } else {
                    return true;
                }
            },
            async logIn() {

                //? Réinitialiser les éventuels précédents messages d'erreurs
                this.errorMessages.form = '';
                this.formSuccessMessage = '';

                //? Vérifier si les champs nécessaires sont bien renseignés
                this.checkInputBeforeSubmit();
                
                if (this.checkErrorMessages()) {

                   //? Appel de la méthode logIn() du composable useUser
                    const { logIn } = useUser();
                    const response = await logIn(this.authentificationData);
                    
                    //? Récupérer le body de la réponse
                    const responseBody = await response.json()
                    
                    //? En fonction du statut de la réponse, afficher le message d'erreur ou de succès correspondant
                    if (response.status == 200) {
                        this.formSuccessMessage             = responseBody.message;
                    } else {
                        this.errorMessages.form             = responseBody.message;
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .admin_content {
        float: none;
        width: 100%;
    }

    .admin_content_form_bloc {
        width: 60%;
    }

    h1 {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 2.2em;
        color: #4B453F;
        text-shadow: none;
    }

    .admin_content_form_buttons {
        margin-top: 5vh;
    }
</style>  