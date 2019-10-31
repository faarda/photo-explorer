<template>
      <div class="modal-container" id="modal">
        <div class="image-modal">
            <span class="image-modal__close" @click="closeModal"><span data-feather="x"></span></span>
            <div class="image-modal__body">
                <div class="image-modal__image">
                    <img src="@/assets/loading.gif" alt="loading..." v-if="!imageLoaded">
                    <img :src="photoData.src" @load="imageLoaded = true" class="photo" alt="loading.." v-show="imageLoaded">
                </div>
                <div class="image-modal__meta">
                    <div class="authour">
                        <div class="authour__image">
                            <img src="@/assets/avatar.png" alt="">
                        </div>
                        <div class="authour__details">
                            <h4>{{photoData.photographer}}</h4>
                            <span>Photographer</span>
                        </div>
                    </div>
                    <a download target="_blank" :href="photoData.download" class="download">Download&nbsp;&nbsp;&nbsp;&nbsp;<span data-feather="download"></span></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {eventbus} from '../main';
export default {
    name: "ImageModal",
    data: function(){
        return {
            id: null,
            photoData: {},
            modal: null,
            imageLoaded: false
        }
    },
    mounted(){
        this.modal = document.getElementById("modal");
        eventbus.$on('show-full-image', payload => {
            this.id = payload;
            let mainPhoto = this.$store.state.photos[payload];

            this.photoData = {
                src: mainPhoto.src.large,
                download: mainPhoto.src.original,
                photographer: mainPhoto.photographer
            }

            this.modal.style.display = 'block';
            this.imageLoaded = false;
        });

        feather.replace();
    },
    methods: {
        closeModal(){
            this.modal.style.display = 'none';
        }
    }
}
</script>

<style>
    .download .feather{
        margin-left: 5px;
    }
</style>