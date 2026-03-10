<script setup lang="ts">
  import { computed } from 'vue';
  import IconCloud from './icon-components/weather/IconCloud.vue';
  import IconRain from './icon-components/weather/IconRain.vue';
  import IconSun from './icon-components/weather/IconSun.vue';

  const { weatherCode, temp, date, isActive } = defineProps<{
    weatherCode: number;
    temp: number;
    date: Date;
    isActive: boolean;
  }>();

  const iconColor = computed(() => {
    return isActive ? 'var(--color-primary-inverted)' : 'var(--color-primary)';
  });
</script>
<template>
  <button
    class="flex w-full min-w-0 flex-1 cursor-pointer flex-col items-center justify-center gap-[clamp(8px,1.5vw,15px)] rounded-[clamp(8px,2vw,10px)] border-0 bg-(--color-bg-card) p-[clamp(12px,2.5vw,20px)_clamp(10px,2vw,24px)] text-(--color-primary) shadow-[1px_2px_4px_0px_#222831]"
    :class="
      isActive
        ? 'bg-(--color-primary) text-(--color-primary-inverted) hover:bg-(--color-primary)'
        : 'hover:bg-[#3a434f]'
    "
  >
    <IconSun v-if="weatherCode <= 1003" :color="iconColor" />
    <IconCloud v-if="weatherCode >= 1006 && weatherCode < 1063" :color="iconColor" />
    <IconRain v-if="weatherCode >= 1063" :color="iconColor" />
    <div class="text-[clamp(14px,3.5vw,20px)]">
      {{ date.toLocaleDateString('ru-RU', { weekday: 'short' }) }}
    </div>
    <div class="text-[clamp(14px,3.5vw,20px)] font-bold">{{ temp }} °C</div>
  </button>
</template>
