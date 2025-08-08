<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useWizard } from '~/stores/useWizard'

const wizard = useWizard()
const { step, websiteUrl, instructions, generatedImages } = storeToRefs(wizard)

function next() { wizard.next() }
function prev() { wizard.prev() }
function onGenerateMock() {
  // placeholder: add a mock image URL
  generatedImages.value = [
    'https://via.placeholder.com/800x800.png?text=Ad+Variant+1',
    'https://via.placeholder.com/800x800.png?text=Ad+Variant+2'
  ]
}
</script>

<template>
  <main class="container p-6 mx-auto max-w-5xl">
    <h1 class="text-2xl font-semibold mb-4">AI Ads Wizard</h1>

    <div v-if="step === 'enter-website'" class="space-y-4">
      <h2 class="text-xl font-medium">1. Enter your website</h2>
      <input
        v-model="websiteUrl"
        type="url"
        placeholder="https://yourdomain.com"
        class="w-full border rounded px-3 py-2"
      />
      <div class="flex gap-2">
        <button class="px-4 py-2 rounded bg-gray-200" disabled>Back</button>
        <button class="px-4 py-2 rounded bg-black text-white" @click="next">Continue</button>
      </div>
    </div>

    <div v-else-if="step === 'create-ads'" class="space-y-4">
      <h2 class="text-xl font-medium">2. Create your ads</h2>
      <textarea
        v-model="instructions"
        placeholder="Give AI instructions for your ad (product, audience, tone, etc)"
        class="w-full border rounded px-3 py-2 h-40"
      />
      <div class="flex gap-2">
        <button class="px-4 py-2 rounded bg-gray-200" @click="prev">Back</button>
        <button class="px-4 py-2 rounded bg-black text-white" @click="onGenerateMock">Generate (mock)</button>
        <button class="px-4 py-2 rounded bg-black text-white" @click="next">Skip</button>
      </div>
    </div>

    <div v-else class="space-y-4">
      <h2 class="text-xl font-medium">3. Preview and Edit</h2>
      <p class="text-sm text-gray-600">Select a variant or go to Editor later.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(img, i) in generatedImages"
          :key="i"
          class="border rounded overflow-hidden"
        >
          <img :src="img" alt="Ad Variant" class="w-full h-auto" />
        </div>
      </div>

      <div class="flex gap-2">
        <button class="px-4 py-2 rounded bg-gray-200" @click="prev">Back</button>
        <NuxtLink class="px-4 py-2 rounded bg-black text-white" to="/editor">Open Editor</NuxtLink>
      </div>
    </div>
  </main>
</template>

