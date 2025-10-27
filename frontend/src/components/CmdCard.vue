<template>
  <div class="cmd-card">
    <header class="card-header">{{ title }}</header>
    <div class="card-content">
      <slot></slot>
    </div>
    <div class="console" v-if="showConsole">
      <span class="prompt">&gt;</span>
      <input 
        type="text" 
        :placeholder="consolePlaceholder" 
        @keydown.enter="handleCommand"
        v-model="commandInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  title: string
  showConsole?: boolean
  consolePlaceholder?: string
}>()

const commandInput = ref('')

const handleCommand = () => {
  // 子组件可以通过事件监听来处理命令
  emit('command', commandInput.value)
  commandInput.value = ''
}

const emit = defineEmits<{
  (e: 'command', command: string): void
}>()
</script>

<style scoped>
.cmd-card {
  background: #000;
  border: 1px solid #00ff00;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  min-height: 300px;
  font-family: monospace;
}

.card-header {
  padding: 8px;
  border-bottom: 1px solid #00ff00;
  font-weight: bold;
  color: #00ff00;
}

.card-content {
  flex: 1;
  overflow-y: auto;
  color: #00ff00;
}

/* 命令行输入区域 */
.console {
  border-top: 1px solid #00ff00;
  padding: 8px;
  display: flex;
  gap: 6px;
  background: #000;
}

.prompt {
  color: #0f0;
}

.console input {
  flex: 1;
  background: #000;
  border: none;
  outline: none;
  color: #00ff00;
  font-family: monospace;
  font-size: 14px;
}

.console input::placeholder {
  color: #008000;
}
</style>