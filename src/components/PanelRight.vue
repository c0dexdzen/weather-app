<script setup>
  import { errorMap } from '@/constants';
  import { computed } from 'vue';
  import CitySelect from './CitySelect.vue';
  import DayCard from './DayCard.vue';
  import Error from './Error.vue';
  import Stat from './Stat.vue';

  const { error, data, activeIndex } = defineProps({
    error: Object,
    data: Object,
    activeIndex: Number,
  });

  const emit = defineEmits(['select-index', 'select-city']);

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

  const errorDisplay = computed(() => {
    return errorMap.get(error?.error?.code);
  });
</script>

<template>
  <Error v-if="error" :error="errorDisplay" />
  <div v-if="data" class="stat-data">
    <ul class="stat-list">
      <Stat v-for="item in statData" v-bind="item" :key="item.label" />
    </ul>
    <div class="day-card-list">
      <DayCard
        v-for="(item, i) in data.forecast.forecastday"
        :key="item.date"
        :weather-code="item.day.condition.code"
        :temp="item.day.avgtemp_c"
        :date="new Date(item.date)"
        :is-active="activeIndex == i"
        @click="() => emit('select-index', i)"
      />
    </div>
  </div>
  <CitySelect />
</template>

<style scoped>
  .day-card-list {
    display: flex;
    gap: clamp(4px, 1vw, 8px);
    min-width: 0;
  }
  .stat-data {
    display: flex;
    flex-direction: column;
    gap: clamp(24px, 6vw, 80px);
    margin-bottom: clamp(24px, 8vw, 70px);
  }

  .stat-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  @media (min-width: 480px) {
    .stat-list {
      gap: 16px;
    }
  }
</style>
