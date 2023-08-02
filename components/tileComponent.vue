<template>
    <nuxt-link class="tile_link" :to="pagePath">
        <div class="tile_div" :style="{backgroundImage: 'url(' + pageImgUrm + ')'}" :class="{tile_div_full_width : fullWidth}">
            <div class="tile_title">
                <h5>{{ pageTitle }}</h5>
            </div>
        </div>
    </nuxt-link>
   
</template>

<script>
    export default {
        props: {
            pageTitle: {
                type:       String,
                required:   true
            },
            pagePath: {
                type:       String,
                required:   true
            },
            pageImgUrm: {
                type:       String,
                required:   true
            },
            fullWidth: {
                type:       Boolean,
                required:   true
            }
        }
    }
</script>

<style scoped>

    .tile_link {
        text-decoration: none;
    }
    .tile_div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90vw;
        height: calc(90vw * 0.65);
        border-radius: 20px;
        margin-top: 5vh;
        background-size: cover; 
        background-position: center;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        position: relative;
        z-index: 1;
    }

    .tile_div::after {
        position: absolute;
        content: '';
        display: block;
        background-color: #000000;
        opacity: 0.2;
        height: 100%;
        width: 100%;
        border-radius: 20px;
        z-index: 0;
    }
    .tile_div:hover {
        animation: hoverDiv 300ms ease-in-out forwards;
    }

    .tile_div:active {
        transform: translate(0px ,2px);
        animation: clickOnDiv 300ms ease-in-out forwards;
    }

    .tile_title {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        z-index: 3;
        margin-left: 5%;
        margin-right: 5%;
    }

    @media screen and (min-width: 1210px) {
        .tile_div {
            width: 525px;
            height: 35vh;
        }
        .tile_div_full_width {
            width: 1100px;    
        }
    }

</style>