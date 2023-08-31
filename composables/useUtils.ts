export function useUtils() {

    //! Vérifier si deux mots de passe sont identiques (managerApp)
    function isPasswordIdentical(passwordOne: string, passwordTwo: string) {
        
        if (passwordOne != '' && passwordTwo != '') {
            if (passwordOne !== passwordTwo) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
    
    //! Vérifier si un mot de passe contient une majuscule (managerApp)
    function containUppercase(password: string) {
        //? Définir les pattern du regex
        const upperCasePattern = new RegExp(/[A-Z]/g);

        //? Vérifier si le mot de passe contient une majuscule
        if (!upperCasePattern.test(password)) {
            return false
        } else {
            return true;
        }
    }

    //! Vérifier si un mot de passe contient une minuscule (managerApp)
    function containLowercase(password: string) {
        //? Définir les pattern du regex
        const lowerCasePattern = new RegExp(/[a-z]/g);

        //? Vérifier si le mot de passe contient une minuscule
        if (!lowerCasePattern.test(password)) {
            return false
        } else {
            return true;
        }
    }

    //! Vérifier si un mot de passe contient un chiffre (managerApp)
    function containNumber(password: string) {
        //? Définir les pattern du regex
        const numberPattern = new RegExp(/[0-9]/g);

        //? Vérifier si le mot de passe contient une chiffre
        if (!numberPattern.test(password)) {
            return false
        } else {
            return true;
        }
    }

    //! Vérifier si un mot de passe contient suffisamment de caractères (managerApp)
    function isLongEnough(password: string) {

        //? Vérifier si le mot de passe contient au moins 14 caractères
        if (password.length < 14 ) {
            return false
        } else {
            return true;
        }
    }

    //! Vérifier si une chaine de caractère respecte le format mail (managerApp)
    function isMailFormatCorrect(email: string) {

        console.log("ismail correct lancé");
        
        //? Définir le regex pour le format mail
        const pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);

        //? Vérifier le si le mail est saisi
        if (email != '') {
            console.log("ismail correct lancé != ''");
            //? Vérifier si la saisie correspond au regex
            if (!pattern.test(email)) {
                console.log(email);
                return false;
            } else {
                return true;
            }
        }
    }

    //! Renvoyer une date au format "dd/mm/aaaa" (site vitrine)
    function formatDate(imputDate:Date) {
        
        const date      = new Date(imputDate);
        const day       = String(date.getDate()).padStart(2,'0');
        const month     = String(date.getMonth()).padStart(2,'0');
        const year      = date.getFullYear();

        return day + '/' + month + '/' + year
    }

    //! Renvoyer une date au format "dd/mm/aaaa hh:mm" (site vitrine)
    function formatDatetime(imputDate:Date) {
        const date      = new Date(imputDate);
        const day       = String(date.getDate()).padStart(2,'0');
        const month     = String(date.getMonth()).padStart(2,'0');
        const year      = date.getFullYear();
        const hour      = String(date.getHours()).padStart(2,'0');
        const minute    = String(date.getMinutes()).padStart(2,'0');
        
        return day + '/' + month + '/' + year + ' à ' + hour + ':' + minute;
    }

    function getCurrentDateTime() {

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
    
    return {
        isPasswordIdentical,
        containUppercase,
        containLowercase,
        containNumber,
        isLongEnough,
        isMailFormatCorrect,
        formatDate,
        formatDatetime,
        getCurrentDateTime
    }
}