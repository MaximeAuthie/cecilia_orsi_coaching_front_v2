<template>
    <div class="front_page_article_div" :style="{backgroundImage: 'url(' + bannerUrl +')'}">

        <div class="front_page_article_div_categories">
            <div v-for="category in categories" class="front_page_article_category" :style="{backgroundColor: category.color_category , borderColor: category.color_category}">
                <span class="front_page_article_category_title"> {{ category.name_category }} </span>
            </div>
        </div>
        <div class="front_page_article_title">
            <h5>{{ title }}</h5>
        </div>
        <NuxtLink class="front_page_article_link" to="/"><input class="button button_secondary" type="button" value="Lire l'article"></NuxtLink>
    </div>
</template>

<script lang="ts">
    export default {
        props: {
            id: {
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
            categories: {
                type:       Object,
                required:   true
            },
        },
        data() {
            return {
                tileRoute : '' as string
            }
        },
        mounted() {
            this.tileRoute = 'blog/article/' + this.id;
        }
    }
</script>

<style scoped>
    h5 {
        font-size: 3em;
    }
    .front_page_article_link {
        text-decoration: none;
        z-index: 3;
    }
    .front_page_article_div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: calc(90vw * 0.65);
        border-radius: 20px;
        margin-top: 5vh;
        padding: 4vh 0;
        background-size: cover; 
        background-position: center;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        position: relative;
        z-index: 1;
    }
    .front_page_article_div::after {
        position: absolute;
        content: '';
        display: block;
        background-color: #000000;
        opacity: 0.3;
        height: 100%;
        width: 100%;border-radius: 20px;
        z-index: 0;
    }

    .front_page_article_div:hover {
        animation: hoverDiv 400ms ease-in-out forwards;
    }

    .front_page_article_div_categories {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .front_page_article_category {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 30px;
        border-style: solid;
        border-radius: 30px;
        text-align: center;
        color: #FFFFFF;
        font-size: 1em;
        margin: 0.5vw;
        z-index: 3;
    }
    .front_page_article_title {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        z-index: 3;
        margin-left: 5%;
        margin-right: 5%;
    }
 
    @media screen and (min-width: 1210px) {
        .front_page_article_div {
            width: 100%;
            height: 50vh;
        }

        .front_page_article_category {
            width: 160px;
            height: 35px;
            font-size: 1.2em;
        }
        h5 {
            font-size: 4.5em;
        }
    }

</style>