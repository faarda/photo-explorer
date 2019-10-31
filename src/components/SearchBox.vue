<template>
    <div class="search-box landing__search">
        <form @submit.prevent="runSearch">
            <input type="text" required v-model="keyword" class="search-box__input" name="keyword" id="" placeholder="Just type anything e.g cats">
            <button type="submit" class="search-box__submit"><span data-feather="search"></span></button>
        </form>
    </div> 
</template>

<script>

import {eventbus} from '../main';
export default {
    name: "SearchBox",
    props: {
        query: String
    },
    data: function(){
        return {
            keyword: "" 
        }
    },
    methods:{
        runSearch(){
            this.$router.push({path: '/results', query: {keyword: this.keyword}})
            eventbus.$emit('new-search', this.keyword );

        }
    },
    created(){
        if(typeof this.query !== 'undefined'){
            this.keyword = this.query;
        }
    }
}
</script>

<style>

</style>