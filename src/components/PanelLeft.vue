<script setup lang="ts">
  import { ForecastDay } from '@/types/weather/forecast.types';
  import WeatherLocation from '@/types/weather/location.types';
  import { computed } from 'vue';
  import IconLocation from './icon-components/IconLocation.vue';
  import IconCloud from './icon-components/weather/IconCloud.vue';
  import IconRain from './icon-components/weather/IconRain.vue';
  import IconSun from './icon-components/weather/IconSun.vue';

  const { dayData } = defineProps<{
    dayData: ForecastDay;
    location: WeatherLocation;
  }>();

  const day = computed(() => {
    return new Date(dayData.date).toLocaleDateString('ru-RU', {
      weekday: 'long',
    });
  });
  const date = computed(() => {
    return new Date(dayData.date).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  });
  const weatherCode = computed(() => {
    return dayData.day.condition.code;
  });
</script>

<template>
  <div class="paneLeft">
    <div>
      <div class="day">
        {{ day }}
      </div>
      <div class="date">
        {{ date }}
      </div>
      <div class="city">
        <IconLocation />
        {{ location?.name }} / {{ location?.country }}
      </div>
    </div>
    <div>
      <div class="wetherIcon">
        <IconSun v-if="weatherCode <= 1003" :size="95" />
        <IconCloud v-if="weatherCode >= 1006 && weatherCode < 1063" :size="95" />
        <IconRain v-if="weatherCode >= 1063" :size="95" />
      </div>
      <div class="temp">
        {{ dayData.day.avgtemp_c }}
      </div>
      <div class="condition">
        {{ dayData.day.condition.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .paneLeft {
    display: flex;
    flex-direction: column;
    padding: clamp(20px, 5vw, 48px) clamp(20px, 4vw, 32px);
    justify-content: space-between;
    height: 100%;
    min-height: 260px;
  }
  .day {
    font-size: clamp(22px, 6vw, 37px);
    font-weight: 700;
    text-transform: capitalize;
    margin-bottom: clamp(8px, 2vw, 16px);
  }
  .date {
    font-size: clamp(14px, 3.5vw, 22px);
    font-weight: 500;
    margin-bottom: 8px;
  }
  .wetherIcon {
    margin: clamp(12px, 3vw, 25px);
  }
  .city {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: clamp(14px, 3vw, 18px);
  }
  .temp {
    font-size: clamp(32px, 10vw, 50px);
    font-weight: 700;
    margin-bottom: 6px;
  }
  .condition {
    font-size: clamp(18px, 4.5vw, 30px);
    font-weight: 700;
  }

  @media (min-width: 768px) {
    .paneLeft {
      min-height: 0;
    }
  }
</style>
