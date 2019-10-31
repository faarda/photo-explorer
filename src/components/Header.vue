<template>
      <header class="header">
        <div class="header__main">
            <div class="header__logo">
                <img src="@/assets/logo.png" alt="Photo explorer logo">
            </div>
            <div class="header__search">
                <search-box></search-box>
            </div>
        </div>
        <div class="header__sub" v-if="hasQuery">
            <p class="results__text">Search results for: {{searchTerm}}</p>
            <div class="results__action">
                <div class="sort-results">
                    <a>
                        <span data-feather="sliders"></span> <span class="h-sm">Sort by views</span>
                    </a>
                </div>
                <div class="pagination">
                    <div class="wrapper">
                        Page 1: <button class="pagination__btn" @click="previous" :disabled="navData.previous"><span data-feather="chevron-left"></span></button>
                        <button class="pagination__btn" @click="next" :disabled="navData.next"><span data-feather="chevron-right"></span></button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import searchBox from '@/components/SearchBox.vue';
export default {
    name: "Header",
    props: {
        searchTerm: String,
        navData: Object,
        hasQuery: Boolean
    },
    components: {
        searchBox
    },
    methods: {
        previous(){
            this.$emit('previous');
        },
        next(){
            this.$emit('next');
        }
    }
}
</script>

<style>

</style>