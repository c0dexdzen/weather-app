<script setup lang="ts"></script>

<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style scoped>
  .button {
    border: none;
    border-radius: 10px;
    background: var(--gradient);
    padding: 14px;
    font-family: var(--font);
    font-size: clamp(16px, 4vw, 20px);
    font-weight: 600;
    color: var(--primary);
    cursor: pointer;
    height: 53px;
    display: flex;
    width: 100%;
    min-width: 0;
    gap: 9px;
    align-items: center;
    justify-content: center;
  }
  .button:hover:not(:disabled) {
    background: var(--gradient-inverted);
  }
  .button:disabled {
    cursor: not-allowed;
  }
</style>
