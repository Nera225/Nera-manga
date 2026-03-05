import { View, Text, TouchableOpacity, ScrollView, Alert, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAppStore } from "@/lib/store";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

/**
 * Écran d'historique
 * Affiche les pages traduites précédemment
 */
export default function HistoryScreen() {
  const router = useRouter();
  const { history, clearHistory } = useAppStore();

  /**
   * Affiche une confirmation avant de supprimer l'historique
   */
  const handleClearHistory = () => {
    Alert.alert(
      "Supprimer l'historique",
      "Êtes-vous sûr de vouloir supprimer tout l'historique ?",
      [
        { text: "Annuler", onPress: () => {} },
        {
          text: "Supprimer",
          onPress: () => {
            clearHistory();
            Alert.alert("Succès", "L'historique a été supprimé");
          },
          style: "destructive",
        },
      ]
    );
  };

  /**
   * Formate la date
   */
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (history.length === 0) {
    return (
      <ScreenContainer className="justify-center items-center p-6">
        <View className="items-center gap-4">
          <Text className="text-2xl">📋</Text>
          <Text className="text-lg font-semibold text-foreground">
            Historique vide
          </Text>
          <Text className="text-sm text-muted text-center">
            Aucune traduction n'a été effectuée pour le moment
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-4 bg-primary px-6 py-2 rounded-lg"
          >
            <Text className="text-white font-semibold">Retour</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="flex-1">
      {/* Barre supérieure */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-surface border-b border-border">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Text className="text-primary text-lg">← Retour</Text>
        </TouchableOpacity>

        <Text className="text-foreground font-semibold">Historique</Text>

        <TouchableOpacity
          onPress={handleClearHistory}
          className="p-2"
        >
          <Text className="text-error text-lg">🗑️</Text>
        </TouchableOpacity>
      </View>

      {/* Liste de l'historique */}
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12, gap: 12 }}
        renderItem={({ item, index }) => (
          <View className="bg-surface rounded-lg overflow-hidden border border-border">
            {/* Miniature */}
            <Image
              source={{ uri: item.uri }}
              style={{
                width: "100%",
                height: 120,
                resizeMode: "cover",
              }}
            />

            {/* Informations */}
            <View className="p-3 gap-2">
              <Text className="text-sm font-semibold text-foreground">
                {item.name}
              </Text>
              <Text className="text-xs text-muted">
                {formatDate(item.timestamp)}
              </Text>

              {item.translated && (
                <View className="mt-2 pt-2 border-t border-border">
                  <Text className="text-xs text-success font-semibold">
                    ✓ Traduit
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      />

      {/* Résumé */}
      <View className="px-4 py-3 bg-surface border-t border-border">
        <Text className="text-sm text-muted text-center">
          {history.length} traduction{history.length > 1 ? "s" : ""} dans l'historique
        </Text>
      </View>
    </ScreenContainer>
  );
}
