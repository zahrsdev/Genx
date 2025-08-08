import { defineStore } from 'pinia'

export type WizardStep = 'enter-website' | 'create-ads' | 'preview-edit'

export interface WizardState {
  step: WizardStep
  websiteUrl: string
  instructions: string
  generatedImages: string[]
}

export const useWizard = defineStore('wizard', {
  state: (): WizardState => ({
    step: 'enter-website',
    websiteUrl: '',
    instructions: '',
    generatedImages: []
  }),
  actions: {
    next() {
      const order: WizardStep[] = ['enter-website', 'create-ads', 'preview-edit']
      const idx = order.indexOf(this.step)
      if (idx < order.length - 1) this.step = order[idx + 1]
    },
    prev() {
      const order: WizardStep[] = ['enter-website', 'create-ads', 'preview-edit']
      const idx = order.indexOf(this.step)
      if (idx > 0) this.step = order[idx - 1]
    },
    reset() {
      this.step = 'enter-website'
      this.websiteUrl = ''
      this.instructions = ''
      this.generatedImages = []
    }
  }
})

