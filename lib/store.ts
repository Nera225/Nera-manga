/**
 * Store Zustand pour gérer l'état global de l'application
 */

import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";

export type TranslationMode = "overlay" | "replace";

export interface MangaImage {
  id: string;
  uri: string;
  name: string;
  timestamp: number;
  translated: boolean;
  translatedUri?: string;
  originalText?: string;
  translatedText?: string;
}

export interface AppState {
  // Mode de traduction
  translationMode: TranslationMode;
  setTranslationMode: (mode: TranslationMode) => void;

  // Images du manga
  mangaImages: MangaImage[];
  addMangaImage: (image: MangaImage) => void;
  removeMangaImage: (id: string) => void;
  updateMangaImage: (id: string, updates: Partial<MangaImage>) => void;
  clearMangaImages: () => void;

  // Image actuelle
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;

  // État de traduction
  isTranslating: boolean;
  setIsTranslating: (translating: boolean) => void;
  translationProgress: number;
  setTranslationProgress: (progress: number) => void;

  // Historique
  history: MangaImage[];
  addToHistory: (image: MangaImage) => void;
  clearHistory: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Mode de traduction
      translationMode: "overlay",
      setTranslationMode: (mode) => set({ translationMode: mode }),

      // Images du manga
      mangaImages: [],
      addMangaImage: (image) =>
        set((state) => ({
          mangaImages: [...state.mangaImages, image],
        })),
      removeMangaImage: (id) =>
        set((state) => ({
          mangaImages: state.mangaImages.filter((img) => img.id !== id),
        })),
      updateMangaImage: (id, updates) =>
        set((state) => ({
          mangaImages: state.mangaImages.map((img) =>
            img.id === id ? { ...img, ...updates } : img
          ),
        })),
      clearMangaImages: () => set({ mangaImages: [] }),

      // Image actuelle
      currentImageIndex: 0,
      setCurrentImageIndex: (index) => set({ currentImageIndex: index }),

      // État de traduction
      isTranslating: false,
      setIsTranslating: (translating) => set({ isTranslating: translating }),
      translationProgress: 0,
      setTranslationProgress: (progress) =>
        set({ translationProgress: progress }),

      // Historique
      history: [],
      addToHistory: (image) =>
        set((state) => ({
          history: [image, ...state.history].slice(0, 50), // Garder les 50 derniers
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "manga-translator-store",
      storage: {
        getItem: async (name) => {
          try {
            const item = await AsyncStorage.getItem(name);
            return item ? JSON.parse(item) : null;
          } catch (error) {
            console.error("Error reading from AsyncStorage:", error);
            return null;
          }
        },
        setItem: async (name, value) => {
          try {
            await AsyncStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.error("Error writing to AsyncStorage:", error);
          }
        },
        removeItem: async (name) => {
          try {
            await AsyncStorage.removeItem(name);
          } catch (error) {
            console.error("Error removing from AsyncStorage:", error);
          }
        },
      },
    }
  )
);
