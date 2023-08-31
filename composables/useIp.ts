export function useIp() {

    //! Récupérer l'adresse IP du client pour suivre sa visite en BDD (site vitrine)
    async function getPublicIp() {
       
        try {
            
            //? Exécuter l'appel API
            const response = await fetch('https://api.ipify.org');
            
            //? Retourner la réponse : ici l'adresse IP publique du client (string)
            const publicIp = await response.toString();
            return publicIp; 

        //? En cas d'erreur on met fin à la session
        } catch (error) {
            console.error(error); 
        }
    }
    
    return {
        getPublicIp
    }
}