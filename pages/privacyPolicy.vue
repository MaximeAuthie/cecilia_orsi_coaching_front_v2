<script setup>
    //? Récupérer le nom de la page pour l'utiliser dans l'appel api
    const route = useRoute();
    const title = route.fullPath;

    //? Récupérer l'adresse URL du serveur et l'url de l'icone d'onglet
    const config    = useRuntimeConfig();
    const serverUrl = config.public.serverUrl;
    const iconUrl = config.public.metaLinkIconUrl;

    //? Exécuter les appels api pour récupérer les données de la page et des tuile de la page côté serveur
    const {data: pageData, pending}     = useFetch(serverUrl + 'api/page/title' + title);
    const {data: tilesData}             = useFetch(serverUrl + 'api/tile/page' + title);
    
    //? Renseigner les balises HTML de <head> pour le SEO côté serveur
    useHead({
        title: 'Cécilia Orsi Coaching - Politique de confidentialité',
        meta: [
            {name: 'description', content: 'Politique de confidentialité'},
            {name:'robots', content:'noindex, nofollow'},
            {"http-equiv": 'Content-Language', content: 'fr'},
            {property: 'og:title', content: 'Cécilia Orsi Coaching - Politique de confidentialité'},
            {property: 'og:type', content: 'website'},
            {property: 'og:url', content:'https://www.cecilia-orsi.fr/privacyPolicy'},
            {property: 'og:image', content: '/_nuxt/assets/images/logo_header.png'},
            {property: 'og:description', content: 'Politique de condidentialité du site Cécilia Orsi Coaching'},
        ],
        link: [{rel: 'icon', href: iconUrl}]
    })
</script>

<template>
    <LoaderComponent v-if="pending"></LoaderComponent>
    <div v-else>
        <BannerComponent :imgUrl="pageData.banner_url_page" :messages="pageData.BannerTextsList" :isMainButtonActive="pageData.isMainButtonActive_page" :isSecondButtonActive="pageData.isSecondaryButtonActive_page" ></BannerComponent>
        <div class="content">
            <section class="content_description" >
                <h3>Introduction</h3>
                <p>
                    Dans le cadre de son activité, la société <strong>Cécilia Orsi</strong>, dont le siège social est situé à Toulouse, est amenée à collecter et à traiter des informations dont certaines sont qualifiées de "données personnelles". 
                    Cécilia Orsi attache une grande importance au respect de la vie privée, et n’utilise que des donnes de manière responsable et confidentielle et dans une finalité précise.
                </p>
                <h3>Données personnelles</h3>
                <p>Sur le site web <strong>Cécilia Orsi</strong>, il y a 2 types de données susceptibles d’être recueillies :</p>
                    <ul>
                        <li><strong>Les données transmises directement :</strong></li>
                        Ces données sont celles que vous nous transmettez directement, via un formulaire de contact ou bien par contact direct par email. Sont obligatoires dans le formulaire de contact le champs « prénom », « nom » et « email ».
                        De la même façon, pour poster un commentaire sur une article du blog, la saisie des informations suivantes est obligatoire : « prénom et nom » et « email ».
                        <br><br>
                        <li><strong>Les données collectées automatiquement :</strong></li>
                        Afin de mesurer l'audience du site <strong>https://www.cecilia-orsi.fr/</strong> nous collectons de manière totalement anonyme votre adresse IP publique.
                        Ces données sont utilisées exclusivement dans le cadre du site <strong>https://www.cecilia-orsi.fr/</strong> et <strong><u>ne seront jamais cédées à un tiers ni utilisées à d’autres fins que celles détaillées ci-dessus</u></strong>. 
                    </ul>
                
                <h3>Utilisation des données</h3>
                <p>
                    Les données que vous nous transmettez directement sont utilisées uniquement dans le but de vous re-contacter et/ou dans le cadre de la demande que vous nous faites.
                </p>
                <h3>Base légale</h3>
                <p>
                    Les données personnelles ne sont collectées qu’après consentement obligatoire de l’utilisateur. Ce consentement est valablement recueilli (boutons et cases à cocher), libre, clair et sans équivoque.
                </p>
                <h3>Durée de conservation</h3>
                <p>
                    Les données seront sauvegardées durant une durée maximale de 3 ans.
                </p>

                <h3>Cookies</h3>
                <p>
                    Aucun cookie n'est collecté ou installé par le site <strong>https://www.cecilia-orsi.fr/</strong>
                </p>
                <h3>Contact délégué à la protection des données</h3>
                <p>
                    Cécilia Orsi - <a class="content_description_link" href="mailto:contact@cecilia-orsi.fr">contact@cecilia-orsi.fr</a> ou 
                    <nuxt-link class="content_description_link" to="/privacyPolicy" target="_blank" rel="external">
                        formulaire de contact
                    </nuxt-link>
                </p>
    
                <NuxtLink to="/"><input class="button button_content" type="button" value="Retour à l'accueil"></NuxtLink>
            </section>
            <section class="content_tiles">
                <TileComponent v-for="tile in tilesData" :pageTitle="tile.title_tile" :pagePath="tile.link_tile" :pageImgUrm="tile.img_url_tile" :full-width="tile.isFullWidth_tile"></TileComponent>
            </section>
        </div>
    </div>
</template>

<style scoped>
 .content_description_link {
    color: #4B453F;
    text-decoration: underline;
 }


</style>