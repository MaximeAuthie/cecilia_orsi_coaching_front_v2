<template>
    <nuxt-link :to="tileRoute" class="article_div" >
            <div class="article_div_title_bloc" :style="{backgroundImage: 'url(' + bannerUrl + ')'}">
                <div class="article_div_title_bloc_title">
                    <h5>{{ title }}</h5>
                </div>
                <div class="article_div_title_bloc_informations">
                    {{ user.first_name_user + " " + user.last_name_user + " - " + date }}
                </div>
            </div>
            <div class="article_div_categories">
                <ArticlesCategoryTagComponent v-for="category in categories" :name="category.name_category" :color="category.color_category"></ArticlesCategoryTagComponent>
            </div>
            <div class="article_div_summary">
                <p>{{ summary.substring(0, 400) + "..." }}</p>
            </div>
     
    </nuxt-link>
</template>

<script>
    export default {
        props: {
            id : {
                type:       Number,
                required:   true
            },
            title: {
                type:       String,
                required:   true
            },
            bannerUrl: {
                type:       String,
                required:   true
            },
            summary: {
                type:       String,
                required:   true
            },
            date: {
                type:       String,
                required:   true
            },
            user: {
                type:       Object,
                required:   true
            },
            categories: {
                type:       Object,
                required:   true
            },
        },
        data() {
            return {
                tileRoute : ''
            }
        },
        mounted() {
            this.tileRoute = 'blog/article/' + this.id;
        }
    }
</script>

<style scoped>

    h5 {
        font-size: 2em;
        margin: 0;
        padding-top: 1vh;
        line-height: 4vh;
    }
    .article_div {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 360px;
        /* background-color: antiquewhite; */
        margin-top: 5vh;
        padding: 2vh 0;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        text-decoration: none;
    }
    .article_div:hover {
        animation: hoverDiv 400ms ease-in-out forwards;
    }

    .article_div_title_bloc {
        flex: 34%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 93%;
        border-radius: 5px;
        background-size: cover; 
        background-position: center;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        position: relative;
        z-index: 1;
    }
    .article_div_title_bloc::after {
        position: absolute;
        content: '';
        display: block;
        background-color: #000000;
        opacity: 0.2;
        height: 100%;
        width: 100%;
        border-radius: 5px;
        z-index: 0;
    }

    .article_div_title_bloc_title {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 2%;
        z-index: 5;
        height: 100%;
    }

    .article_div_title_bloc_informations {
        font-family: 'Playfair', serif;
        font-size: 1em;
        font-weight: 500;
        color: #FFFFFF;
        z-index: 5;
    }
    .article_div_categories {
        flex: 13%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        width: 93%;
        /* background-color: blueviolet; */
    }
    .article_div_summary {
        flex: 53%;
        width: 93%;
        /* background-color: chartreuse; */
        font-family: 'Playfair', serif;
        font-size: 1em;
        color: #4B453F;
        text-align: justify;
        margin: 0;
    }
    .article_div_summary p {
        margin: 0;
    }

    @media screen and (min-width: 1210px) {
        .article_div {
            width: 30%;
        } 
    }
</style>