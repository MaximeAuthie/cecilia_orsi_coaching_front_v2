<template>
    <header>
        <div class="header_logo">
            <nuxt-link to="/">
                <img src="~/assets/images/logo_header.png" alt="Cécilia Orsi Coaching">
            </nuxt-link>
        </div>
        <div v-if="isUserLogedIn" class="header_avatar">
            <nuxt-link to="/managerApp/myAccount">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clip-rule="evenodd" />
                </svg>
            </nuxt-link>
        </div>
    </header>
</template>
<script>
    import { useUsersStore } from "@/store/user";

    export default {
        data() {
            return {
                isUserLogedIn : false
            }
        },
        mounted() {
            
            //? Importer le store useUsersStore
            const userStore = useUsersStore();
            
            //? Vérifier si l'utilisateur est connecter pour afficher l'accès à myAccount ou non
            if (userStore.token != "") {
                this.isUserLogedIn = true;
            } else {
                this.isUserLogedIn = false;
            }
        }
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
        width: 5vh;
        height: 5vh;
    }

    .header_avatar svg {
        fill: #4B453F;
    }

    .header_avatar svg:hover {
        fill: #E04F5F;
        cursor: pointer;
    }
    </style>