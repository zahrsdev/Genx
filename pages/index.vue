<template>
  <UContainer class="py-8">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Genx — AI Ads Generator</h1>
      <UButton to="#" variant="ghost">Settings</UButton>
    </div>
    <USteps :items="['Brand','Create','Preview']" :current="wizard.step-1" />
    <div class="mt-6">
      <Step1BrandForm v-if="wizard.step===1" />
      <Step2CopyForm v-else-if="wizard.step===2" />
      <Step3PreviewEditor v-else />
    </div>
  </UContainer>
</template>
<script setup lang="ts">
const wizard = useWizard().value
</script>

