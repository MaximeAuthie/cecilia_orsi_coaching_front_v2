export function useIp() {

    async function getPublicIp() {
       
        try {

            //? Appeller l'api
            const response = await $fetch('https://api.ipify.org');
            
            //? Retourner la réponse : ici un noouveau token (string)
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