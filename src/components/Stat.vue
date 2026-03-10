<script setup lang="ts">
  const { label = 'Не задан', stat } = defineProps<{
    label: string;
    stat: string;
  }>();
</script>

<template>
  <li class="stat">
    <span class="stat-name">{{ label }}</span>
    <span class="stat-value">{{ stat }}</span>
  </li>
</template>

<style scoped>
  .stat {
    font-size: clamp(16px, 4vw, 28px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }
  .stat-name {
    font-weight: 700;
    text-transform: uppercase;
  }
  .stat-value {
    font-weight: 500;
    white-space: nowrap;
  }
</style>
