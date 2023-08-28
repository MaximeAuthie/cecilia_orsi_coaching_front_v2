<script setup>

    const route = useRoute();
    const title = route.fullPath;

    const {data: pageData} = useFetch('https://www.maximeauthie.fr/api/page' + title);
    const {data: tilesData, pending} = useFetch('https://www.maximeauthie.fr/api/tile' + title);
    
    useHead({
        title: 'Cécilia Orsi Coaching - Mentions légales',
        meta: [
            {name: 'description', content: 'Mention légales'},
            {name:'robots', content:'noindex, nofollow'},
            {"http-equiv": 'Content-Language', content: 'fr'},
        ],
        link: [{rel: 'icon', href: '/_nuxt/assets/images/icone_tree.png'}]
    })
</script>

<template>
    <div v-if="pending" class="waiting_div">
        <div class="waiting_div_logo">
            <img src="~/assets/images/logo_loader.png" alt="logo">
        </div>
        <h2>Cécilia Orsi Coaching</h2>
        <div class="waiting_div_loader">
            <p>Chargement en cours...</p>
        </div>
    </div>
    <div v-else>
        <BannerComponent :imgUrl="pageData.banner_url_page" :messages="pageData.BannerTextsList" :isMainButtonActive="pageData.isMainButtonActive_page" :isSecondButtonActive="pageData.isSecondaryButtonActive_page" ></BannerComponent>
        <div class="content">
            <section class="content_description" >
                <h2>1 - Édition du site</h2>
                <p>
                    En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site internet <strong>https://www.cecilia-orsi.fr/</strong> l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi:
                    <br><br>
                    <strong>Propriétaire du site :</strong> Cécilia Orsi - Contact : contact@cecilia-orsi.fr - Adresse : .
                    <br><br>
                    <strong>Identification de l'entreprise</strong> : Cécilia Orsi - SIREN : 84044525800014 - RCS ou RM : TOULOUSE
                    <br><br>
                    <strong>Hébergeur</strong> : OVH SAS - 2 rue Kellermann - BP 80157 - 59053 Roubaix Cedex 1 - Téléphone : 1007
                    <br><br>
                    <strong>Délégué à la protection des données</strong> : Cécilia Orsi - contact@cecilia-orsi.fr
                    <br><br>
                    <strong>Réalisation et maintenance du site</strong> :
                    <nuxt-link class="content_description_link" to="https://www.linkedin.com/in/maxime-authie-b10931149/?originalSubdomain=fr" target="_blank" rel="external">
                        Maxime Authié
                    </nuxt-link>
                    - authie.maxime@orange.fr
                </p>
                <h2>2 - Propriété intellectuelle et contrefaçons.</h2>
                <p>
                    Cécilia Orsi est propriétaire des droits de propriété intellectuelle et détient les droits d’usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons.
                    <br><br>
                    Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Cécilia Orsi.
                    <br><br>
                    Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
                </p>
                <h2>3 - Limitations de responsabilité.</h2>
                <p>
                    Cécilia Orsi ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site <strong>https://www.cecilia-orsi.fr/</strong>.
                    <br><br>
                    Cécilia Orsi décline toute responsabilité quant à l’utilisation qui pourrait être faite des informations et contenus présents sur <strong>https://www.cecilia-orsi.fr/</strong>.
                    <br><br>
                    Cécilia Orsi s’engage à sécuriser au mieux le site <strong>https://www.cecilia-orsi.fr/</strong>, cependant sa responsabilité ne pourra être mise en cause si des données indésirables sont importées et installées sur son site à son insu.
                    <br><br>
                    Des espaces interactifs (espace contact ou commentaires) sont à la disposition des utilisateurs. Cécilia Orsi se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable en France, en particulier aux dispositions relatives à la protection des données.
                    <br><br>
                    Le cas échéant, Cécilia Orsi se réserve également la possibilité de mettre en cause la responsabilité civile et/ou pénale de l’utilisateur, notamment en cas de message à caractère raciste, injurieux, diffamant, ou pornographique, quel que soit le support utilisé (texte, photographie …).
                </p>
                <h2>4 - Cnil et gestion des données personnelles.</h2>
                <p>
                    Conformément aux dispositions de la loi 78-17 du 6 janvier 1978 modifiée, l’utilisateur du site <strong>https://www.cecilia-orsi.fr/</strong> dispose d’un droit d’accès, de modification et de suppression des informations collectées. Pour exercer ce droit, envoyez un message à notre Délégué à la Protection des Données : Cécilia Orsi - contact@cecilia-orsi.fr.
                    <br><br>
                    Pour plus d'informations sur la façon dont nous traitons vos données (type de données, finalité, destinataire...), lisez notre
                    <nuxt-link class="content_description_link" to="/privacyPolicy">
                        <strong>politique de confidentialité</strong>
                    </nuxt-link>.
                </p>
                <h2>5 - Liens hypertextes et cookies.</h2>
                <p>
                    Le site <strong>https://www.cecilia-orsi.fr/</strong> contient des liens hypertextes vers d’autres sites et dégage toute responsabilité à propos de ces liens externes ou des liens créés par d’autres sites vers https://www.cecilia-orsi.fr/.
                    <br><br>
                    La navigation sur le site <strong>https://www.cecilia-orsi.fr/ <u>ne collecte ni n'installe aucun cookie</u></strong>.
                    <br><br>
                    Un "cookie" est un fichier de petite taille qui enregistre des informations relatives à la navigation d’un utilisateur sur un site. Les données ainsi obtenues permettent d'obtenir des mesures de fréquentation, par exemple.
                </p>
                <h2>6 - Droit applicable et attribution de juridiction.</h2>
                <p>
                    Tout litige en relation avec l’utilisation du site <strong>https://www.cecilia-orsi.fr/</strong> est soumis au droit français. En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents de Toulouse.
                </p>
    
                    <NuxtLink to="/"><input class="button button_content" type="button" value="Retour à l'accueil"></NuxtLink>
            </section>
            <section class="content_tiles">
                <TileComponent v-for="tile in tilesData" :pageTitle="tile.title_tile" :pagePath="tile.link_tile" :pageImgUrm="tile.img_url_tile" :full-width="tile.isFullWidth_tile" ></TileComponent>
            </section>
        </div>
    </div>
</template>

<style scoped>
    .content_description_link {
    color: #4B453F;
    text-decoration: underline;
    }
    .content_description_link:hover {
    color: #398C7E;
    }
</style>