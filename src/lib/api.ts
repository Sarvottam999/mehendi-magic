const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface GenerateResponse {
  result_url: string;
}

export async function generatePreview(
  handImage: File,
  mehendiDesign: File
): Promise<GenerateResponse> {
  const formData = new FormData();
  formData.append("hand_image", handImage);
  formData.append("mehendi_design", mehendiDesign);

  const response = await fetch(`${API_URL}/generate`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Generation failed (${response.status})`);
  }

  return response.json();
}
