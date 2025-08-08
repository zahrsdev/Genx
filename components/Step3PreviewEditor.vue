<template>
  <UCard>
    <div class="flex items-center gap-3 mb-4">
      <h2 class="text-xl font-semibold">3. Preview and Edit</h2>
      <UBadge color="primary">Step 3</UBadge>
    </div>
    <div class="flex gap-4 items-start">
      <div class="space-y-3 w-full max-w-xl">
        <USelect v-model="size" :options="sizes"/>
        <div class="border rounded p-2">
          <KonvaStage :width="dim.w" :height="dim.h" ref="stageRef">
            <KonvaLayer>
              <KonvaRect :width="dim.w" :height="dim.h" :fill="brandColor"/>
              <KonvaText :text="headline" :fontSize="36" :x="24" :y="24" :width="dim.w-48" fill="#111"/>
              <KonvaText :text="body" :fontSize="20" :x="24" :y="84" :width="dim.w-48" fill="#333"/>
              <KonvaRect :x="24" :y="dim.h-64" :width="220" :height="40" fill="#111" cornerRadius="8"/>
              <KonvaText :text="cta" :x="24+110" :y="dim.h-64+10" :align="'center'" :width="220" fill="#fff"/>
            </KonvaLayer>
          </KonvaStage>
        </div>
        <div class="flex gap-2">
          <UButton @click="download">Download PNG</UButton>
          <UButton variant="soft" @click="back">Back</UButton>
        </div>
      </div>
      <div class="w-72 space-y-3">
        <UFormGroup label="Brand Color">
          <UInput v-model="brandColor" type="color"/>
        </UFormGroup>
        <UFormGroup label="Headline">
          <UTextarea v-model="headline"/>
        </UFormGroup>
        <UFormGroup label="Body">
          <UTextarea v-model="body"/>
        </UFormGroup>
        <UFormGroup label="CTA">
          <UInput v-model="cta"/>
        </UFormGroup>
      </div>
    </div>
  </UCard>
</template>
<script setup lang="ts">
import { Stage as KonvaStage, Layer as KonvaLayer, Rect as KonvaRect, Text as KonvaText } from 'vue-konva'

const sizes = [
  { label: '1080x1080', value: '1080x1080' },
  { label: '1080x1350', value: '1080x1350' }
]
const size = ref('1080x1080')
const dim = computed(()=> size.value==='1080x1080' ? { w:1080, h:1080 } : { w:1080, h:1350 })

const state = useProjectState().value
const brandColor = ref(state?.brand?.palette?.[0] || '#ffffff')
const headline = ref(state?.variants?.[0]?.headline || 'Your Headline Here')
const body = ref(state?.variants?.[0]?.primaryText || 'Your body text here')
const cta = ref(state?.variants?.[0]?.cta || 'Shop Now')

const stageRef = ref<any>(null)
function download(){
  const uri = (stageRef.value?.getStage?.() || stageRef.value)?.toDataURL({ pixelRatio: 2 })
  const a = document.createElement('a'); a.href = uri; a.download = `ad-${size.value}.png`; a.click()
}
function back(){ useWizard().value.step = 2 }
</script>

