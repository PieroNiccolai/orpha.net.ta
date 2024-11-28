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

const name = ref(null);
const results = ref<OrphaRow[]>([]);
let names:string[]=[]

// Funzione per leggere il file CSV
async function loadCSV() {

  parse(csvData, {
    columns: (header) => header.map((h:any) => h.replace(/^\uFEFF/, '')), // Rimuove il BOM    delimiter: ';', // Delimitatore predefinito
    delimiter: ';', // Delimitatore
    trim: true, // Rimuove spazi bianchi dai valori
  skip_empty_lines: true, // Salta le righe vuote
  relax_column_count: true // Permette righe con numero di colonne variabile
  }, (err, records: OrphaRow[]) => {
    if (err) {
      console.error('Error while parsing CSV:', err);
    } else {
      results.value = records;
      records.forEach(r => {names.push(r['Conditions'])})
      console.log('Finished reading the file:', results.value.length);
    }
  });
}

onMounted(() => { loadCSV(); })

watch(name, () => { })

</script>

<template>
  <div class="flex flex-col justify-items-center items-center bg-violet-950 text-white w-full h-full">
    <p>ORPHA.NET.TA</p>

    <p></p>

    <div class="flex flex-row justify-center items-center space-x-5 mt-5">
      <div class="multiselect-container">
    <label for="diseaseName" class="custom-label">Enter disease name:</label>
    <Multiselect class="text-black"
    id="diseaseName"
      v-model="name"
      :options="names"
      :searchable="true"
      :placeholder="'' "
    />
  </div>
      <!--<div v-show="name.length > 5" class="flex flex-col text-black">
        <input type="text" name="Number" id="number">
      </div>-->
    </div>

    <DiseaseCard />
  </div>

</template>

<style scoped>
/* Set custom label width and ensure proper alignment */
.custom-label {
  display: block;
  width: 300px; /* Adjust this value as needed */
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
}

/* Optional: Adjust multiselect width to align with label */
.multiselect-container .multiselect {
  width: 400px; /* Adjust width of multiselect */
}

.multiselect-container .multiselect__content-wrapper {
  display: block !important; /* Forza la visualizzazione delle opzioni */
  position: relative; /* Mantiene le opzioni dentro al layout */
  max-height: none !important; /* Permette di mostrare tutte le opzioni */
  visibility: visible !important; /* Evita che il menu scompaia */
}
</style>
