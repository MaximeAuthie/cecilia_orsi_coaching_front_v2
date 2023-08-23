<template>
    <div v-if="!pageDataDownload" class="waiting_div">
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
                <h2>Introduction</h2>
                <p>
                    Dans le cadre de son activité, la société <strong>Cécilia Orsi</strong>, dont le siège social est situé à Toulouse, est amenée à collecter et à traiter des informations dont certaines sont qualifiées de "données personnelles". 
                    Cécilia Orsi attache une grande importance au respect de la vie privée, et n’utilise que des donnes de manière responsable et confidentielle et dans une finalité précise.
                </p>
                <h2>Données personnelles</h2>
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
                
                <h2>Utilisation des données</h2>
                <p>
                    Les données que vous nous transmettez directement sont utilisées uniquement dans le but de vous re-contacter et/ou dans le cadre de la demande que vous nous faites.
                </p>
                <h2>Base légale</h2>
                <p>
                    Les données personnelles ne sont collectées qu’après consentement obligatoire de l’utilisateur. Ce consentement est valablement recueilli (boutons et cases à cocher), libre, clair et sans équivoque.
                </p>
                <h2>Durée de conservation</h2>
                <p>
                    Les données seront sauvegardées durant une durée maximale de 3 ans.
                </p>

                <h2>Cookies</h2>
                <p>
                    Aucun cookie n'est collecté ou installé par le site <strong>https://www.cecilia-orsi.fr/</strong>
                </p>
                <h2>Contact délégué à la protection des données</h2>
                <p>
                    Cécilia Orsi - <a class="content_description_link" href="mailto:contact@cecilia-orsi.fr">contact@cecilia-orsi.fr</a> ou 
                    <nuxt-link class="content_description_link" to="/privacyPolicy" target="_blank" rel="external">
                        formulaire de contact
                    </nuxt-link>
                </p>
    
                <NuxtLink to="/"><input class="button button_content" type="button" value="Retour à l'accueil"></NuxtLink>
            </section>
        </div>
    </div>
</template>

<script>
    import { usePagesStore } from '@/store/page';

    export default {
        data() {
            return {
                pageId :            7,
                pageData :          {},
                pageDataDownload :  false
            }
        },
        methods: {
            getPageData() {
                const pageStore = usePagesStore();

                //? Vérifier si les articles sont toujours présents dans le store
                if (pageStore.pages.length > 0) {
                    this.pageData       = pageStore.pages[this.pageId];
                    this.pageDataDownload   = true;
                } else {

                //? Si les articles ne sont pas déjà présents dans le store, effectuer l'appel API
                pageStore.getAllPages()
                    .then(() => {
                        this.pageData       = pageStore.pages[this.pageId];
                        this.pageDataDownload   = true;
                    })

                    //? En cas d'erreur inattendue, capter l'erreur rencontrée
                    .catch((error) => {
                    console.error('Erreur lors de la récupération des pages :', error);
                    this.pageDataDownload   = false;
                    });
                }
            }
        },
        mounted() {

            //? Exécution de la méthode récupérant les données de la page dans la BDD et qui les place dans l'objet this.pageData
            this.getPageData();

            //? Renseigner les balises HTML de <head> pour le SEO
            useHead({
                title: 'Cécilia Orsi Coaching - Qui je suis?',
                meta: [
                    {name: 'description', content: 'Mention légales'},
                    {name:'robots', content:'noindex, nofollow'},
                    {"http-equiv": 'Content-Language', content: 'fr'},
                ],
                link: [{rel: 'icon', href: '/_nuxt/assets/images/icone_tree.png'}]
            })
        },
    };
</script>

<style scoped>
 .content_description_link {
    color: #4B453F;
    text-decoration: underline;
 }


</style>