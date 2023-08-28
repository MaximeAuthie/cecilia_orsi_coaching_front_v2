import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users:      [],
    token:      '',
    id:         '',
    role:       '',
    firstName:  ''
  }),
  actions: {
    async getAllUsers() {

        const body = {
            idApplicant : this.id
        }
        const bodyJson = JSON.stringify(body);

        //? Appel de la méthode getAllUsers() du composable useUser
        const { getAllUsers } = useUser();
        const usersList = await getAllUsers(bodyJson);

        //? Stocker les données retournées dans le state this.users
        this.users = usersList;
    },
    async getRole() {
        const body = {
            id : this.id
        }

        const bodyJson = JSON.stringify(body)

        //? Appel de la méthode getRole() du composable useUser
        const { getRole } = useUser();
        const usersData = await getRole(bodyJson);
        
        //? Stocker les données retournées dans le state this.role et this.firstName
        this.role = usersData.role;
        this.firstName = usersData.firstName;

        //? Rédiriger vers la page d'accueil au bout de 3 secondes (pour laisser le temps aux autres states de se charger)
        setTimeout(() => {
            navigateTo('/managerApp'); 
        }, 3000);
    }
  },
});