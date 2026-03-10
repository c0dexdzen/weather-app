<script setup lang="ts">
  const { error } = defineProps<{ error: String }>();
</script>

<template>
  <div v-if="error" class="m-auto mb-5 bg-(--color-bg-card) p-3.75 text-center text-[18px] md:mb-0">
    {{ error }}
  </div>
</template>
