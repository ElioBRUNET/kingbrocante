/**
 * Estimation request submission — sends the form (with photos) straight to
 * the owner's inbox via Web3Forms (https://web3forms.com), a free
 * form-to-email API. No backend/server needed since this is a static site.
 *
 * Setup: create a free access key at https://web3forms.com using the
 * owner's email, then set business.web3formsAccessKey. Until that's set,
 * submitEstimationRequest() returns "not_configured".
 *
 * Web3Forms' free tier caps each attachment at 1MB, so photos are resized
 * and re-encoded client-side (see compressPhoto) before being sent — this
 * also makes uploads faster on mobile connections.
 */

import { business } from "../data/business";

export type EstimationPayload = {
  name: string;
  phone: string;
  email: string;
  objectType: string;
  description: string;
  photos: File[];
};

export type EstimationResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "network_error" };

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const MAX_ATTACHMENT_BYTES = 950 * 1024; // stay under Web3Forms' 1MB free-tier cap
const MAX_DIMENSION = 1600; // px, longest side — plenty for a first-look estimation photo

/**
 * Resizes and re-encodes an image client-side so it fits under Web3Forms'
 * free-tier 1MB attachment limit. Falls back to the original file if the
 * browser can't decode it (e.g. an unsupported format) — Web3Forms will
 * then just reject that one attachment rather than the whole submission.
 */
async function compressPhoto(file: File): Promise<File> {
  if (file.size <= MAX_ATTACHMENT_BYTES) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    let quality = 0.85;
    let blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality)
    );

    while (blob && blob.size > MAX_ATTACHMENT_BYTES && quality > 0.35) {
      quality -= 0.15;
      blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
    }

    if (!blob) return file;
    const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], newName, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export async function submitEstimationRequest(
  payload: EstimationPayload
): Promise<EstimationResult> {
  if (!business.web3formsAccessKey) {
    return { ok: false, reason: "not_configured" };
  }

  const fd = new FormData();
  fd.set("access_key", business.web3formsAccessKey);
  fd.set("subject", `Nouvelle demande d'estimation — ${payload.objectType || "objet"}`);
  fd.set("from_name", "Formulaire d'estimation — King Brocante");
  fd.set("name", payload.name);
  fd.set("phone", payload.phone);
  fd.set("email", payload.email || "Non renseigné");
  fd.set("objectType", payload.objectType);
  fd.set("description", payload.description || "Aucune description fournie");

  const compressedPhotos = await Promise.all(payload.photos.map(compressPhoto));
  compressedPhotos.forEach((file) => fd.append("attachment", file, file.name));

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, { method: "POST", body: fd });
    const json = await res.json().catch(() => null);
    if (!json?.success) {
      // Web3Forms responded but rejected the submission — log its actual
      // reason (invalid/unverified key, spam filter, etc.) since the UI
      // only shows a generic message.
      console.error("Web3Forms rejected the submission:", res.status, json);
    }
    return json?.success ? { ok: true } : { ok: false, reason: "network_error" };
  } catch (err) {
    console.error("Web3Forms request failed:", err);
    return { ok: false, reason: "network_error" };
  }
}
