<template>
  <UCard>
    <div class="flex items-center gap-3 mb-4">
      <h2 class="text-xl font-semibold">2. Create your ads</h2>
      <UBadge color="primary">Step 2</UBadge>
    </div>
    <UForm :state="form" @submit="onSubmit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormGroup label="Goal" name="goal"><USelect v-model="form.goal" :options="goals"/></UFormGroup>
        <UFormGroup label="Platform" name="platform"><USelect v-model="form.platform" :options="platforms"/></UFormGroup>
        <UFormGroup label="Tone" name="tone"><USelect v-model="form.tone" :options="tones"/></UFormGroup>
        <UFormGroup label="Audience" name="audience"><UInput v-model="form.audience" placeholder="e.g. Moms in Jakarta"/></UFormGroup>
        <UFormGroup label="Instructions" name="instructions" class="md:col-span-2"><UTextarea v-model="form.instructions" placeholder="Tell the AI what to focus on..."/></UFormGroup>
      </div>
      <div class="flex gap-2 mt-4">
        <UButton color="primary" :loading="loading" @click="generate">Generate</UButton>
        <UButton type="submit" color="black" :disabled="!variants.length">Next</UButton>
      </div>
    </UForm>
    <div v-if="variants.length" class="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <UCard v-for="v in variants" :key="v.id">
        <p class="font-semibold">{{ v.headline }}</p>
        <p class="text-sm text-gray-500">{{ v.primaryText }}</p>
        <UBadge class="mt-2">CTA: {{ v.cta }}</UBadge>
      </UCard>
    </div>
  </UCard>
</template>
<script setup lang="ts">
const goals = ['Traffic','Leads','Sales']
const platforms = ['Instagram','Facebook']
const tones = ['Neutral','Friendly','Playful','Professional']

const form = reactive({ goal: 'Traffic', platform: 'Instagram', tone: 'Neutral', audience: '', instructions: '' })
const variants = ref<any[]>([])
const loading = ref(false)

async function generate() {
  loading.value = true
  try {
    const body = { brief: useProjectState().value.brand, ...form, variantCount: 3 }
    const { data } = await useFetch('/api/generate-copy', { method: 'POST', body })
    variants.value = data.value?.variants || []
    useProjectState().value.variants = variants.value
  } finally { loading.value = false }
}

function onSubmit() { if (variants.value.length) useWizard().value.step = 3 }
</script>

