
<template>
    <div v-if="!isArticleLoaded" class="waiting_div">
        <h2>Bienvenue sur le site de Cécilia Orsi Coaching</h2>
        <h2>Veuillez patienter...</h2>
    </div>
    <div v-else>
        <div class="banner" :style="{backgroundImage: 'url(' + articleDataTest.banner_url_article + ')'}">
                <div class="banner_logo">
                <img src="~/assets/images/logo_nav_header.png" alt="">
            </div>
            <div v-if="isArticleLoaded" class="banner_title">
                <h1>{{ articleDataTest.title_article }}</h1>
            </div> 
        
            <div v-if="isArticleLoaded" class="banner_informations">
                Par {{ articleDataTest.user.first_name_user }} {{ articleDataTest.user.last_name_user }} - le {{ articleDataTest.date_article }}
            </div>
        </div>
        <div class="content">
            <section v-html="articleDataTest.content_article" class="content_article">
            
            </section>

            <section class="content_comments">
                <CommentsSpaceComponent :articleId="id" :comments="comments"></CommentsSpaceComponent>
            </section>
        </div>
    </div>
</template>

<script>

    import { useArticlesStore } from '@/store/article';
    import { useCommentsStore } from '@/store/comment'

    export default {
        data() {
            return {
                id: '',
                articleData: {
                    id: 7,
                    title: 'Stress et performance en entreprise',
                    bannerUrl: "url(https://images.pexels.com/photos/2128817/pexels-photo-2128817.jpeg)",
                    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, magni. Vel commodi ex placeat ratione voluptatem, dignissimos ullam qui quam nobis dolore temporibus iusto eligendi alias, sequi sint eius possimus cumque neque. Quasi numquam rerum aperiam expedita delectus. Rem facere officia tempora dolore enim aut quisquam illo facilis vel minus quasi, voluptates perspiciatis laudantium, sit ut labore sapiente. Alias quia ad modi neque. Numquam porro maxime cum doloremque ex illo eius explicabo a molestiae corporis, vero at dolorem recusandae soluta est minus dolore temporibus, sequi necessitatibus eveniet ea veniam quam, mollitia nulla. Impedit accusamus dolores consectetur soluta, ut suscipit maxime?",
                    date: '25/03/2023',
                    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, magni.',
                    keywords : 'stress, performance, entreprise, management, burn-out',
                    user: {
                        firstName: 'Cécilia',
                        lastName: 'Orsi'
                    },
                    categories: [
                        {
                            name:   "Travail",
                            color:  "#C6BDB4"
                        },
                        {
                            name:   "Santé",
                            color:  "#8EBBA7"
                        },
                    ],
                },
                articleDataTest: {},
                isArticleLoaded :  false,
                comments: []
            }
        },
        methods: {
            getArticleData() {
                const store = useArticlesStore();

                //? Vérifier si les articles sont toujours présents dans le store, récupérer les données de l'article
                if (store.articles.length > 0) {
                    this.articleDataTest            = store.articles.find( article => article.id == this.id);
                    this.isArticleLoaded            = true;
                } else {

                //? Si les articles ne sont pas déjà présents dans le store, effectuer l'appel API et récupérer les données de l'article
                store.getAllArticles()
                    .then(() => {
                    this.articleDataTest            = store.articles.find( article => article.id == this.id);
                    this.isArticleLoaded            = true;
                    })

                    //? En cas d'erreur inattendue, capter l'erreur rencontrée
                    .catch((error) => {
                    console.error('Erreur lors de la récupération des articles :', error);
                    this.loading                    = false;
                    });
                }

            },
            getComments() {
               const store = useCommentsStore();

               //? Vérifier si les articles sont toujours présents dans le store, récupérer les données de l'article
               if (store.comments.length > 0) {
                    this.comments                   = store.comments.filter( comment => comment.article.id == this.id);
                    this.isArticleLoaded            = true;
                } else {

                //? Si les articles ne sont pas déjà présents dans le store, effectuer l'appel API et récupérer les données de l'article
                store.getValidatedComments()
                    .then(() => {
                    this.comments            = store.comments.filter( comment => comment.article.id == this.id);;
                    this.isArticleLoaded            = true;
                    })

                    //? En cas d'erreur inattendue, capter l'erreur rencontrée
                    .catch((error) => {
                    console.error('Erreur lors de la récupération des commentaires :', error);
                    this.loading            = false;
                    });
                }
            }
        },
        mounted() {

            //? Récupération de l'id de l'article dans la route à l'ouverture de la page
            this.id = this.$route.params.id.toString();

            //? Récupérer les information de l'article concerné dans le store Article
            this.getArticleData();
            this.getComments();

            //? Renseigner les balises HTML de <head> pour le SEO
            useHead({
                title: 'Cécilia Orsi Coaching - ' + this.articleData.title,
                meta: [
                    {name: 'description', content: this.articleData.description},
                    {name:'robots', content:'index, follow'},
                    {"http-equiv": 'Content-Language', content: 'fr'},
                    {name: 'keywords', content: this.articleData.keywords},
                    {property: 'og:title', content: 'Cécilia Orsi Coaching - ' + this.articleData.title},
                    {property: 'og:type', content: 'website'},
                    {property: 'og:url', content:'https://www.cecilia-orsi.fr/blog'},
                    {property: 'og:image', content: './assets/images/logo_header.png'},
                    {property: 'og:description', content: this.articleData.description},
                    {name: 'twitter:card', content: 'summary_large_image'},
                    {name: 'twitter: title', content: 'Cécilia Orsi Coaching - ' + this.articleData.title},
                    {name: 'twitter:description', content: this.articleData.description},
                    {name: 'twitter:image', content: './assets/images/logo_header.png'}
                ],
                link: [{rel: 'icon', href: './assets/images/icone_tree.png'}]
            })
        },
    };
  
</script>

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
      opacity: 0.40;
      z-index: -1;
  }

  .banner_logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 25vh;
        /* background-color: aqua; */
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
      /* background-color: blueviolet; */
  }

  .banner_informations {
        font-size: 1.3em;
        color: #FFFFFF;
        margin-top: 15vh;
        /* background-color: chartreuse; */
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
      .banner_informations {
        margin-top: 15vh;
        }
        .content_article {
            width: 900px;
        }
  }
</style>