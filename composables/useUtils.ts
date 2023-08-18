export function useUtils() {

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

    function containNumbber(password: string) {
        //? Définir les pattern du regex
        const numberPattern = new RegExp(/[0-9]/g);

        //? Vérifier si le mot de passe contient une chiffre
        if (!numberPattern.test(password)) {
            return false
        } else {
            return true;
        }
    }

    function isLongEnough(password: string) {

        //? Vérifier si le mot de passe contient au moins 14 caractères
        if (password.length < 14 ) {
            return false
        } else {
            return true;
        }
    }

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
    
    return {
        isPasswordIdentical,
        containUppercase,
        containLowercase,
        containNumbber,
        isLongEnough,
        isMailFormatCorrect
    }
}