<template>
  <div class="canvas-container">
    <div class="toolbar">
      <button @click="addRect">Add Rectangle</button>
      <button @click="addCircle">Add Circle</button>
      <button @click="addText">Add Text</button>
    </div>
    
    <v-stage 
      :config="stageConfig" 
      @mousedown="handleStageMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
    >
      <v-layer>
        <v-rect
          v-for="rect in rectangles"
          :key="rect.id"
          :config="rect"
          @transformend="handleTransform"
        />
        <v-circle
          v-for="circle in circles"
          :key="circle.id"
          :config="circle"
          @transformend="handleTransform"
        />
        <v-text
          v-for="text in texts"
          :key="text.id"
          :config="text"
          @transformend="handleTransform"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stageConfig = ref({
  width: 800,
  height: 600
})

const rectangles = ref([])
const circles = ref([])
const texts = ref([])

let idCounter = 0

const addRect = () => {
  rectangles.value.push({
    id: ++idCounter,
    x: Math.random() * 200,
    y: Math.random() * 200,
    width: 100,
    height: 100,
    fill: '#ff0000',
    draggable: true
  })
}

const addCircle = () => {
  circles.value.push({
    id: ++idCounter,
    x: Math.random() * 200 + 50,
    y: Math.random() * 200 + 50,
    radius: 50,
    fill: '#00ff00',
    draggable: true
  })
}

const addText = () => {
  texts.value.push({
    id: ++idCounter,
    x: Math.random() * 200,
    y: Math.random() * 200,
    text: 'Sample Text',
    fontSize: 20,
    fill: '#000000',
    draggable: true
  })
}

const handleStageMouseDown = (e) => {
  // Handle stage click
}

const handleMouseMove = (e) => {
  // Handle mouse move
}

const handleMouseUp = (e) => {
  // Handle mouse up
}

const handleTransform = (e) => {
  // Handle object transform
}
</script>

<style scoped>
.canvas-container {
  border: 1px solid #ccc;
  margin: 20px;
}

.toolbar {
  padding: 10px;
  background: #f5f5f5;
  border-bottom: 1px solid #ccc;
}

.toolbar button {
  margin-right: 10px;
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.toolbar button:hover {
  background: #0056b3;
}
</style>
