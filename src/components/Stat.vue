<script setup lang="ts">
  const props = defineProps<{
    label?: string;
    stat: string;
  }>();
</script>

<template>
  <li class="flex items-center justify-between gap-3 text-[clamp(16px,4vw,28px)]">
    <span class="font-bold uppercase">{{ props.label ?? 'Не задан' }}</span>
    <span class="font-medium whitespace-nowrap">{{ props.stat }}</span>
  </li>
</template>
