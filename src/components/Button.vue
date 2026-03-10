<script setup lang="ts"></script>

<template>
  <button
    class="flex h-13.25 w-full min-w-0 cursor-pointer items-center justify-center gap-2.25 rounded-[10px] border-0 bg-(image:--gradient) p-3.5 text-[clamp(16px,4vw,20px)] font-semibold text-(--color-primary) hover:bg-(image:--gradient-inverted) disabled:cursor-not-allowed"
  >
    <slot></slot>
  </button>
</template>
