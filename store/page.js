import { defineStore } from 'pinia';

export const usePagesStore = defineStore('pages', {
  state: () => ({
    pages: [],
  }),
  actions: {
    async getAllPages() {
        try {
            await $fetch('https://127.0.0.1:8000/api/page/all', {
                method:'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }).then(response => {
              const pagesList = response;
              this.pages = pagesList;
            })
            
        } catch (error) {
            console.error(error.message);
        }
        
    }
  },
});