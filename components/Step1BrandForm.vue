<template>
  <UCard>
    <div class="flex items-center gap-3 mb-4">
      <h2 class="text-xl font-semibold">1. Enter your website</h2>
      <UBadge color="primary">Step 1</UBadge>
    </div>
    <UForm :state="form" @submit="onSubmit">
      <UFormGroup label="Website URL" name="url">
        <UInput v-model="form.url" placeholder="https://yourwebsite.com" />
      </UFormGroup>
      <div class="flex gap-2 mt-4">
        <UButton color="primary" :loading="loading" @click="autoFill">Auto-fill from URL</UButton>
        <UButton type="submit" color="black" :disabled="!canNext">Next</UButton>
      </div>
    </UForm>
    <div v-if="brand" class="mt-6 grid gap-2">
      <div><strong>Title:</strong> {{ brand.title }}</div>
      <div><strong>Description:</strong> {{ brand.description }}</div>
      <div class="flex items-center gap-2">
        <strong>Palette:</strong>
        <span v-for="c in brand.palette" :key="c" :style="{background:c}" class="inline-block w-5 h-5 rounded" />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const form = reactive({ url: '' })
const loading = ref(false)
const brand = ref<any>(null)

const canNext = computed(() => !!brand.value)

async function autoFill() {
  if (!form.url) return
  loading.value = true
  try {
    const { data } = await useFetch('/api/scrape', { method: 'POST', body: { url: form.url } })
    brand.value = data.value
    useProjectState().value.brand = data.value
  } finally {
    loading.value = false
  }
}

function onSubmit() {
  if (canNext.value) {
    useWizard().value.step = 2
  }
}
</script>

