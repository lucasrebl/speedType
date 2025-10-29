<template>
  <div class="input-area">
    <textarea
      ref="inputRef"
      v-model="inputValue"
      :disabled="disabled"
      :placeholder="placeholder"
      class="typing-input"
      rows="4"
      @input="handleInput"
      @keydown="handleKeydown"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

interface Props {
  modelValue: string
  disabled?: boolean
  placeholder?: string
  autoFocus?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'start-typing'): void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  placeholder: 'Commencez à taper ici...',
  autoFocus: false
})

const emit = defineEmits<Emits>()

const inputRef = ref<HTMLTextAreaElement>()
const inputValue = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue
})

watch(() => props.autoFocus, (shouldFocus) => {
  if (shouldFocus) {
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
})

const handleInput = () => {
  emit('update:modelValue', inputValue.value)
  
  // Émettre l'événement de début de frappe si c'est le premier caractère
  if (inputValue.value.length === 1 && props.modelValue.length === 0) {
    emit('start-typing')
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  // Empêcher les raccourcis clavier qui pourraient fausser le test
  if (event.ctrlKey || event.metaKey) {
    if (['a', 'c', 'v', 'x', 'z', 'y'].includes(event.key.toLowerCase())) {
      event.preventDefault()
    }
  }
}

const focusInput = () => {
  inputRef.value?.focus()
}

defineExpose({
  focusInput
})
</script>

<style scoped>
.input-area {
  margin: 2rem 0;
}

.typing-input {
  width: 100%;
  padding: 1rem;
  font-size: 1.125rem;
  font-family: 'Courier New', monospace;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  resize: vertical;
  line-height: 1.6;
  background-color: #fff;
  transition: border-color 0.3s ease;
}

.typing-input:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.typing-input:disabled {
  background-color: #f5f5f5;
  color: #666;
  cursor: not-allowed;
}

.typing-input::placeholder {
  color: #999;
  font-style: italic;
}

@media (max-width: 768px) {
  .typing-input {
    font-size: 1rem;
  }
}
</style>