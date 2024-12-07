<script setup lang="ts">
defineProps<{
  elements: OrphaRow[];
}>();
</script>

<template>
    <div v-if="elements" class="flex flex-col">

      <div v-for="e in elements">
        <span>{{ e.Conditions }}<br/>
        {{ e['ICD-10'] }}<br/>
        {{ e['ICD-11'] }}</span>
      </div>
    </div>
</template>   