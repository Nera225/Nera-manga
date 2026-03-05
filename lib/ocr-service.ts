/**
 * Service OCR pour détecter le texte japonais dans les images de manga
 * Utilise Tesseract.js pour la reconnaissance optique de caractères
 */

import Tesseract from "tesseract.js";

export interface OCRResult {
  text: string;
  confidence: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface BubbleDetectionResult {
  bubbles: Array<{
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
  }>;
  rawText: string;
}

let ocrWorker: Tesseract.Worker | null = null;

/**
 * Initialise le worker Tesseract.js
 */
async function initializeOCRWorker(): Promise<Tesseract.Worker> {
  if (ocrWorker) {
    return ocrWorker;
  }

  try {
    ocrWorker = await Tesseract.createWorker("jpn", 1, {
      corePath: "https://cdn.jsdelivr.net/npm/tesseract.js-core@v5.2.0/",
    });

    return ocrWorker;
  } catch (error) {
    console.error("Failed to initialize OCR worker:", error);
    throw error;
  }
}

/**
 * Effectue la reconnaissance optique de caractères sur une image
 * @param imageUri - URI de l'image (chemin local ou URL)
 * @returns Promise avec les résultats OCR
 */
export async function performOCR(imageUri: string): Promise<OCRResult> {
  try {
    const worker = await initializeOCRWorker();

    const result = await worker.recognize(imageUri);

    return {
      text: result.data.text,
      confidence: result.data.confidence,
    };
  } catch (error) {
    console.error("OCR error:", error);
    throw error;
  }
}

/**
 * Détecte les bulles de dialogue dans une image manga
 * @param imageUri - URI de l'image
 * @returns Promise avec les bulles détectées
 */
export async function detectMangaBubbles(
  imageUri: string
): Promise<BubbleDetectionResult> {
  try {
    const worker = await initializeOCRWorker();

    const result = await worker.recognize(imageUri);

    // Extraire les bulles détectées avec leurs positions
    const bubbles = (result.data as any).lines
      .filter((line: any) => line.text.trim().length > 0)
      .map((line: any) => ({
        text: line.text,
        x: line.bbox.x0,
        y: line.bbox.y0,
        width: line.bbox.x1 - line.bbox.x0,
        height: line.bbox.y1 - line.bbox.y0,
        confidence: line.confidence,
      }));

    return {
      bubbles,
      rawText: result.data.text,
    };
  } catch (error) {
    console.error("Bubble detection error:", error);
    throw error;
  }
}

/**
 * Libère les ressources du worker OCR
 */
export async function terminateOCRWorker(): Promise<void> {
  if (ocrWorker) {
    await ocrWorker.terminate();
    ocrWorker = null;
  }
}

/**
 * Effectue l'OCR avec une image en base64
 * @param base64Image - Image encodée en base64
 * @returns Promise avec les résultats OCR
 */
export async function performOCRFromBase64(
  base64Image: string
): Promise<OCRResult> {
  try {
    const worker = await initializeOCRWorker();

    const result = await worker.recognize(`data:image/png;base64,${base64Image}`);

    return {
      text: result.data.text,
      confidence: result.data.confidence,
    };
  } catch (error) {
    console.error("OCR from base64 error:", error);
    throw error;
  }
}
