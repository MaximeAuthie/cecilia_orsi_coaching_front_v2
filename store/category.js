import { defineStore } from 'pinia';

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [],
  }),
  actions: {
    async getAllCategories() {
      console.log("GetAllCategories lancé");
        try {
            let response = await $fetch('https://127.0.0.1:8000/api/category/all', {
                method:'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }).then(response => {
              const categoryList = response;
              this.categories = categoryList;
            })
            
        } catch (error) {
            console.error(error.message);
        }
        
    }
  },
});