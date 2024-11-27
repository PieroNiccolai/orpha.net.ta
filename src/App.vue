<script setup lang="ts">
import DiseaseCard from './components/DiseaseCard.vue';

let name=''
</script>

<template>
  <div class="flex flex-col justify-items-center items-center bg-violet-950 text-white w-full h-full">
    <div class="flex flex-row justify-center items-center space-x-5 mt-5">
    <div class="flex flex-col text-black">
      <input v-model="name" type="text" name="Disease name" id="disease_name">
    </div>
    <div v-if="name.length>0" class="flex flex-col text-black">
      <input type="text" name="Disease name" id="disease_name">
    
  </div>

</div>
    
    <DiseaseCard/>
  </div>
  
</template>

<style scoped>
</style>
