<script setup lang="ts">
  const { error } = defineProps<{ error: String }>();
</script>

<template>
  <div v-if="error" class="error">{{ error }}</div>
</template>

<style scoped>
  .error {
    font-size: 18px;
    padding: 15px;
    text-align: center;
    background: var(--color-bg-card);
    margin: auto;
  }
  @media (max-width: 768px) {
    .error {
      margin-bottom: 20px;
    }
  }
</style>
