<template>
    <div class="comment_card" :style="{borderColor: isValidated ? '#7DD274' : '#E04F5F'}">
        <div class="comment_card_header" :style="{backgroundColor : isValidated ? '#7DD274' : '#E04F5F', borderColor: isValidated ? '#7DD274' : '#E04F5F'}">
            Article : {{ title }} {{ isValidated? "(validé)" : "(rejeté)" }}
        </div>
        <div class="comments_card_content">
            <div class="comments_card_content_top">
                <div class="comments_card_content_top_informations">
                    De {{ author }} - le {{ dateTime }}
                </div>
                <div class="comments_card_content_top_validation">
                    <svg @click="validateComment" class="comments_card_content_top_validation_validate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#7DD274" >
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                    </svg>
                    <svg @click="rejectComment" class="comments_card_content_top_validation_reject" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#E04F5F">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <div class="comments_card_content_bottom">
                {{ content }}
            </div>
        </div>
    </div>
</template>

<script>
    import { useCommentsStore } from '@/store/comment';

    export default {
        props: {
            id: {
                type:       Number,
                required:   true
            },
            title : {
                type:       String,
                required:   true
            },
            author : {
                type:       String,
                required:   true
            },
            dateTime : {
                type:       String,
                required:   true
            },
            content : {
                type:       String,
                required:   true
            },
            isValidated : {
                type:       Boolean,
                required:   true
            }
        },
        data() {
            return {
                comments: []
            }
        },
        methods: {
            async validateComment() {

                let body = {
                    commentId:  this.id,
                    userId:     1
                }

                body = JSON.stringify(body);
                console.log(body);
                await fetch('https://127.0.0.1:8000/api/comment/validate', {
                        method:'PATCH',
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        },
                        body: body
                    })
                    .then(async response => {
                        this.updateStore();
                    })

            },
            async rejectComment() {

                let body = {
                    commentId:  this.id,
                    userId:     1
                }

                body = JSON.stringify(body);
                console.log(body);
                await fetch('https://127.0.0.1:8000/api/comment/reject', {
                        method:'PATCH',
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        },
                        body: body
                    })
                    .then(async response => {
                        this.updateStore();
                    })

            },
            updateStore() {
                const store = useCommentsStore();
                store.getCommentsToValidate();
                store.getValidatedComments();
            }
        }
    }
</script>
<style scoped>
    .comment_card {
        display: flex;
        flex-direction: column;
        width: 90%;
        border: 1px solid #E04F5F;
        border-radius: 1vh;
        background-color: #FFFFFF;
        margin-top: 5vh;
        overflow: hidden
    }

    .comment_card_header {
        position: relative;
        width: 100%;
        border: 1px solid #E04F5F;
        font-size: 1.8em;
        color: #FFFFFF;
        background-color: #E04F5F;
        text-align: center;
        padding: 1vh 0;
    }
    .comments_card_content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 3em;
    }
    .comments_card_content svg {
        width: 5vh;
        height: 5vh;
    }

    .comments_card_content_top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 95%;
        padding-top: 1vh;
        font-size: 0.55em;
        font-weight: bold;
    }

    .comments_card_content_bottom {
        width: 95%;
        font-size: 0.5em;
        margin: 2vh 0;
    }

    .comments_card_content_top_validation_validate {
        cursor: pointer;
    }

    .comments_card_content_top_validation_reject {
        cursor: pointer;
    }
</style>