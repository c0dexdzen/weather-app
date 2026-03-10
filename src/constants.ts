import { InjectionKey, Ref } from 'vue';

export const API_ENDPOINT = 'https://api.weatherapi.com/v1';

export interface CityStore {
  value: Ref<string>;
  update: (_newCity: string) => void;
}

export const cityProvide: InjectionKey<CityStore> = Symbol('city');
