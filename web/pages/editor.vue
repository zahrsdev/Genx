<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Stage, Layer, Rect, Text, Image as KImage, Transformer } from 'vue-konva'

const stageRef = ref()
const layerRef = ref()
const trRef = ref()

const nodes = ref<any[]>([])
const selectedId = ref<string | null>(null)

function addText() {
  nodes.value.push({ id: crypto.randomUUID(), type: 'text', x: 80, y: 80, text: 'Your headline', fontSize: 36, fill: '#111' })
}

function onSelect(id: string) {
  selectedId.value = id
}

function onDeselect(e: MouseEvent) {
  if (e.target === e.currentTarget) selectedId.value = null
}

const imageObj = new window.Image()
const imageUrl = ref<string | null>(null)

function onFile(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0]
  if (!f) return
  const url = URL.createObjectURL(f)
  imageUrl.value = url
  imageObj.src = url
}

onMounted(() => {
  imageObj.onload = () => {
    // trigger re-render
  }
})

function download() {
  const uri = (stageRef.value.getNode() as any).toDataURL({ pixelRatio: 2 })
  const a = document.createElement('a')
  a.href = uri
  a.download = 'ad.png'
  a.click()
}
</script>

<template>
  <main class="p-4 space-y-4">
    <div class="flex gap-2 items-center">
      <input type="file" accept="image/*" @change="onFile" />
      <button class="px-3 py-2 rounded bg-black text-white" @click="addText">Add Text</button>
      <button class="px-3 py-2 rounded bg-black text-white" @click="download">Download</button>
      <NuxtLink class="px-3 py-2 rounded bg-gray-200" to="/">Back to Wizard</NuxtLink>
    </div>

    <div class="border rounded w-full overflow-auto" @mousedown="onDeselect">
      <Stage :config="{ width: 1024, height: 1024 }" ref="stageRef">
        <Layer ref="layerRef">
          <KImage v-if="imageUrl" :image="imageObj" :x="0" :y="0" />

          <Text
            v-for="n in nodes"
            :key="n.id"
            :x="n.x" :y="n.y"
            :text="n.text" :fontSize="n.fontSize" :fill="n.fill"
            draggable
            @click="onSelect(n.id)"
          />

          <Transformer v-if="selectedId" :nodes="[...$el?.getStage()?.findOne(`#${selectedId}`)]" ref="trRef" />
        </Layer>
      </Stage>
    </div>
  </main>
</template>

