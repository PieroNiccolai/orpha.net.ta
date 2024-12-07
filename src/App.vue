<script setup lang="ts">
import DiseaseCard from './components/DiseaseCard.vue';
import { ref, onMounted, watch } from 'vue';
import { parse } from 'csv-parse/browser/esm';
import orphanet from './assets/Orphanet.csv?raw'
import orphanetta from './assets/Orphanetta.csv?raw'
import AutoComplete from 'primevue/autocomplete';
import Button from 'primevue/button';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';

const elements = ref<OrphaRow[]>([]);
const orphanets = ref<OrphaRow[]>([]);
const orphanettas = ref<OrphanettaRow[]>([]);
let names:string[]=[]

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
      orphanets.value = records;
      records.forEach(r => {names.push(r['Conditions'])})
      console.log('Finished reading the file:', orphanets.value.length);
    }
  });
}


const search = (event:any) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            elements.value = orphanets.value;
        } else {
          elements.value = orphanets.value.filter((row) => {
                return row.Conditions.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
}

const resolver = ref(zodResolver(
    z.object({
        country: z.union([
            z.object({
                name: z.string().min(1, 'Country is required.')
            }),
            z.any().refine((val) => false, { message: 'Country is required.' })
        ])
    })
));

// Funzione per leggere il file Orphanet.csv
async function loadCSVOrphanetta() {
  parse(orphanetta, {
    columns: (header) => header.map((h:any) => h.replace(/^\uFEFF/, '')), // Rimuove il BOM    delimiter: ';', // Delimitatore predefinito
    delimiter: ';', // Delimitatore
    trim: true, // Rimuove spazi bianchi dai valori
  skip_empty_lines: true, // Salta le righe vuote
  relax_column_count: true // Permette righe con numero di colonne variabile
  }, (err, records: OrphanettaRow[]) => {
    if (err) {
      console.error('Error while parsing CSV:', err);
    } else {
      records.forEach((record) => {
        if(orphanets.value.map(v => v.Conditions).includes(record.Conditions)){
          orphanettas.value.push(record)
        }
      });
      records.forEach(r => {names.push(r['Conditions'])})
      console.log('Finished reading the file:', orphanettas.value.length);
    }
  });
}

onMounted(() => { loadCSVOrphanet(); })

watch(elements,() => {
  // loadCSVOrphanetta()
})

const onFormSubmit = () => {
    console.log("Letsggoooo")
};

</script>

<template>
  <div class="flex flex-col justify-items-center items-center bg-violet-600 text-white w-full h-full">
    <p>ORPHA.NET.TA</p>

    <div class="flex flex-row justify-center items-center space-x-5 mt-5">
      <div class="multiselect-container">
    <label for="diseaseName" class="custom-label">Enter disease name:</label>
  
   
    <Form v-slot="$form" :resolver="resolver" :initialValues="elements" @submit="onFormSubmit" class="flex justify-center flex-col gap-4 w-full md:w-56">
    <div class="flex flex-col gap-1">
      <AutoComplete
    v-model="elements"
    optionLabel="Conditions" :suggestions="orphanets" @complete="search" />
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>

  </div>
  
    </div>
    <DiseaseCard :elements="elements"/>
  </div>

</template>

<style scoped>
</style>
