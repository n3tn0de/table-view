import { create } from 'zustand'

const prefix = '/api/v1'

export const useStore = create((set) => ({
  data: {},
  isFetching: false,
  isFetched: false,
  error: "",
  fetchDb: async (id='') => {
    set({ isFetching: true })
    const response = await fetch(`${prefix}/db/${id}`)
    if (response.status > 300) {
      set({ isFetching: false, isFetched: true, error: (await response.json()).message })
      return
    }
    set({ data: await response.json(), isFetching: false, isFetched: true })
  },
}))
