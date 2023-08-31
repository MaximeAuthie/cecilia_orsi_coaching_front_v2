<template>
    <div @click="clickOn" @mouseover="overOn" @mouseout="overOff" class="tag_div" :style="{backgroundColor: isClicked || isHover ? color : '#FFFFFF', borderColor: color}">
        <div class="tag_title" :style="{color: isClicked || isHover ? '#FFFFFF' : color}">
            {{ name }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            name: {
                type:       String,
                required:   true
            },
            color: {
                type:       String,
                required:   true
            },
        },
        emits : ['select'],
        data() {
            return {
                isClicked:  false,
                isHover:    false,
            }
        },
        methods : {

            //! Emettre un évènement au composant parent pour lui signifier le choix d'une catégorie par l'utilisateur
            clickOn() {
                this.isClicked =! this.isClicked;
                this.$emit('select', this.name, this.isClicked);
            },

            //! Changer la valeur de this.isHover au survol de la catégorie
            hoverOn() {
                this.isHover = true;
            },

            //! Changer la valeur de this.isHover à la fin du survol de la catégorie
            hoverOff() {
                this.isHover = false;
            }


        }
    }
</script>

<style scoped>
    .tag_div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 160px;
        height: 50px;
        border-style: solid;
        border-radius: 30px;
        margin: 0.5vw;
        cursor: pointer;
        z-index: 3;
    }
    .tag_title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font-family: 'Playfair', serif;
        font-size: 1.5em;
    }

    @media screen and (min-width: 1210px) {
        .tag_div {
            width: 160px;
            height: 35px;
            margin: 0.25vw;
        }
    }

</style>