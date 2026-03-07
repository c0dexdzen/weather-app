import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import vue from "eslint-plugin-vue";

export default [
  js.configs.recommended,
  ...vue.configs["flat/recommended"],
  prettier,
  {
    files: ["**/*.vue", "**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      // old eslintrc env: { browser: true, node: true }
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Общие послабления
      "vue/multi-word-component-names": "off",
      "vue/require-default-prop": "off",
      // 'no-unused-vars': 'off',

      // Порядок верхнеуровневых блоков в SFC (<script>, <template>, <style>)
      "vue/block-order": [
        "error",
        {
          order: ["script", "template", "style"],
        },
      ],

      // Порядок опций внутри компонента
      "vue/order-in-components": [
        "error",
        {
          order: [
            "el",
            "name",
            "key",
            "parent",
            "functional",
            "delimiters",
            "comments",
            "components",
            "directives",
            "filters",
            "extends",
            "mixins",
            "provide",
            "inject",
            "inheritAttrs",
            "model",
            "props",
            "propsData",
            "emits",
            "setup",
            "data",
            "computed",
            "watch",
            "LIFECYCLE_HOOKS",
            "methods",
            "template",
            "render",
            "renderError",
          ],
        },
      ],

      // Порядок атрибутов и директив во Vue-шаблонах
      "vue/attributes-order": [
        "error",
        {
          order: [
            "DEFINITION", // is
            "LIST_RENDERING", // v-for
            "CONDITIONALS", // v-if, v-else-if, v-else, v-show, v-cloak
            "RENDER_MODIFIERS", // v-once, v-pre
            "GLOBAL", // id
            "UNIQUE", // ref, key, slot, v-slot, slot-scope
            "TWO_WAY_BINDING", // v-model
            "OTHER_DIRECTIVES", // v-custom-directive
            "OTHER_ATTR", // все обычные атрибуты
            "EVENTS", // @click и т.п.
            "CONTENT", // v-text, v-html
          ],
          alphabetical: false,
        },
      ],
    },
  },
];
