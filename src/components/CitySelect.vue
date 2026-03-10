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
  <div class="mt-auto w-full">
    <div v-if="isEdited" class="flex flex-wrap items-center gap-3">
      <Input
        v-model="inputValue"
        v-focus
        placeholder="Введите город"
        class="max-w-none min-w-0 flex-1"
        @keyup.enter="select()"
      />
      <Button class="w-auto min-w-35 flex-none" @click="select()">Сохранить</Button>
    </div>
    <Button v-else @click="edit()">
      <IconLocation />
      Изменить город
    </Button>
  </div>
</template>
