<template>
    <div class="result__image" @click="$emit('showFullImage', photo.id)">
        <img :src="photo.photo" alt="">
    </div>
</template>

<script>
export default {
    name: "ResultImage",
    props: {
        photo: Object
    }
}
</script>

<style>

</style>
