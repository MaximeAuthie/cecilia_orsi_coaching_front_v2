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
    import { useUsersStore } from "@/store/user";
    
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

                //? Vérifier si les champs nécessaires sont bien renseignés
                this.checkInputBeforeSubmit();
                console.log(this.checkErrorMessages());
                if (this.checkErrorMessages()) {

                    //? Transformer l'objet authentificationData en json
                    const bodyJson = JSON.stringify(this.authentificationData);

                    // //? Exécuter l'appel API si tous les champs sont remplis et que le format de la couleur est correct
                    await fetch('https://localhost:8000/api/user/logIn', {
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
                            const store = useUsersStore();
                            store.getAllUsers();
                        } else {
                            console.log(body);
                            this.errorMessages.form       = body.message;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.errorMessages.form = "Une erreur est survenue. Veuillez réessayer plus tard.";
                    });
                }
},
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