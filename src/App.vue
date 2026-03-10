<script setup lang="ts">
  import bgUrl from '@/assets/images/bg.png';
  import { onMounted, provide, ref, watch } from 'vue';
  import PanelLeft from './components/PanelLeft.vue';
  import PanelRight from './components/PanelRight.vue';
  import { API_ENDPOINT, cityProvide } from './constants';
  import type Weather from './types/weather';
  import type ApiError from './types/weather-error.types';

  const data = ref<Weather | null>(null);
  const error = ref<ApiError | null>(null);
  const activeIndex = ref(0);

  const city = ref('Moscow');
  provide(cityProvide, {
    value: city,
    update: (newCity: string) => {
      city.value = newCity;
    },
  });

  watch(city, (name) => fetchWeather(name));
  onMounted(() => fetchWeather(city.value));

  async function fetchWeather(name: string) {
    const params = new URLSearchParams({
      q: name,
      lang: 'ru',
      key: '6b04fbeb8b6a48d2ba6143411252602',
      days: '3',
    });

    error.value = null;
    try {
      const response = await fetch(`${API_ENDPOINT}/forecast.json?${params.toString()}`);
      const json = await response.json();

      if (!response.ok) {
        error.value = json as ApiError;
        data.value = null;
        return;
      }
      data.value = json as Weather;
    } catch (err: unknown) {
      console.log('Api error:', err);
      data.value = null;
      error.value = {
        error: {
          code: 0,
          message: err instanceof Error ? err.message : 'Ошибка сети',
        },
      };
    }
  }
</script>

<template>
  <main class="p-3' box-border flex min-h-screen w-full items-center justify-center sm:p-4">
    <div
      class="flex min-h-0 w-full max-w-full flex-col items-stretch md:h-[min(680px,85vh)] md:w-[min(960px,100%)] md:flex-row lg:h-170 lg:w-[min(1000px,95vw)]"
    >
      <div
        class="w-full shrink-0 rounded-t-[25px] bg-cover bg-no-repeat md:h-full md:w-[min(400px,45%)] md:rounded-l-[25px] md:rounded-tr-none"
        :style="{ backgroundImage: `url(${bgUrl})` }"
      >
        <PanelLeft
          v-if="data"
          :day-data="data.forecast.forecastday[activeIndex]"
          :location="data.location"
        />
      </div>
      <div
        class="box-border flex min-h-0 flex-col rounded-b-[25px] bg-(--color-bg-main) p-[24px_16px] sm:p-[28px_24px] md:h-full md:min-w-0 md:flex-1 md:rounded-r-[25px] md:rounded-bl-none md:p-[40px_36px] lg:p-[60px_50px]"
      >
        <PanelRight
          :data
          :error
          :active-index="activeIndex"
          @select-index="(i) => (activeIndex = i)"
        />
      </div>
    </div>
  </main>
</template>
