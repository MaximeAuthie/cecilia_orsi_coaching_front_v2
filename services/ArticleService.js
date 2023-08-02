class ArticleService {
    
    async getAllArticles() {

        let response = await fetch('https://127.0.0.1:8000/api/article/all', {
            method:'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
        
        let data = await response.json();
        
        return data;
    
    }
        
}

export default new ArticleService;