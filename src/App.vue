<script setup lang="ts">
import DiseaseCard from './components/DiseaseCard.vue';
import { ref, watch, onMounted } from 'vue';
import { parse } from 'csv-parse/browser/esm';
import csvData from './assets/Orphanet.csv?raw'
import Multiselect from 'vue-multiselect';

interface OrphaRow {
  Conditions: string;
  "ICD-10": string;
  "ICD-11": string;
}

const name = ref<string>('');
const results = ref<OrphaRow[]>([]);
let names:string[]=[]

// Funzione per leggere il file CSV
async function loadCSV() {

  parse(csvData, {
    columns: true, // Interpreta la prima riga come intestazioni
    delimiter: ';', // Delimitatore predefinito
  }, (err, records: OrphaRow[]) => {
    if (err) {
      console.error('Error while parsing CSV:', err);
    } else {
      results.value = records;
      results.value.forEach(r => names.push(r.Conditions))
      console.log(names)
      console.log('Finished reading the file:', results.value);
    }
  });
}

onMounted(() => { loadCSV(); })

watch(name, () => { })

</script>

<template>
  <div class="flex flex-col justify-items-center items-center bg-violet-950 text-white w-full h-full">
    <p>ORPHA.NET.TA</p>

    <p>Enter name of rare diseases</p>

    <div class="flex flex-row justify-center items-center space-x-5 mt-5">
      <div class="flex flex-col text-black">
        <!-- <input v-model="name" type="text" name="Disease name" id="disease_name">-->
        <Multiselect v-model="name" :options="names" label="Select a disease"
          :searchable="true" />

      </div>
      <!--<div v-show="name.length > 5" class="flex flex-col text-black">
        <input type="text" name="Number" id="number">
      </div>-->
    </div>

    <DiseaseCard />
  </div>

</template>

<style scoped></style>
