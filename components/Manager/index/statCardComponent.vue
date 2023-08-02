<template>
    <div class="stat_card" :style="{borderColor: color}">
        <div class="stat_card_header" :style="{backgroundColor: color, borderColor: color}">
            {{ title }}
        </div>
        <div class="stat_card_content">
            {{ content }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }
}
</script>
<style scoped>
    .stat_card {
        display: flex;
        flex-direction: column;
        width: 22vw;
        height: 25vh;
        border: 1px solid;
        border-radius: 1vh;
        background-color: #FFFFFF;
        overflow: hidden
    }

    .stat_card_header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        border: 1px solid;
        font-size: 1.8em;
        color: #FFFFFF;
        padding: 1vh 0;
    }

    .stat_card_content {
        flex: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 3em;
    }
</style>