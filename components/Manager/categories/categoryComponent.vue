<template>
    <div class="category_item">
        <div class="category_item_name">{{ name }}</div>
        <div class="category_item_color" :style="{backgroundColor: color}">{{ color }}</div>
        <div class="category_item_icon">
            <svg @click="updateCategory" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clip-rule="evenodd" />
            </svg>
            <svg @click="deleteCategory" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#E04F5F" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
    </div>
</template>

<script>
    import { useCategoriesStore } from '@/store/category';
    import { useUsersStore } from "@/store/user";

    export default {
        emits: ['update'],
        props: {
            id: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            color: {
                type: String,
                required: true
            },
        },
        methods: {
            updateCategory() {
                this.$emit('update', this.id, this.name, this.color);
                console.log("niv 1 activé, " + this.name + this.color);
            },
            async deleteCategory() {
                const store = useCategoriesStore();

                //? Demander une confirmation pour la suppression de la catégorie
                if (confirm("Etes-vous sûr de vouloir supprimer la catégorie \"" + this.name + "\" ?")) {

                    //? Définir le contenu du body de la requête
                    const body = {
                        id: this.id,
                        name: this.name
                    };

                    //? Transformer l'objet body en json
                    const bodyJson  = JSON.stringify(body);

                    //? Récupérer le jwt pour le header de la requête
                    const userStore = useUsersStore();
                    const jwt       = userStore.token;

                    //? Exécuter l'appel API
                    await fetch('https://127.0.0.1:8000/api/category/delete', {
                        method:'DELETE',
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            "Authorization": `Bearer ${jwt}`
                        },
                        body: bodyJson,
                    })
                    .then(async response => {
                        
                        const body = await response.json()

                        if (response.status == 200) {
                            store.getAllCategories();
                            alert("La catégorie " + this.name + " a été supprimée avec succès.");
                        } else if (response.status == 498) {
                            userStore.token = '';
                            this.$router.push('/managerApp/logIn/expired-session'); 
                        } else {
                            alert(body.message);
                        }
                    })
                    .catch(error => {
                        alert("Une erreur est survenue. Veuillez réessayer plus tard.");
                    });
                }
            }
        }
    }

</script>

<style scoped>
    .category_item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 95%;
        background-color: #EBEBEB;
        border-radius: 2vh;
        margin: 1vh 0;
        padding: 1vh 1vh;
        font-size: 0.5em;
    }
    .category_item_name {
        width: 70%;
    }
    .category_item_color {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 12%;
        color: #FFFFFF;
        text-align: center;
        padding: 0.5vh;
        border-radius: 5vh;
        font-size: 0.7em;
    }
    .category_item_icon {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 5%;
    }
    .category_item_icon svg {
        height: 4vh;
        width: 4vh;
        cursor: pointer;
    }
</style>