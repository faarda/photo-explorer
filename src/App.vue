<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>

</style>

<script>
export default {
  mounted(){
    feather.replace();
  }
}
</script>