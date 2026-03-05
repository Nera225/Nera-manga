import { ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { ScreenContainer } from "@/components/screen-container";
import { useAppStore } from "@/lib/store";
import { useRouter } from "expo-router";
import { useState } from "react";

/**
 * Écran d'accueil - Point d'entrée principal de l'application
 * Permet à l'utilisateur d'importer des images ou des dossiers de manga
 */
export default function HomeScreen() {
  const router = useRouter();
  const {
    mangaImages,
    addMangaImage,
    clearMangaImages,
    translationMode,
    setTranslationMode,
    history,
  } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Importe une image depuis la galerie
   */
  const handleImportImage = async () => {
    try {
      setIsLoading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const asset = result.assets[0];
        const imageId = `img_${Date.now()}`;

        addMangaImage({
          id: imageId,
          uri: asset.uri,
          name: asset.fileName || "Image",
          timestamp: Date.now(),
          translated: false,
        });

        // Naviguer vers l'écran de lecteur
        router.push("../reader");
      }
    } catch (error) {
      console.error("Error importing image:", error);
      Alert.alert("Erreur", "Impossible d'importer l'image");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Importe plusieurs images depuis la galerie
   */
  const handleImportMultiple = async () => {
    try {
      setIsLoading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        clearMangaImages();

        result.assets.forEach((asset, index) => {
          const imageId = `img_${Date.now()}_${index}`;
          addMangaImage({
            id: imageId,
            uri: asset.uri,
            name: asset.fileName || `Image ${index + 1}`,
            timestamp: Date.now() + index,
            translated: false,
          });
        });

        // Naviguer vers l'écran de lecteur
        router.push("../reader");
      }
    } catch (error) {
      console.error("Error importing multiple images:", error);
      Alert.alert("Erreur", "Impossible d'importer les images");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Change le mode de traduction
   */
  const toggleTranslationMode = () => {
    setTranslationMode(translationMode === "overlay" ? "replace" : "overlay");
  };

  /**
   * Navigue vers l'historique
   */
  const handleViewHistory = () => {
    if (history.length === 0) {
      Alert.alert("Historique vide", "Aucune traduction n'a été effectuée");
      return;
    }
    router.push("../history");
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-8">
          {/* En-tête */}
          <View className="items-center gap-2 mt-4">
            <Text className="text-4xl font-bold text-foreground">
              Manga Translator
            </Text>
            <Text className="text-base text-muted text-center">
              Traduisez automatiquement vos mangas du japonais au français
            </Text>
          </View>

          {/* Boutons d'import */}
          <View className="gap-4">
            {/* Bouton importer une image */}
            <TouchableOpacity
              onPress={handleImportImage}
              disabled={isLoading}
              className="bg-primary rounded-xl p-4 active:opacity-80"
            >
              <Text className="text-white font-semibold text-center text-lg">
                📷 Importer une image
              </Text>
            </TouchableOpacity>

            {/* Bouton importer plusieurs images */}
            <TouchableOpacity
              onPress={handleImportMultiple}
              disabled={isLoading}
              className="bg-primary rounded-xl p-4 active:opacity-80"
            >
              <Text className="text-white font-semibold text-center text-lg">
                📁 Importer plusieurs images
              </Text>
            </TouchableOpacity>
          </View>

          {/* Mode de traduction */}
          <View className="bg-surface rounded-xl p-4 gap-3">
            <Text className="text-sm text-muted font-semibold">
              Mode de traduction actuel
            </Text>
            <View className="flex-row gap-2 items-center">
              <View className="flex-1">
                <Text className="text-foreground font-semibold">
                  {translationMode === "overlay"
                    ? "Mode 1: Superposition"
                    : "Mode 2: Remplacement"}
                </Text>
                <Text className="text-xs text-muted mt-1">
                  {translationMode === "overlay"
                    ? "La traduction s'affiche sur le texte original"
                    : "Le texte original est remplacé par la traduction"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={toggleTranslationMode}
                className="bg-primary rounded-lg px-4 py-2"
              >
                <Text className="text-white font-semibold text-sm">
                  Changer
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Historique */}
          {history.length > 0 && (
            <View className="bg-surface rounded-xl p-4 gap-3">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-sm text-muted font-semibold">
                    Historique
                  </Text>
                  <Text className="text-foreground font-semibold mt-1">
                    {history.length} traduction{history.length > 1 ? "s" : ""}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={handleViewHistory}
                  className="bg-primary rounded-lg px-4 py-2"
                >
                  <Text className="text-white font-semibold text-sm">
                    Voir
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Informations */}
          <View className="bg-surface rounded-xl p-4 gap-2">
            <Text className="text-sm text-muted font-semibold">
              Comment ça marche ?
            </Text>
            <Text className="text-xs text-muted leading-relaxed">
              1. Importez une image ou plusieurs images de manga{"\n"}
              2. Appuyez sur "Traduire" pour lancer l'OCR{"\n"}
              3. Le texte japonais est détecté et traduit{"\n"}
              4. Visualisez la traduction selon le mode sélectionné
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
