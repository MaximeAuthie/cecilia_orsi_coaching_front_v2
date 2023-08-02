<template>
    <header>
        <div class="header_logo" @click="closeBurgerMenu">
            <nuxt-link to="/">
                <img src="~/assets/images/logo_header.png" alt="Cécilia Orsi Coaching">
            </nuxt-link>
        </div>
        <nav :class="actualClass">
            <div class="header_nav_logo">
                <img src="~/assets/images/logo_nav_header.png" alt="">
            </div>
            <ul class="header_nav_list">
                <li><nuxt-link @click="openBurgerMenu" to="/" :class="route=='/' ? 'header_nav_list_link_selected' : 'header_nav_list_link'">Accueil</nuxt-link></li>
                <li><nuxt-link @click="openBurgerMenu" to="/owner" :class="route=='/owner' ? 'header_nav_list_link_selected' : 'header_nav_list_link'">Qui suis-je?</nuxt-link></li>
                <li><nuxt-link @click="openBurgerMenu" to="/prices" :class="route=='/prices' ? 'header_nav_list_link_selected' : 'header_nav_list_link'">Tarifs</nuxt-link></li>
                <li><nuxt-link @click="openBurgerMenu" to="/blog" :class="route=='/blog' ? 'header_nav_list_link_selected' : 'header_nav_list_link'">Blog</nuxt-link></li>
                <li><nuxt-link @click="openBurgerMenu" to="/appointment" :class="route=='/appointment' ? 'header_nav_list_link_selected' : 'header_nav_list_link'">Prendre rendez-vous</nuxt-link></li>
                <li><nuxt-link @click="openBurgerMenu" to="/contact" :class="route=='/contact' ? 'header_nav_list_link_selected' : 'header_nav_list_link'">Contact</nuxt-link></li>
            </ul>
        </nav>
        <div @click="openBurgerMenu" class="header_burger">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </div>
    </header>
</template>

<script>

    export default {
        props: {
            route: {
                type: String,
                require: true
            }
        },
        data() {
            return {
                isMenuOpen : false,
                actualClass: 'header_nav',
                windowWidth: 0,
            }
        },
        methods: {
            openBurgerMenu() {

                //?Changement de la valeur du booléen isOpenMenu
                this.isMenuOpen = !this.isMenuOpen;

                //?Récupération de la largeur de la fenêtre du navigateur
                this.windowWidth = window.innerWidth;

                //?Actualisation de la valeur de actualClass
                if (this.windowWidth < 1210) {
                    if (this.isMenuOpen) {
                        this.actualClass = 'header_nav_open';
                    } else {
                        this.actualClass = 'header_nav_close';
                    }
                }
            },
            closeBurgerMenu() {
                //?Récupération de la largeur de la fenêtre du navigateur
                this.windowWidth = window.innerWidth;
                
                //?Actualisation de la valeur de actualClass
                if (this.windowWidth < 1210) {
                    if (this.isMenuOpen) {
                        this.actualClass = 'header_nav_close';
                    }
                }
            }
        },
    }
</script>

<style scoped>

    header {
        position: sticky;
        top: 0px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: calc(100%-4vw);
        height: var(--mobile-header-height);
        padding: 0 2vw;
        box-shadow: 0 4px 2px rgba(0, 0, 0, 0.25);
        background-color: white;
        z-index: 10;
    }

    .header_logo {
        display: flex;
        align-items: center;
        height: 100%;
        max-width: 90%;
    }

    .header_logo img {
        max-height: var(--mobile-header-height);
        max-width: 100%;
    }

    .header_burger {
        display: block;
    }

    .header_burger svg{
        stroke: #B05447;
        width: 5vh;
        height: 5vh;
    }
    .header_nav {
        display: none;
    }

    .header_nav_logo {
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 70%;
        margin-bottom: 5vh;
    }

    .header_nav_logo img {
        max-width: 90%;
        height: auto;
    }

    .header_nav_close {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: fixed;
        top: 15vh;
        right: 0;
        width: 100%;
        height: 85vh;
        background-color: #B05447;
        animation: closeMenu 300ms ease-in-out forwards;
    }

    .header_nav_open {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: fixed;
        top: 15vh;
        right: 0;
        width: 100%;
        height: 85vh;
        background-color: #B05447;
        animation: openMenu 300ms ease-in-out forwards;
    }

    .header_nav_list_link {
        text-decoration: none;
        color: #B05447;
        text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    }

    .header_nav_list_link_selected {
        color: #FFFFFF;
        text-decoration: none;
        text-shadow: 0 13px 13px rgba(0, 0, 0, 0.25);
    }

    .header_nav_list_link:visited {
        color: #B05447;
    }
    .header_nav_list_link:hover {
        animation: hoverText 300ms ease-in-out forwards;
    }

    .header_nav_list_link:active {
        animation: clickOnText 300ms ease-in-out forwards;
    }

    @keyframes openMenu {
        0% {
            transform: translateX(100%);
        }
        100% {
            transform: initial;
        }
    }

    @keyframes closeMenu {
        100% {
            transform: translateX(100%);
        }
        0% {
            transform: initial;
        }
    }

    .header_nav_list {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: 'La Belle Aurore', cursive;
        font-size: 2em;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .header_nav_list_link {
        margin-left: 0;
        color: #FFFFFF;
    }

    .header_nav_list_link:visited {
        color: #FFFFFF;
    }


    @media screen and (min-width: 1210px) {
        header {
            max-height: var(--computer-header-height);
        }
        .header_logo {
            max-width: 30%;
            max-height: 100%;
        }
        .header_logo img {
            max-height: var(--computer-header-height);
            max-width: 100%;
        }
        
        .header_nav {
            display: flex;
        }

        .header_nav_logo {
            display: none;
        }

        .header_nav_list {
            flex-direction: row;
            font-size: 1.5em;
        }

        .header_nav_list_link {
            color:#398C7E;
            margin-left: 2vw;
        }

        .header_nav_list_link_selected {
            color: #B05447;
            text-shadow: 0 13px 13px rgba(0, 0, 0, 0.25);
            margin-left: 3vw;
        }
        .header_nav_list_link:visited {
            color:#398C7E;
        }

        .header_burger {
            display: none;
        }
    }

    @media screen and (min-width: 1400px) {
        .header_nav_list {
            font-size: 2em;
        }

        .header_nav_list_link {
            color:#398C7E;
            margin-left: 3vw;
        }

        .header_nav_list_link_selected {
            color: #B05447;
            margin-left: 3vw;
        }
    }
</style>