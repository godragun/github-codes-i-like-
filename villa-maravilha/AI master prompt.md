# AI Master Prompt

If you want to recreate this application from scratch using a generative AI assistant, copy and paste the detailed prompt below:

---

## Detailed Prompt to Generate this App

**Role:** You are an expert Frontend Web Developer, well-versed in Next.js (App Router), React, Three.js, React Three Fiber, GSAP, Lenis, and Tailwind CSS.

**Goal:** Create an immersive, 3D scrolling web experience called "Villa Maravilha". 

**Technical Stack:**
- Next.js (latest, App Router)
- React (Client components for 3D/animations)
- Three.js & @react-three/fiber & @react-three/drei
- GSAP & GSAP ScrollTrigger for animations
- Lenis for smooth scrolling
- TailwindCSS for UI styling
- TypeScript

**Features & Requirements:**

1. **Project Setup & Architecture:**
   - Initialize a Next.js application with the App Router.
   - Use `page.tsx` as the main entry point to load a dynamically imported 3D Component (`VillaExperience`) without SSR (`ssr: false`), displaying a custom luxurious full-screen loading screen (black background with "Villa Maravilha" elegant text uppercase, Playfair Display font).

2. **The 3D Scene (VillaExperience Component):**
   - Create a canvas utilizing Three.js. Inside, set up an environment with advanced lighting (Directional Light, Ambient Light, RectAreaLight to act like soft window light). 
   - Ensure the canvas is fixed position (`fixed inset-0`), acting as the background for the entire page.
   - Add a detailed placeholder geometry (like a highly detailed Sofa model or room layout using primitive Three.js shapes or loading a GLTF if provided), making sure it casts and receives shadows.
   - Map a highly detailed `MeshStandardMaterial` to the main object (e.g., the sofa). Keep a reference (`useRef`) to this material to manipulate it later. 

3. **Smooth Scroll & Animation (GSAP + Lenis):**
   - Initialize Lenis for smooth scrolling across the page.
   - Map a `.scroll-container` div over the canvas. It should have a large height (e.g., `400vh` or multiple sections) to allow for a deeply nested scroll timeline.
   - Using GSAP ScrollTrigger, tie the camera's position and rotation (`camera.position`, `camera.rotation`) to the scroll progress. Define at least 3 distinct visual "stops" (keyframes) as the user scrolls down, representing different viewing angles of the model (e.g., wide shot, close up on texture, side profile).
   - Animate the HTML UI layers fading in and out depending on the ScrollTrigger progress markers. 

4. **Interactive Customization UI:**
   - Overlay HTML UI on top of the canvas (pointer events pass-through where no UI exists).
   - In an advanced section (revealed smoothly by GSAP), include a Swatch Selector.
   - Create 3 color swatches: "Nylon Ecru" (#E6E1D8), "Micro Light" (#8C7A6B), and "Concrete Shade" (#2D3032).
   - When a swatch is clicked, use GSAP to smoothly animate properties (RGB values `r, g, b` using `gsap.to`) on the 3D Object's material color.

5. **Aesthetics & Polish:**
   - Ensure typography and UI overlays align with a high-end luxury architectural brand (sans-serif and serif pairings, minimal tracked-out text).
   - The scene needs a background color that complements the high-end feel.
   - Add subtle post-processing if necessary to elevate visual fidelity. 

**Output Requirements:**
Provide all code separated by proper file paths. Ensure `package.json` reflects all necessary dependencies (`three`, `@react-three/fiber`, `gsap`, `lenis`, etc.). Give me the complete code for `src/app/page.tsx`, `src/components/VillaExperience.tsx`, `tailwind.config.js` (or similar), and any styling globals required to run it immediately.
