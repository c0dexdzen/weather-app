<script setup>
  import { computed } from 'vue';
  import IconCloud from './icon-components/weather/IconCloud.vue';
  import IconRain from './icon-components/weather/IconRain.vue';
  import IconSun from './icon-components/weather/IconSun.vue';

  const { weatherCode, temp, date, isActive } = defineProps({
    weatherCode: Number,
    temp: Number,
    date: Date,
    isActive: Boolean,
  });

  const iconColor = computed(() => {
    return isActive ? 'var(--color-primary-inverted)' : 'var(--color-primary)';
  });
</script>
<template>
  <button class="day-card" :class="{ active: isActive }">
    <IconSun v-if="weatherCode <= 1003" :color="iconColor" />
    <IconCloud v-if="weatherCode >= 1006 && weatherCode < 1063" :color="iconColor" />
    <IconRain v-if="weatherCode >= 1063" :color="iconColor" />
    <div class="day-card__day">
      {{ date.toLocaleDateString('ru-RU', { weekday: 'short' }) }}
    </div>
    <div class="day-card__temp">{{ temp }} °C</div>
  </button>
</template>

<style scoped>
  .day-card {
    width: 100%;
    min-width: 0;
    border-radius: clamp(8px, 2vw, 10px);
    box-shadow: 1px 2px 4px 0px #222831;
    color: var(--color-primary);
    padding: clamp(12px, 2.5vw, 20px) clamp(10px, 2vw, 24px);
    background-color: var(--color-bg-card);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: clamp(8px, 1.5vw, 15px);
    border: none;
    cursor: pointer;
    flex: 1;
  }

  .active {
    background-color: var(--color-primary);
    color: var(--color-primary-inverted);
  }

  .day-card:not(.active):hover {
    background-color: #3a434f;
  }

  .day-card__day {
    font-size: clamp(14px, 3.5vw, 20px);
  }

  .day-card__temp {
    font-size: clamp(14px, 3.5vw, 20px);
    font-weight: 700;
  }
</style>
