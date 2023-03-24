import { create } from 'zustand'

const prefix = '/api/v1'

export const useStore = create((set, get: any) => ({
  data: {},
  isFetching: false,
  isFetched: false,
  error: "",
  fetchDb: async (id: string) => {
    set({ isFetching: true })
    const response = await fetch(`${prefix}/db`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id, sorts: get().sorts}),
    })
    if (response.status > 300) {
      set({
        isFetching: false,
        isFetched: true,
        error: (await response.json()).message
      })
      return
    }
    set({ data: await response.json(),
      isFetching: false, isFetched: true
    })
  },
  sorts: [],
  addSort: (property: string, direction: string) => {
    const {fetchDb, sorts} = get()
    const result = sorts
      .filter((item: any) => item.property !== property)
    set({ sorts: [...result, { property, direction }]})
    fetchDb()
  },
  removeSort: (property: string) => {
    const {fetchDb, sorts} = get()
    const result = sorts
      .filter((item: any) => item.property !== property)
    set({ sorts: result })
    fetchDb()
  },
  filter: {},
  addFilter: (property: string, type: string,input: any) => {
    if (!property) {
      return
    }
    const {fetchDb, filter } = get()
    set({
      filter: {
        property,
        [type]: {
          contains: input,
        },
      }
    })
    fetchDb()
  },
  removeFilter: (property: string) => {
    const {fetchDb, filter} = get()
    set({
      filter: {}
    })
  }
}))
