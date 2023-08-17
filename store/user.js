import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users:  [],
    token:  '',
    id:     '',
    role:   ''
  }),
  actions: {
    async getAllUsers() {
        const { verifyToken } = useAuthentification();

        const body = {
            idApplicant : this.id
        }
        const bodyJson = JSON.stringify(body);

        //? Récupérer le jwt pour le header de la requête via la fonction verifyToken() du composable useAuthentification
        const jwt = await verifyToken();

        await $fetch('https://127.0.0.1:8000/api/user/active/all', {
            method:'PATCH',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${jwt}`
            },
            body: bodyJson
        })
        .then(response => {
            const usersList = response;
            this.users = usersList;
        })
    },
    async getRole() {
        const body = {
            id : this.id
        }

        const bodyJson = JSON.stringify(body)

        fetch('https://127.0.0.1:8000/api/user/role', {
            method:'PATCH',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${this.token}`
            },
            body: bodyJson
        })
        .then( async response => {
            const usersRole = await response.json();
            this.role = usersRole;
        })
    }
  },
});