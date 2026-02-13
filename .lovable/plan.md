

# TryMehendi — MVP Plan

## Overview
A single-page, mobile-first web app where users upload a hand photo and a mehendi design reference, then generate a preview by sending both to a backend API.

**Tech:** React + Vite + TypeScript + Tailwind CSS

---

## Page Layout (Single Page)

### Header
- App name "TryMehendi" with a small sparkle or paint brush icon
- Clean, minimal — white background, dark text, no gradients

### Upload Section
- **Two upload areas side by side (stacked on mobile):**
  1. **Hand Image** — dropzone/click-to-upload with a hand icon, shows thumbnail preview after upload
  2. **Mehendi Design** — dropzone/click-to-upload with a palette/image icon, shows thumbnail preview after upload
- Each upload area shows the selected image as a thumbnail preview
- File name displayed below the preview
- Option to remove/change each image

### Generate Button
- A prominent "Generate Preview" button with an arrow or wand icon
- Disabled until both images are uploaded
- Shows a loading spinner + "Generating..." text while waiting for the API response

### Result Section
- Appears below the button after a successful response
- Displays the generated mehendi preview image from the `result_url`
- A "Download" button with a download icon to save the result
- Option to "Try Again" which resets the form

---

## API Integration
- Sends `POST` request to a configurable backend URL (via environment variable)
- Uses `FormData` with both image files
- Handles loading, success, and error states
- Shows a toast notification on error

---

## Design Principles
- **White background, dark text, no gradients**
- Lucide icons throughout (no emojis)
- Mobile-first responsive layout
- Minimal, clean spacing
- Subtle borders and shadows for upload areas

