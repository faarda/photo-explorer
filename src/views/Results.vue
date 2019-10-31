<template>
    <div class="results">
        <app-header @next="nextResults" @previous="previousResults" :nav-data="navData" :search-term="searchTerm" :has-query="hasQuery"></app-header>
        <main-results :photos="photos" :status="status"></main-results>
    </div>
</template>

<script>
import appHeader from "@/components/Header.vue";
import mainResults from '@/components/MainResults.vue';
import { eventbus } from '../main';
export default {
    name: "Results",
    components: {
        appHeader,
        mainResults
    },
    data: function(){
        return {
            searchTerm: "",
            navData: {
                next: true,
                previous: false
            },
            photos: [],
            status: "loading", //loading
            perPage: 20,
            page: 1,
            next: ""
        }
    },
    created(){
        let urlParams = new URLSearchParams(window.location.search);

        if(urlParams.has('keyword')){
            this.searchTerm = urlParams.get('keyword');
            this.getPhotos();
        }else{
            this.status = "no-query";
        }

        eventbus.$on('new-search', data => {
            this.searchTerm = data;
        });
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
        },

        getPhotos(){
            this.status = "loading";
            this.$store.dispatch('fetchData', {address: `https://api.pexels.com/v1/search?query=${this.searchTerm}&per_page=${this.perPage}&page=${this.page}`})
                .then(data => {
                    let mainData = data.data;
                    let photos = mainData.photos;

                    // adds the photos to the state
                    this.$store.commit('ADD_PHOTOS', photos);

                    let next = mainData.next_page;
                    // set details for next page
                    if(typeof next !== 'undefined'){
                        this.next = next;
                        this.navData.next = true;
                    }

                    // set details for previous page
                    if(this.page > 1){
                        this.navData.previous = true;
                    }

                    this.displayPhotos();
                })
                .catch(error => {
                    console.log(error);
                })
        },
        displayPhotos(){
            let page = this.page;

            let photos = this.$store.state.photos;

            let currentPhotos = photos.slice((page*20 - 20), (page*20));

            // create an array of only medium photo url's
            let photosToShow = currentPhotos.map((val, id) => {
                return {
                    id: id,
                    photo: val.src.medium
                }
            });

            this.photos = photosToShow;
            this.status = "done";
        }
    },
    watch: {
        searchTerm(newVal, oldVal){
            // this.status = "loading";
        }
    }
}
</script>

<style>

</style>