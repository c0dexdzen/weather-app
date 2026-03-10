<script setup lang="ts">
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
  <main class="main">
    <div class="cards-row">
      <div class="left">
        <PanelLeft v-if="data" :day-data="data.forecast.forecastday[activeIndex]" :location="data.location" />
      </div>
      <div class="right">
        <PanelRight :data :error :active-index="activeIndex" @select-index="(i) => (activeIndex = i)" />
      </div>
    </div>
  </main>
</template>

<style scoped>
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
  }
  .cards-row {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    max-width: 100%;
    min-height: 0;
  }
  .left {
    width: 100%;
    min-height: 280px;
    flex-shrink: 0;
    border-radius: 25px 25px 0 0;
    background-image: url('@/assets/images/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .right {
    background: var(--color-bg-main);
    padding: 24px 16px;
    border-radius: 0 0 25px 25px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  @media (min-width: 480px) {
    .main {
      padding: 16px;
    }
    .right {
      padding: 28px 24px;
    }
  }

  @media (min-width: 768px) {
    .cards-row {
      flex-direction: row;
      width: min(960px, 100%);
      height: min(680px, 85vh);
    }
    .left {
      width: min(400px, 45%);
      min-height: unset;
      height: 100%;
      border-radius: 25px 0 0 25px;
    }
    .right {
      flex: 1;
      min-width: 0;
      padding: 40px 36px;
      border-radius: 0 25px 25px 0;
      height: 100%;
    }
  }

  @media (min-width: 1024px) {
    .cards-row {
      width: min(1000px, 95vw);
      height: 680px;
    }
    /* .left {
      width: 500px;
    } */
    .right {
      padding: 60px 50px;
    }
  }
</style>
