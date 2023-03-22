import { create } from 'zustand'

export const useStore = create((set) => ({
  data: {},
  fetch: async () => {
    const response = await fetch('/api/v1')
    set({ data: await response.json() })
  },
}))
