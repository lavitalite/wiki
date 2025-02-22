<template>
  <span
    :class="VChipClasses"
    :style="colorStyles"
    @click="emit('click', $event)"
    @keydown.enter="emit('click', $event)"
    :tabindex="isClickable ? 0 : undefined"
    v-if="!isClosed"
  >
    <span class="v-chip__prepend" v-if="prependIcon">
      <slot name="prepend">
        <VIcon :slug="prependIcon" v-if="prependIcon" />
      </slot>
    </span>
    <span class="v-chip__content" v-if="hasPrepend">
      <slot></slot>
    </span>
    <span class="v-chip__append" v-if="hasAppend">
      <slot name="append">
        <VIcon :slug="appendIcon" v-if="appendIcon" />
      </slot>
    </span>
    <button
      v-if="closeable"
      class="v-chip__close"
      type="button"
      v-bind="closeProps"
    >
      <VIcon slug="close" />
    </button>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useVariant, VariantProps } from "../../composables/variant";
import { VIcon } from "../VIcon";

type VChipProps = VariantProps & {
  closeable?: boolean;
  closeLabel?: string;
  disabled?: boolean;
  pill?: boolean;
  label?: boolean;
  ripple?: boolean;
  color?: string;
  type?: "info" | "tip" | "warning" | "danger";
  size?: "x-small" | "small" | "default" | "large" | "x-large";
  density?: "comfortable" | "compact" | "default";
  prependIcon?: string;
  appendIcon?: string;
  link?: string;
};

const props = withDefaults(defineProps<VChipProps>(), {
  variant: "tonal",
  size: "default",
  label: false,
  pill: false,
  ripple: false,
  closeable: false,
  closeLabel: "close",
  density: "default",
  type: "info",
});

const emit = defineEmits({
  "click:close": (e: MouseEvent) => true,
  "update:modelValue": (value: boolean) => true,
  "group:selected": (val: { value: boolean }) => true,
  click: (e: MouseEvent | KeyboardEvent) => true,
});

const slots = defineSlots<{
  default: {
    isSelected: boolean | undefined;
    selectedClass: boolean | (string | undefined)[] | undefined;
    select: ((value: boolean) => void) | undefined;
    toggle: (() => void) | undefined;
    value: unknown;
    disabled: boolean;
  };
  label: never;
  prepend: never;
  append: never;
  close: never;
  filter: never;
}>();

const { colorClasses, colorStyles, variantClasses } = useVariant(props);
const VChipClasses = computed(() => {
  return [
    "v-chip",
    props.type,
    `v-chip--size-${props.size}`,
    `v-chip--density-${props.density}`,
    ...colorClasses.value,
    variantClasses.value,
    {
      "v-chip--disabled": props.disabled,
      "v-chip--label": props.label,
      "v-chip--pill": props.pill,
    },
  ];
});

const hasClose = !!(slots.close || props.closeable);

const hasPrepend = !!(props.prependIcon || slots.prepend);
const hasAppend = !!(props.appendIcon || slots.append);

const isClickable = computed(() => !props.disabled && !props.link);

const isClosed = ref(false);

const closeProps = computed(() => {
  return {
    "arial-label": props.closeLabel,
    onClick(e: MouseEvent) {
      e.stopPropagation();
      isClosed.value = true;
      emit("click:close", e);
    },
  };
});

function onClick(e: MouseEvent) {
  emit("click", e);
  if (!isClickable.value) return;

  // link.navigate?.(e)
  // group?.toggle()
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onClick(e as any as MouseEvent);
  }
}
</script>

<style scoped>
.v-chip.info {
  border-color: var(--vp-badge-info-border);
  color: var(--vp-badge-info-text);
  background-color: var(--vp-badge-info-bg);
}

.v-chip.tip {
  border-color: var(--vp-badge-tip-border);
  color: var(--vp-badge-tip-text);
  background-color: var(--vp-badge-tip-bg);
}

.v-chip.warning {
  border-color: var(--vp-badge-warning-border);
  color: var(--vp-badge-warning-text);
  background-color: var(--vp-badge-warning-bg);
}

.v-chip.danger {
  border-color: var(--vp-badge-danger-border);
  color: var(--vp-badge-danger-text);
  background-color: var(--vp-badge-danger-bg);
}
</style>
