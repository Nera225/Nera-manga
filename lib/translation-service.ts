/**
 * Service de traduction pour convertir du texte japonais en français
 * Utilise l'API Google Translate via une approche proxy
 */

export interface TranslationResult {
  originalText: string;
  translatedText: string;
  confidence?: number;
}

/**
 * Traduit un texte du japonais vers le français
 * @param text - Le texte japonais à traduire
 * @returns Promise avec le texte traduit
 */
export async function translateJapaneseToFrench(text: string): Promise<string> {
  if (!text || text.trim().length === 0) {
    return "";
  }

  try {
    // Utiliser l'API MyMemory Translation API (gratuite, pas de clé requise)
    const encodedText = encodeURIComponent(text);
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=ja|fr`
    );

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    } else {
      console.warn("Translation API returned unexpected response:", data);
      return text; // Retourner le texte original si la traduction échoue
    }
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Retourner le texte original en cas d'erreur
  }
}

/**
 * Traduit plusieurs textes en parallèle
 * @param texts - Array de textes à traduire
 * @returns Promise avec array de textes traduits
 */
export async function translateMultiple(texts: string[]): Promise<string[]> {
  const results = await Promise.all(
    texts.map((text) => translateJapaneseToFrench(text))
  );
  return results;
}

/**
 * Traduit un texte avec un délai pour éviter le rate limiting
 * @param text - Le texte à traduire
 * @param delayMs - Délai en millisecondes avant la traduction
 * @returns Promise avec le texte traduit
 */
export async function translateWithDelay(
  text: string,
  delayMs: number = 100
): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const result = await translateJapaneseToFrench(text);
      resolve(result);
    }, delayMs);
  });
}
