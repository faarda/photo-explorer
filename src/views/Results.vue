<template>
    <div class="results">
        <app-header @next="nextResults" @previous="previousResults" :nav-data="navData" :search-term="searchTerm" :has-query="hasQuery"></app-header>
    </div>
</template>

<script>
import appHeader from "@/components/Header.vue";
// import { URLSearchParams } from 'url';
export default {
    name: "Results",
    components: {
        appHeader
    },
    data: function(){
        return {
            searchTerm: "",
            navData: {
                next: true,
                previous: false
            }
        }
    },
    created(){
        let urlParams = new URLSearchParams(window.location.search);

        if(urlParams.has('keyword')){
            this.searchTerm = urlParams.get('keyword');
        }
    },
    mounted(){
        feather.replace();
    },
    computed: {
        hasQuery(){
            return this.searchTerm !== "";
        }
    },
    methods: {
        nextResults(){
            alert("Next result");
        },

        previousResults(){
            alert("Previous Results");
        }
    }
}
</script>

<style>

</style>