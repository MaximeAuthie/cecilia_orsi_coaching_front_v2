<template>
    <div class="category_item">
        <div class="category_item_name">{{ name }}</div>
        <div class="category_item_color" :style="{backgroundColor: color}">{{ color }}</div>
        <div class="category_item_icon">
            <svg @click="updateCategory" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" class="w-6 h-6">
                <path fill-rule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
            </svg>
            <svg @click="deleteCategory" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#E04F5F" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

        </div>
    </div>
</template>

<script>
    import { useCategoriesStore } from '@/store/category'

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
                if (confirm("Etes-vous sûr de vouloir supprimer la catégorie \"" + this.name + "\" ?")) {

                    //? Transformer id en json
                    const body = {
                        id: this.id,
                        name: this.name
                    };
                    const bodyJson  = JSON.stringify(body);

                    //? Exécuter l'appel API
                    await fetch('https://127.0.0.1:8000/api/category/delete', {
                        method:'DELETE',
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
                            store.getAllCategories();
                            alert("La catégorie " + this.name + " a été supprimée avec succès.");
                        } else {
                            console.log(body.message);
                        }
                    })
                    .catch(error => {
                        this.formErrorMessage = "Une erreur est survenue. Veuillez réessayer plus tard.";
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