import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    token: ''
  }),
  actions: {
    async getAllUsers() {
      console.log("getAllUsers lancé");
        try {
            await $fetch('https://127.0.0.1:8000/api/user/all', {
                method:'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }).then(response => {
              const usersList = response;
              this.users = usersList;
            })
            
        } catch (error) {
            console.error(error.message);
        }
        
    }
  },
});