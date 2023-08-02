<template>
    <div class="comments_display_div" :key="id">
        <div class="comment_display_div_informations">
            {{ authorName }} - le {{ date }}
        </div>
        <div class="comment_display_div_content">
            {{ content }}
        </div>
    </div>
</template>

<script lang="ts">

    export default {
        props: {
            id: {
                type:       Number,
                required:   true
            },
            authorName: {
                type:       Number,
                required:   true
            },
            date: {
                type:       Date,
                required:   true
            },
            content: {
                type:       String,
                required:   true
            }
        }
    }

</script>

<style scoped>
    .comments_display_div {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        background-color: #F9F9F9;
        border-radius: 5px;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        margin-left: auto;
        margin-right: auto;
        margin-top: 1vh;
        margin-bottom: 1vh;
    }
    .comment_display_div_informations {
        width: 90%;
        color: #398C7E;
        font-weight: 600;
        margin-top: 0.5vh;
    }

    .comment_display_div_content {
        width: 90%;
        margin: 1vh 0;
        font-weight: 300;
    }

    @media screen and (min-width: 1210px) {
        .comments_display_div {
            width: 900px;
        }
    }

</style>