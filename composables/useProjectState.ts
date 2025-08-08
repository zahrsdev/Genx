export const useProjectState = () => useState('project', () => ({
  brand: null as any,
  variants: [] as any[],
}))

export const useWizard = () => useState('wizard', () => ({ step: 1 }))

