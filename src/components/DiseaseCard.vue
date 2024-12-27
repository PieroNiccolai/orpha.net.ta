<script setup lang="ts">
defineProps<{
  element: OrphanettaRow;
}>();
</script>

<template>
    <div v-if="element" class="flex flex-col border-4 rounded-md border-black p-5">
      <div class="flex flex-col text-center text-lg font-semibold" >
        <span>
              <p v-if="element.Effects != '1' && element.Effects != '2' && element.Effects != '3' " >{{ "Effects: " + element?.Effects }}</p>
              <p v-else class="text-yellow-300 text-2xl" >{{ "Effects: " + element?.Effects }}</p>
              <p>{{ "Mutated: " + element?.Mutated }}</p>
              <p v-if="element?.PDB!=''">{{ "PBD: " + element?.PDB }}</p>
              <p v-else>Structure predicted by AlphaFold</p>
              <p>{{ "Position: " + element?.Position }}</p>
              <p>{{ "Residue: " + element?.Residue }}</p>
              <p>{{ "Uniprot: " + element?.Uniprot }}</p>              
        </span>
        <span v-if="element.Effects==='3'" class="text-yellow-300">
          <p>Mutations possibly inhibiting folding nucleus formation</p>
        </span>
        <span v-if="element.Effects==='2' || element.Effects==='1'" class="text-yellow-300">
          <p>Mutations possibly creating new surface cavities</p>
        </span>
      </div>
    </div>
</template>   