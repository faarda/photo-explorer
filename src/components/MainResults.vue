<template>
    <main>
        <div class="container">
            <div class="pull-up" v-if="status == 'no-query'">
                <h4>Please type a query in the search bar above</h4>
            </div>
            <div class="pull-up" v-if="status == 'nothing'" style="margin-top: -15px;">
                <h4>There are no results for your search</h4>
            </div>
            <div class="loading" v-else-if="status == 'loading'">
                <p>
                    <img src="@/assets/loading.gif" alt="">
                </p>
            </div>
            <div class="results__main" v-else-if="status == 'done'">
                <result-image v-for="(photo, id) in photos" :key="id" :photo="photo"></result-image>
            </div>
        </div>
    </main>
</template>

<script>
import resultImage from '@/components/ResultImage.vue';
export default {
    name: "MainResult",
    props: {
        status: String,
        photos: Array
    },
    components: {
        resultImage
    }
}
</script>

<style>
    .pull-up{
        margin-top: -50px;
        text-align: center;
        display: block;
        padding: 10px;
    }

    .loading{
        text-align: center;
        padding: 10px;
    }
</style>