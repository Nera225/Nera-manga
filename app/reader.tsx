import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAppStore } from "@/lib/store";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";


/**
 * Écran de lecteur de manga
 * Affiche l'image avec les fonctionnalités de zoom, déplacement et traduction
 */
export default function ReaderScreen() {
  const router = useRouter();
  const {
    mangaImages,
    currentImageIndex,
    setCurrentImageIndex,
    isTranslating,
    setIsTranslating,
    translationProgress,
    setTranslationProgress,
    updateMangaImage,
  } = useAppStore();

  const [scale, setScale] = useState(1);
  const [showTranslation, setShowTranslation] = useState(false);

  const currentImage = mangaImages[currentImageIndex];

  /**
   * Navigue vers la page suivante
   */
  const handleNextPage = () => {
    if (currentImageIndex < mangaImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setShowTranslation(false);
      setScale(1);
    }
  };

  /**
   * Navigue vers la page précédente
   */
  const handlePreviousPage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      setShowTranslation(false);
      setScale(1);
    }
  };

  /**
   * Lance la traduction de l'image
   */
  const handleTranslate = async () => {
    if (!currentImage || isTranslating) return;

    try {
      setIsTranslating(true);
      setTranslationProgress(0);

      // Simuler la progression OCR
      setTranslationProgress(30);

      // Simuler la lecture de l'image
      // En production, utiliser expo-file-system pour lire l'image

      setTranslationProgress(60);

      // Simuler la traduction (en production, utiliser le service OCR réel)
      // Pour l'instant, on affiche juste un message de succès
      setTranslationProgress(100);

      updateMangaImage(currentImage.id, {
        translated: true,
        originalText: "Texte japonais détecté",
        translatedText: "Texte français traduit",
      });

      setShowTranslation(true);
      setTranslationProgress(0);
    } catch (error) {
      console.error("Translation error:", error);
      Alert.alert("Erreur", "Impossible de traduire l'image");
      setTranslationProgress(0);
    } finally {
      setIsTranslating(false);
    }
  };

  if (!currentImage) {
    return (
      <ScreenContainer className="justify-center items-center">
        <Text className="text-foreground text-lg">Aucune image sélectionnée</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 bg-primary px-6 py-2 rounded-lg"
        >
          <Text className="text-white font-semibold">Retour</Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="flex-1">
      {/* Barre supérieure */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-surface border-b border-border">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2"
        >
          <Text className="text-primary text-lg">← Retour</Text>
        </TouchableOpacity>

        <Text className="text-sm text-muted font-semibold">
          {currentImageIndex + 1} / {mangaImages.length}
        </Text>

        <TouchableOpacity
          onPress={handleTranslate}
          disabled={isTranslating}
          className={`px-3 py-2 rounded-lg ${
            isTranslating ? "bg-muted" : "bg-primary"
          }`}
        >
          <Text className="text-white font-semibold text-sm">
            {isTranslating ? "..." : "Traduire"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Zone d'affichage de l'image */}
      <ScrollView
        className="flex-1"
        scrollEnabled={scale > 1}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 justify-center items-center bg-background">
          {isTranslating && (
            <View className="absolute inset-0 bg-black/50 justify-center items-center z-10">
              <View className="bg-surface rounded-lg p-6 items-center gap-4">
                <Text className="text-foreground font-semibold">
                  Traduction en cours...
                </Text>
                <View className="w-32 h-2 bg-border rounded-full overflow-hidden">
                  <View
                    className="h-full bg-primary"
                    style={{ width: `${translationProgress}%` }}
                  />
                </View>
                <Text className="text-sm text-muted">
                  {translationProgress}%
                </Text>
              </View>
            </View>
          )}

          <Image
            source={{ uri: currentImage.uri }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
              transform: [{ scale }],
            }}
          />

          {/* Affichage de la traduction */}
          {showTranslation && currentImage.translated && (
            <View className="absolute inset-0 bg-black/30 justify-center items-center">
              <View className="bg-surface rounded-lg p-6 max-w-xs">
                <Text className="text-sm text-muted font-semibold mb-2">
                  Texte original (Japonais)
                </Text>
                <Text className="text-foreground mb-4">
                  {currentImage.originalText}
                </Text>

                <Text className="text-sm text-muted font-semibold mb-2">
                  Traduction (Français)
                </Text>
                <Text className="text-foreground text-success font-semibold">
                  {currentImage.translatedText}
                </Text>

                <TouchableOpacity
                  onPress={() => setShowTranslation(false)}
                  className="mt-4 bg-primary px-4 py-2 rounded-lg"
                >
                  <Text className="text-white font-semibold text-center">
                    Fermer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Barre inférieure de navigation */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-surface border-t border-border">
        <TouchableOpacity
          onPress={handlePreviousPage}
          disabled={currentImageIndex === 0}
          className={`px-4 py-2 rounded-lg ${
            currentImageIndex === 0 ? "bg-muted" : "bg-primary"
          }`}
        >
          <Text className="text-white font-semibold">← Précédent</Text>
        </TouchableOpacity>

        <Text className="text-sm text-muted font-semibold">
          Page {currentImageIndex + 1}
        </Text>

        <TouchableOpacity
          onPress={handleNextPage}
          disabled={currentImageIndex === mangaImages.length - 1}
          className={`px-4 py-2 rounded-lg ${
            currentImageIndex === mangaImages.length - 1 ? "bg-muted" : "bg-primary"
          }`}
        >
          <Text className="text-white font-semibold">Suivant →</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
