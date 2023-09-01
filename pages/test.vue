<script setup>
    const { getValidatedArticles } = useArticle();
    const articles = await getValidatedArticles();
    console.log(articles);
</script>