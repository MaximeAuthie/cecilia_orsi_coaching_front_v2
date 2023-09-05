<script setup>

    //? Récupérer l'ID de l'article pour l'utiliser dans l'appel api
    const route = useRoute();
    const id    = route.params.id;

    //? Récupérer l'adresse URL du serveur et l'url de l'icone d'onglet
    const config    = useRuntimeConfig();
    const serverUrl = config.public.serverUrl;
    const iconUrl = config.public.metaLinkIconUrl;

    //? Exécuter les appels api pour récupérer les données de l'article et des commentaires de l'article côté serveur
    const {data:article, pending}   = await useFetch(serverUrl + 'api/article/id/' + id);
    const {data:comments}           = useFetch(serverUrl + 'api/comment/validated/' + id);

    //? Importer la fonction formatDate() du composable useUtils pour l'utiliser dans le template
    const { formatDate } = useUtils();

    //? Créer une chaine de caratère contenant tous les keywords pour l'utiliser pour renseigner les balises meta dans useHead()
    let keywordList = ''
    article.value.kewords_list.forEach(keyword => {
        keywordList = keywordList + keyword.content_keywork + ', ';
    })

    //? Renseigner les balises HTML de <head> pour le SEO côté serveur
    useHead({
        title: 'Cécilia Orsi Coaching - ' + article.value.title_article,
        meta: [
            {name: 'description', content: article.value.description_article},
            {name:'robots', content:'index, follow'},
            {"http-equiv": 'Content-Language', content: 'fr'},
            {name: 'keywords', content: keywordList},
            {property: 'og:title', content: 'Cécilia Orsi Coaching - ' + article.value.title_article},
            {property: 'og:type', content: 'website'},
            {property: 'og:url', content:'https://www.cecilia-orsi.fr/blog'},
            {property: 'og:image', content: './assets/images/logo_header.png'},
            {property: 'og:description', content: article.value.description_article},
            {name: 'twitter:card', content: 'summary_large_image'},
            {name: 'twitter: title', content: 'Cécilia Orsi Coaching - ' + article.value.title_article},
            {name: 'twitter:description', content: article.value.description_article},
            {name: 'twitter:image', content: './assets/images/logo_header.png'}
        ],
        link: [{rel: 'icon', href: iconUrl}]
    })
</script>

<template>
    <LoaderComponent v-if="pending"></LoaderComponent>
    <div v-else>
        <div class="banner" :style="{backgroundImage: 'url(' + article.banner_url_article + ')'}">
            <NuxtLink to="/blog">
                <div class="banner_link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M20.25 12a.75.75 0 01-.75.75H6.31l5.47 5.47a.75.75 0 11-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06l6.75-6.75a.75.75 0 111.06 1.06l-5.47 5.47H19.5a.75.75 0 01.75.75z" clip-rule="evenodd" />
                    </svg>
                    Retour au blog
                </div>
            </NuxtLink>
                <div class="banner_logo">
                <img src="~/assets/images/logo_nav_header.png" alt="">
            </div>
            <div v-if="!pending" class="banner_title">
                <h1>{{ article.title_article }}</h1>
            </div> 
        
            <div v-if="!pending" class="banner_informations">
                Par {{ article.user.first_name_user }} {{ article.user.last_name_user }} - le {{ formatDate(article.date_article ) }}
            </div>
        </div>
        <div class="content">
            <section v-html="article.content_article" class="content_article">
            
            </section>

            <section class="content_comments">
                <CommentsSpaceComponent :articleId="id" :comments="comments"></CommentsSpaceComponent>
            </section>
        </div>
    </div>
</template>

<style scoped>
  .banner {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 85vh;
      background-size: cover; 
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-position: top center;
      position: relative;
      z-index: 1;
  }

  .banner::after{
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 85vh;
      width: 100%;
      background-color: #000000;
      opacity: 0.50;
      z-index: -1;
  }
    .banner_link {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        text-decoration:none;
        color: #FFFFFF;
        width: 98vw;
        font-size: 1.3em;
        margin-top: 1vh;
    }
    .banner_link:hover {
        text-decoration: underline;
    }
    .banner_link svg {
        height: 3vh;
        width: auto;
    }
  .banner_logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 25vh;
        margin-top: 2.5vh;
  }

  .banner_logo img {
      max-height: 90%;
      width: auto;
  }

  .banner_title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30vh;
      width: 90%;
      margin-top: 5vh;
  }

  .banner_title h1 {
    line-height: 1.3em;
    font-size: 3em;
  }

  .banner_informations {
        font-size: 1.3em;
        color: #FFFFFF;
        margin-top: 15vh;
        font-size: 1.5em;
  }

  .content_article {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: justify;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5vh;
    line-height: 4vh;
    font-size: 1.2em ;
  }

  @media screen and (min-width: 1210px) {
      .banner {
          width: 100%;
          height: 70vh;
      }
      .banner::after{
          height: 70vh;
      }
      .banner_logo {
          height: 25vh;
      }
      .banner_title {
          height: 20vh;
          width: 90%;
          margin-top: 0;
      }

      .banner_title h1 {
        line-height: 1.3em;
        font-size: 3.5em;
    }
      .banner_informations {
        margin-top: 15vh;
        }
        .content_article {
            width: 900px;
        }
  }
</style>