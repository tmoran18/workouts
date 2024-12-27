'use client'

import { create } from 'zustand'

interface ExerciseFilters {
  searchQuery: string
  bodyPart: string | null
  category: string | null
}

interface ExerciseStore {
  filters: ExerciseFilters
  setSearchQuery: (query: string) => void
  setBodyPart: (bodyPart: string | null) => void
  setCategory: (category: string | null) => void
  resetFilters: () => void
}

export const useExerciseStore = create<ExerciseStore>(set => ({
  filters: {
    searchQuery: '',
    bodyPart: null,
    category: null,
  },
  setSearchQuery: query =>
    set(state => ({
      filters: { ...state.filters, searchQuery: query },
    })),
  setBodyPart: bodyPart =>
    set(state => ({
      filters: { ...state.filters, bodyPart },
    })),
  setCategory: category =>
    set(state => ({
      filters: { ...state.filters, category },
    })),
  resetFilters: () =>
    set({
      filters: { searchQuery: '', bodyPart: null, category: null },
    }),
}))
