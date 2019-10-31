<template>
    <div class="result__image" @click="showFullImage">
        <img :src="photo.photo" alt="">
    </div>
</template>

<script>
import { eventbus } from "../main";
export default {
    name: "ResultImage",
    props: {
        photo: Object
    },
    methods: {
        showFullImage(){
            eventbus.$emit('show-full-image', this.photo.id);
        }
    }
}
</script>

<style>

</style>
