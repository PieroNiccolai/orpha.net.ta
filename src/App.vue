<script setup lang="ts">
import DiseaseCard from './components/DiseaseCard.vue';
import { ref, onMounted ,watch} from 'vue';
import { parse } from 'csv-parse/browser/esm';
import orphanet from './assets/Orphanet.csv?raw'
import orphanetta from './assets/Orphanetta.csv?raw'
import AutoComplete from 'primevue/autocomplete';
import Button from 'primevue/button';

const selectedOrpha = ref<OrphaRow | null>(null); // Track the selected value
const rawOrpha = ref<OrphaRow[]>([]);
const orphanets = ref<OrphaRow[]>([]);
const rawOrphetta = ref<OrphanettaRow[]>([]);
const selectedOrphettas = ref<OrphanettaRow[]>([]); // Track the selected value
let isSubmitted=ref(false);

// Funzione per leggere il file Orphanet.csv
async function loadCSVOrphanet() {
  parse(orphanet, {
    columns: (header) => header.map((h:any) => h.replace(/^\uFEFF/, '')), // Rimuove il BOM    delimiter: ';', // Delimitatore predefinito
    delimiter: ';', // Delimitatore
    trim: true, // Rimuove spazi bianchi dai valori
  skip_empty_lines: true, // Salta le righe vuote
  relax_column_count: true // Permette righe con numero di colonne variabile
  }, (err, records: OrphaRow[]) => {
    if (err) {
      console.error('Error while parsing CSV:', err);
    } else {
      rawOrpha.value = records;
      console.log('Finished reading the file:', rawOrpha.value.length);
    }
  });
}


const search = (event:any) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
          orphanets.value = rawOrpha.value;
        } else {
          orphanets.value = rawOrpha.value.filter((row) => {
                return row.Conditions.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
}

// Funzione per leggere il file Orphanet.csv
async function loadCSVOrphanetta() {
  parse(orphanetta, {
    columns: (header) => header.map((h:any) => h.replace(/^\uFEFF/, '')),
    delimiter: ';', // Delimitatore
    trim: true, // Rimuove spazi bianchi dai valori
  skip_empty_lines: true, // Salta le righe vuote
  relax_column_count: true // Permette righe con numero di colonne variabile
  }, (err, records: OrphanettaRow[]) => {
    if (err) {
      console.error('Error while parsing CSV:', err);
    } else {
      rawOrphetta.value = records;
      console.log('Finished reading the file:', rawOrphetta.value.length);
    }
  });
}

onMounted(() => { loadCSVOrphanet(); loadCSVOrphanetta() })

function submitButton(){
  isSubmitted.value = true
  selectedOrphettas.value = rawOrphetta.value.filter((o:OrphanettaRow) => 
  o.Conditions?.trim().toLowerCase() === selectedOrpha.value?.Conditions.trim().toLowerCase()
);
console.log(selectedOrphettas.value)
};

watch(selectedOrpha,()=>{
  selectedOrphettas.value=[]
  isSubmitted.value=false;
})

</script>

<template>
  <div class="flex flex-col justify-center items-center bg-violet-600 text-white w-screen min-h-screen p-10">
    <p class="text-yellow-300 font-extrabold text-[150px]">ORPHA.NET.TA WEB</p>

    <div class="flex flex-col w-full justify-center items-center space-y-10 mt-10">
            <AutoComplete v-model="selectedOrpha" optionLabel="Conditions" :suggestions="orphanets" @complete="search" placeholder="Type or select a disease"/>
          <div v-if="selectedOrpha?.Conditions!=undefined" class="flex flex-col justify-center items-center text-white font-semibold p-10">
            <span>
              <p>{{ "Name: " + selectedOrpha?.Conditions }}</p>
              <p>{{ "Disease code from ICD-10: " + selectedOrpha?.['ICD-10'] }}</p>
              <p>{{ "Disease code from ICD-11: " + selectedOrpha?.['ICD-11'] }}</p>
            </span>
          </div>
          <Button type="submit" severity="secondary" label="Submit" v-on:click="submitButton()" />
      </div>

      <div v-if="selectedOrphettas.length > 0 && isSubmitted" key="element.index">
        <div v-for="element in selectedOrphettas" class="m-4">
          <DiseaseCard :element="element"/>
        </div>
      </div>
      <div v-else-if="selectedOrphettas.length == 0 && isSubmitted && selectedOrpha" class="flex font-extrabold text-center text-white mt-5">
        <span>No record found</span>
      </div>
    </div>
    

</template>

<style scoped>
</style>
