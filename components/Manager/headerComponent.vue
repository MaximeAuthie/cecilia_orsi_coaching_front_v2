<template>
    <header>
        <div class="header_logo">
            <nuxt-link to="/">
                <img src="~/assets/images/logo_header.png" alt="Cécilia Orsi Coaching">
            </nuxt-link>
        </div>
        <div class="header_avatar" :style="{backgroundImage: userData.avatar_url_user}"></div>
    </header>
</template>
<script>
    export default {
        data() {
            return {
               userData: {
                    avatar_url_user: "url(../../assets/images/cecilia-orsi.png)"
               }
            }
        },
    }
</script>
<style>
    header {
        position: fixed;
        top: 0px;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 12vh;
        padding: 0 2vw;
        background-color: #FFFFFF;
        box-shadow: 0 4px 2px rgba(0, 0, 0, 0.25);
        z-index: 10;
    }
    
    .header_logo {
        display: flex;
        align-items: center;

        max-height: 100%;
    }

    .header_logo img {
        max-height: var(--computer-header-height);
        max-width: 100%;;
    }
    
    .header_avatar {
        width: 7vh;
        height: 7vh;
        border-radius: 5vh;
        background-size: cover; 
        background-position: center;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        margin: 10vh 0;
    }
    </style>