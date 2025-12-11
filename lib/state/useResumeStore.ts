import { create } from 'zustand';
import { ResumeElement } from '@/lib/types/ResumeElement';

interface ResumeStore {
  elements: ResumeElement[];
  selectedId: string | null;
  
  // Actions
  addElement: (element: ResumeElement) => void;
  updateElement: (id: string, updates: Partial<ResumeElement>) => void;
  deleteElement: (id: string) => void;
  setSelectedId: (id: string | null) => void;
  clearSelection: () => void;
  loadElements: (elements: ResumeElement[]) => void;
}

const defaultElementProps = {
  x: 100,
  y: 100,
  width: 200,
  height: 50,
  rotation: 0,
};

export const useResumeStore = create<ResumeStore>((set) => ({
  elements: [],
  selectedId: null,

  addElement: (element) =>
    set((state) => ({
      elements: [...state.elements, element],
      selectedId: element.id,
    })),

  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    })),

  deleteElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    })),

  setSelectedId: (id) => set({ selectedId: id }),

  clearSelection: () => set({ selectedId: null }),

  loadElements: (elements) => set({ elements }),
}));

