<script setup lang="ts">
  import { inject, ref } from 'vue';
  import { cityProvide } from '../constants';
  import Button from './Button.vue';
  import IconLocation from './icon-components/IconLocation.vue';
  import Input from './Input.vue';

  const cityStore = inject(cityProvide);
  const inputValue = ref(cityStore?.value?.value ?? '');

  const isEdited = ref(false);

  function select() {
    isEdited.value = false;
    cityStore?.update(inputValue.value);
  }

  function edit() {
    inputValue.value = cityStore?.value?.value ?? inputValue.value;
    isEdited.value = true;
  }
</script>

<template>
  <div class="city-select">
    <div v-if="isEdited" class="city-input">
      <Input v-model="inputValue" v-focus placeholder="Введите город" @keyup.enter="select()" />
      <Button @click="select()">Сохранить</Button>
    </div>
    <Button v-else @click="edit()">
      <IconLocation />
      Изменить город
    </Button>
  </div>
</template>

<style scoped>
  .city-input {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
  }
  .city-input :deep(.input) {
    flex: 1;
    min-width: 0;
    max-width: none;
  }
  .city-input :deep(.button) {
    flex: 0 0 auto;
    width: auto;
    min-width: 140px;
  }
  .city-select {
    width: 100%;
    margin-top: auto;
  }
</style>
