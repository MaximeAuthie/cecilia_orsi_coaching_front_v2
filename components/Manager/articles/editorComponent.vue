<template>
    <div class="editor_card">
        <div class="editor_card_controls">
            <button @click="editor.chain().focus().toggleBold().run()" class="editor_card_controls_button">B</button>
            <button @click="editor.chain().focus().toggleItalic().run()" class="editor_card_controls_button">I</button>
            <button @click="editor.chain().focus().toggleUnderline().run()" class="editor_card_controls_button">U</button>
            <button @click="editor.chain().focus().toggleBulletList().run()" class="editor_card_controls_button">li</button>
            <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" class="editor_card_controls_button">H1</button>
            <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" class="editor_card_controls_button">H2</button>
            <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" class="editor_card_controls_button">H3</button>
        </div>
        <div class="editor_card_input">
            <editor-content :editor="editor" />
        </div>
        
    </div>
    
</template>

<script>
    import { Editor, EditorContent } from '@tiptap/vue-3'
    import StarterKit from '@tiptap/starter-kit';
    import Heading from '@tiptap/extension-heading';
    import ListItem from '@tiptap/extension-list-item';

    export default {
        components: {
            EditorContent,
        },

        props: {
            modelValue: {
                type: String,
                default: '',
            },
        },

        data() {
            return {
                editor: null,
            }
        },
        watch: {
            modelValue(value) {
            
            const isSame = this.editor.getHTML() === value

            if (isSame) {
                return
            }

            this.editor.commands.setContent(value, false)
            },
        },


        mounted() {
            this.editor = new Editor({
                content: this.modelValue,
                extensions: [
                    StarterKit,
                    ListItem,
                    Heading.configure({
                        levels: [1, 2, 3],
                    }),
                ],
                onUpdate: () => {
                    this.$emit('update:modelValue', this.editor.getHTML())
                },
                editorProps: {
                    attributes: {
                        class: 'ProseMirror',
                    },
                },
            })
        },

        beforeUnmount() {
            this.editor.destroy()
        },
    }
</script>

<style scoped>
    .editor_card_input {
        
        border: #C6C5C5 solid 1px;
        border-radius: 10px;
        background-color: #FFFFFF;
        margin-top: 1vh;
        min-height: 50vh;
    }
    .editor_card_controls {
        border: #C6C5C5 solid 1px;
        border-radius: 10px;
        background-color: #FFFFFF;
        padding: 0.5vh;
    }
    .editor_card_controls_button {
        width: 2vw;
        margin-right: 0.5vw;
        border-radius: 0.4vw;
        border: solid 1px #E04F5F;
        color: #E04F5F;
    }
    .editor_card_controls_button:hover {
        background-color: #E04F5F;
        color: #FFFFFF;
    }
</style>