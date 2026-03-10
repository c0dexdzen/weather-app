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
  <div
    class="flex h-full min-h-65 flex-col justify-between px-[clamp(20px,4vw,32px)] py-[clamp(20px,5vw,48px)] md:min-h-0"
  >
    <div>
      <div class="mb-[clamp(8px,2vw,16px)] text-[clamp(22px,6vw,37px)] font-bold capitalize">
        {{ day }}
      </div>
      <div class="mb-2 text-[clamp(14px,3.5vw,22px)] font-medium">
        {{ date }}
      </div>
      <div class="flex items-center gap-2 text-[clamp(14px,3vw,18px)]">
        <IconLocation />
        {{ location?.name }} / {{ location?.country }}
      </div>
    </div>
    <div>
      <div class="m-[clamp(12px,3vw,25px)]">
        <IconSun v-if="weatherCode <= 1003" :size="95" />
        <IconCloud v-if="weatherCode >= 1006 && weatherCode < 1063" :size="95" />
        <IconRain v-if="weatherCode >= 1063" :size="95" />
      </div>
      <div class="mb-1.5 text-[clamp(32px,10vw,50px)] font-bold">
        {{ dayData.day.avgtemp_c }}
      </div>
      <div class="text-[clamp(18px,4.5vw,30px)] font-bold">
        {{ dayData.day.condition.text }}
      </div>
    </div>
  </div>
</template>
