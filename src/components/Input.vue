<script setup lang="ts">
  const data = defineModel<string>({ required: true, default: '' });
</script>

<template>
  <input
    v-model="data"
    class="h-13.25 w-full max-w-65 min-w-0 rounded-[10px] border-0 bg-(--color-bg-card) px-5 py-3.75 text-[clamp(16px,4vw,18px)] text-(--color-primary) shadow-[1px_2px_4px_0px_var(--color-bg-main)] placeholder:text-(--color-text-placeholder)"
  />
</template>
