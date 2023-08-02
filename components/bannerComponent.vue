<template>
    <div class="banner" :style="{backgroundImage: 'url(' + imgUrl + ')'}">
        <div class="banner_logo">
            <img src="~/assets/images/logo_nav_header.png" alt="">
        </div>
        <div class="banner_message">
            <h1>{{ messages[activeMessageIndex].content_banner_text }}</h1>
        </div> 
        
        <div class="banner_buttons">
            <NuxtLink v-if="isMainButtonActive" to="/appointment"><input class="button button_main" type="button" value="Prendre rendez-vous"></NuxtLink>
            <NuxtLink v-if="isSecondButtonActive" to="/contact"><input class="button button_secondary" type="button" value="Me contacter"></NuxtLink>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            imgUrl: {
                type:       String,
                required:   true
            },
            messages: {
                type:       Array,
                required:   true
            },
            isMainButtonActive: {
                type:       Boolean,
                required:   true
            },
            isSecondButtonActive: {
                type:       Boolean,
                required:   true
            }
        },
        data() {
            return {
                activeMessageIndex: 0,
                activeMessageText: '',
                interval: {},
            }
        },
        mounted() {
            console.log("header chargé");
            this.interval = setInterval(async () => {
                    if (this.activeMessageIndex < this.messages.length - 1) {
                        this.activeMessageIndex ++;
                    } else {
                        this.activeMessageIndex = 0;
                    }
                    console.log(this.activeMessageIndex +" - "+ this.messages.length);
                    
                    this.activeMessageText = this.messages[this.activeMessageIndex];
                }, 4000)  
        },
        beforeUnmount() {
            clearInterval(this.interval);
        },
    };
    
</script>

<style scoped>
    .banner {
        display: flex;
        flex-direction: column;
        justify-content: center;
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
        margin-bottom: 5vh;
    }

    .banner_logo img {
        max-height: 90%;
        width: auto;
    }

    .banner_message {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20vh;
        width: 90%;
        margin-bottom: 5vh;
    }

    .banner_buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;
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
            width: 15%;
        }
        .banner_message {
            height: 10vh;
            width: 90%;
        }
    }
</style>