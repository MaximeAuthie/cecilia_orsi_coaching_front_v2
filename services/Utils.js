class Utils {
    
    getCurrentDateTime() {

        const now = new Date();

        //? Obtenir les différentes parties de la date
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
      
        //? Formater la date et l'heure au format "AAAA-MM-DD HH:MM:SS"
        const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      
        return dateTime;
        
    }

    formatDate(imputDate) {
        const date      = new Date(imputDate);
        const day       = String(date.getDate()).padStart(2,'0');
        const month     = String(date.getMonth()).padStart(2,'0');
        const year      = date.getFullYear();

        return day + '/' + month + '/' + year
    }

    formatDatetime(imputDate) {
        const date      = new Date(imputDate);
        const day       = String(date.getDate()).padStart(2,'0');
        const month     = String(date.getMonth()).padStart(2,'0');
        const year      = date.getFullYear();
        const hour      = String(date.getHours()).padStart(2,'0');
        const minute    = String(date.getMinutes()).padStart(2,'0');
        
        return day + '/' + month + '/' + year + ' à ' + hour + ':' + minute;
    }
        
}

export default new Utils;