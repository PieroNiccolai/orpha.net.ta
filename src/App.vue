<script setup lang="ts">
import DiseaseCard from './components/DiseaseCard.vue';
import FilterContainer from './components/FilterContainer.vue';
</script>

<template>
  <div class="flex flex-col justify-items-center bg-violet-950 text-white w-full h-full">
    <DiseaseCard/>
    <FilterContainer/>
  </div>
  
</template>

<style scoped>
</style>
