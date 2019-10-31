<template>
    <div class="results">
        <app-header @next="nextResults" @previous="previousResults" @sort="sortPhotos" :page="page" :nav-data="navData" :search-term="searchTerm" :has-query="hasQuery"></app-header>
        <main-results :photos="photos" :status="status"></main-results>

        <image-modal></image-modal>
    </div>
</template>

<script>
import appHeader from "@/components/Header.vue";
import mainResults from '@/components/MainResults.vue';
import imageModal from '@/components/ImageModal.vue';
import { eventbus } from '../main';
export default {
    name: "Results",
    components: {
        appHeader,
        mainResults,
        imageModal
    },
    data: function(){
        return {
            searchTerm: "",
            navData: {
                next: false,
                previous: false
            },
            photos: [],
            status: "loading", //loading
            perPage: 20,
            page: 1,
            next: "",
            sortBy: "d"
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
            this.page = this.page + 1;
            this.getPhotos();
        },

        previousResults(){
            this.page = this.page - 1;

            if(this.page < 1){
                this.page = 1;
            }

            if(this.page == 1){
                this.navData.previous = false;
            }

            this.displayPhotos();
        },

        getPhotos(){
            this.status = "loading";
            this.$store.dispatch('fetchData', {address: `https://api.pexels.com/v1/search?query=${this.searchTerm}&per_page=${this.perPage}&page=${this.page}`})
                .then(data => {
                    let mainData = data.data;

                    if(mainData.total_results < 1){
                        this.status = "nothing";
                        return;
                    }
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
                    id: id + (this.page * 20 - 20),
                    photo: val.src.medium,
                    views: Math.floor((Math.random() * 1000) + 1)
                }
            });

            this.photos = photosToShow;
            this.status = "done";
        },
        sortPhotos(){
            let sortBy = this.sortBy;

            if(sortBy == "d"){
                this.photos.sort((a,b) => (a.views > b.views) ? -1 : ((b.views > a.views) ? 1 : 0));
                this.sortBy = "a"; 
            }else{
                this.photos.sort((a,b) => (a.views > b.views) ? 1 : ((b.views > a.views) ? -1 : 0));
                this.sortBy = "d"; 
            }
        }
    },
    watch: {
        searchTerm(newVal, oldVal){
            if(oldVal !== ""){
                this.page = 1;
                this.$store.commit('EMPTY_PHOTOS');
                this.getPhotos();
            }
        }
    }
}
</script>

<style>

</style>