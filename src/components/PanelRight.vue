<script setup lang="ts">
  import Weather from '@/types/weather';
  import ApiError from '@/types/weather-error.types';
  import { computed } from 'vue';
  import CitySelect from './CitySelect.vue';
  import DayCard from './DayCard.vue';
  import Error from './Error.vue';
  import Stat from './Stat.vue';

  const { error, data, activeIndex } = defineProps<{
    error: ApiError | null;
    data: Weather | null;
    activeIndex: number;
  }>();

  const emit = defineEmits<{
    'select-index': [index: number];
  }>();

  const statData = computed(() => {
    if (!data) {
      return [];
    }
    return [
      {
        label: 'Влажность',
        stat: data.forecast.forecastday[activeIndex].day.avghumidity + ' %',
      },
      {
        label: 'Вероятность дождя',
        stat: data.forecast.forecastday[activeIndex].day.daily_chance_of_rain + ' %',
      },
      {
        label: 'Ветер',
        stat: data.forecast.forecastday[activeIndex].day.maxwind_kph + ' км/ч',
      },
    ];
  });
</script>

<template>
  <Error v-if="error" :error="error.error.message" />
  <div v-if="data" class="mb-[clamp(24px,8vw,70px)] flex flex-col gap-[clamp(24px,6vw,80px)]">
    <ul class="m-0 flex list-none flex-col gap-3 p-0 sm:gap-4">
      <Stat v-for="item in statData" v-bind="item" :key="item.label" />
    </ul>
    <div class="flex min-w-0 gap-[clamp(4px,1vw,8px)]">
      <DayCard
        v-for="(item, i) in data.forecast.forecastday"
        :key="item.date"
        :weather-code="item.day.condition.code"
        :temp="item.day.avgtemp_c"
        :date="new Date(item.date)"
        :is-active="activeIndex === i"
        @click="() => emit('select-index', i)"
      />
    </div>
  </div>
  <CitySelect />
</template>
