<template>
    <div @click="clickOn" @mouseover="overOn" @mouseout="overOff" class="tag_div" :style="{backgroundColor: isClicked || isOver ? color : '#FFFFFF', borderColor: color}">
        <div class="tag_title" :style="{color: isClicked || isOver ? '#FFFFFF' : color}">
            {{ name }}
        </div>
    </div>
</template>

<script lang="ts">
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
        data() {
            return {
                isClicked:  false,
                isOver:    false,
            }
        },
        methods : {
            clickOn() {
                this.isClicked =! this.isClicked;
            },
            overOn() {
                this.isOver = true;
            },
            overOff() {
                this.isOver = false;
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