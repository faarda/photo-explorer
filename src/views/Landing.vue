<template>
  <div class="landing">
    <main>
        <section class="jumbotron">
            <div class="jumbotron__logo">
                <img src="@/assets/logo.png" alt="Photo explorer logo">
            </div>
            <div class="jumbotron__heading">
                <h1>Explore the best of photography</h1>
                <p class="lead-text">Start searching the photos you love</p>
            </div>

            <search-box></search-box>
        </section>
    </main>
  </div>
</template>

<script>
import searchBox from '@/components/SearchBox.vue';
export default {
    name: 'Landing',
    components: {
        searchBox
    }
}
</script>

<style>

</style>