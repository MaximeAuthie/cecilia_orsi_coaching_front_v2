<template>
    <div class="tag_div" :style="{backgroundColor: color, borderColor: color}">
        <div class="tag_title">
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