<template>
    <div @click="selectCategory" class="tag_div" :style="{backgroundColor: color, borderColor: color}">
        <div class="tag_title">
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
        emits: ['selectCategory'],
        methods : {

            //! Emettre un évènement au composant parent pour lui signifier le choix d'une catégorie par l'utilisateur
            selectCategory() {
                this.$emit('selectCategory', name);
            }
        }
    }
</script>

<style scoped>
    .tag_div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90px;
        height: 25x;
        border-style: solid;
        border-radius: 30px;
        margin: 3px;
        z-index: 3;
    }
    .tag_title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font-family: 'Playfair', serif;
        font-size: 1em;
        color: #FFFFFF;
    }

</style>