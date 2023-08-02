<template>
    <div class="navigation_bar">
        <ul class="navigation_bar_list">
            <li>
                <nuxt-link to="/managerApp" :class="route=='/ManagerApp' ? 'navigation_bar_list_link_selected' : 'navigation_bar_list_link'">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>
                Accueil
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/managerApp/pages" :class="route=='/managerApp/pages' ? 'navigation_bar_list_link_selected' : 'navigation_bar_list_link'">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm18 3H3.75v9a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V9zm-15-3.75A.75.75 0 004.5 6v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75H5.25zm1.5.75a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V6zm3-.75A.75.75 0 009 6v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75H9.75z" clip-rule="evenodd" />
                    </svg>
                Pages
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/managerApp/moderation" :class="route=='/managerApp/moderation' ? 'navigation_bar_list_link_selected' : 'navigation_bar_list_link'">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5zm6.61 10.936a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                        <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                    </svg>

                Modération
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/managerApp/articles" :class="route=='/managerApp/articles' ? 'navigation_bar_list_link_selected' : 'navigation_bar_list_link'">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                    </svg>
                Articles
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/managerApp/categories" :class="route=='/managerApp/categories' ? 'navigation_bar_list_link_selected' : 'navigation_bar_list_link'">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
                    </svg>
                Catégories
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/managerApp/tiles" :class="route=='/managerApp/tiles' ? 'navigation_bar_list_link_selected' : 'navigation_bar_list_link'">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 011.5 10.875v-3.75zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 01-1.875-1.875v-8.25zM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 013 18.375v-2.25z" clip-rule="evenodd" />
                    </svg>
                Tuiles
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/managerApp/users" :class="route=='/managerApp/users' ? 'navigation_bar_list_link_selected' : 'navigation_bar_list_link'">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clip-rule="evenodd" />
                        <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                    </svg>
                Utilisateurs
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/" :class="route=='/' ? 'navigation_bar_list_link_selected' : 'navigation_bar_list_link'">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                    </svg>
                Déconnexion
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: {
            route: {
                type: String,
                require: true
            }
        },
    }
</script>
<style scoped>
    .navigation_bar {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 12vh;
        left: 0;
        width: 20vw;
        min-height: 88vh;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.7em;
    }

    .navigation_bar_list {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 2em;
        padding: 0;
        margin: 0;
        list-style: none;
        height: 50vh;
        width: 80%;
    }
    
    .navigation_bar_list_link {
        display: flex;
        flex-direction: row;
        align-items: center;
        text-decoration: none;
        color: #E04F5F;
        padding: 0.5vh 0.5vh;
        margin: 0.5vh 0.5vh;
        width: 14vw;
    }
    .navigation_bar_list_link:hover {
        border-radius: 3vh;
        background-color: #E04F5F;
        color: #FFFFFF;
    }
 
    .navigation_bar_list_link svg {
        stroke: #E04F5F;
        width: 4vh;
        height: 4vh;
        margin-right: 1vw;
    }

    .navigation_bar_list_link_selected {
        display: flex;
        flex-direction: row;
        align-items: center;
        text-decoration: none;
        color: #E04F5F;
        width: 14vw;
        border-radius: 3vh;
        padding: 0.5vh 0.5vh;
        margin: 0.5vh 0.5vh;
        background-color: #E04F5F;
        color: #FFFFFF;
        text-transform: none;
    }
    .navigation_bar_list_link_selected svg {
        stroke: #E04F5F;
        width: 4vh;
        height: 4vh;
        margin-right: 1vw;
    }
</style>