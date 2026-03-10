<script setup lang="ts">
  const data = defineModel<string>({ required: true, default: '' });
</script>

<template>
  <input v-model="data" class="input" />
</template>

<style scoped>
  .input {
    color: var(--color-primary);
    width: 100%;
    min-width: 0;
    max-width: 260px;
    border-radius: 10px;
    height: 53px;
    border: none;
    padding: 15px 20px;
    font-size: clamp(16px, 4vw, 18px);
    background: var(--color-bg-card);
    box-shadow: 1px 2px 4px 0px var(--color-bg-main);
    box-sizing: border-box;
  }
  .input::placeholder {
    color: var(--color-text-placeholder);
  }
</style>
