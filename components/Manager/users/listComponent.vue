<template>
    <div class="users_list_card">
        <div class="users_list_card_header">
            Liste des utilisateurs
        </div>
        <div v-if="users.length != 0" class="users_list_card_content">
            <ManagerUsersItemComponent v-for="user in users" :id="user.id" :name="user.first_name_user + ' ' + user.last_name_user" :role="user.roles[user.roles.length - 1]"></ManagerUsersItemComponent>
        </div>
        <div v-else class="users_list_card_no_user">Aucun utilisateur à afficher</div>
    </div>
</template>

<script>
import { useUsersStore } from '@/store/user';

export default {
    emits:['update'],
    data() {
        return {
            users: []
        }
    },
    methods: {
        getUsers() {
            const userStore = useUsersStore();

            //? Vérifier si les catégories sont toujours présentes dans le store
            if (userStore.users.length > 0) {
                console.log("user store 9000");
                this.users         = userStore.users;
            } else {

            //? Si les catégories ne sont pas déjà présents dans le store, effectuer l'appel API
            userStore.getAllUsers()
                .then(response => {
                    this.users       = userStore.users;
                })

                //? En cas d'erreur inattendue, capter l'erreur rencontrée
                .catch((error) => {
                    console.error('Erreur lors de la récupération des catégories :', error);
                    if (error.status == 498) {
                        userStore.token = '';
                        navigateTo('/managerApp/logIn/expired-session'); 
                    } 
                });
            }
        },
    },
    
    mounted() {
        this.getUsers();

        const userStore = useUsersStore();
        userStore.$subscribe((state) => {
            this.users = userStore.users;
            console.log("update store users")
        })
    }
}
</script>

<style scoped>
    .users_list_card {
        display: flex;
        flex-direction: column;
        width: 90%;
        border: 1px solid #E04F5F;
        border-radius: 1vh;
        background-color: #FFFFFF;
        margin: 5vh 0;
        overflow: hidden
    }

    .users_list_card_header {
        position: relative;
        width: 100%;
        border: 1px solid #E04F5F;
        font-size: 1.8em;
        color: #FFFFFF;
        background-color: #E04F5F;
        text-align: center;
        padding: 1vh 0;
    }
    .users_list_card_content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        font-size: 3em;
        min-height : 45vh
    }

    .users_list_card_no_user {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 45vh;
    }

</style>