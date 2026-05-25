# Villa Maravilha 3D Experience

This is an immersive, interactive 3D web experience built with **Next.js**, **Three.js** / **React Three Fiber**, and **GSAP**. It allows users to explore a 3D villa scene using scroll-based animations and interactively customize features, such as changing the color and material swatches of a sofa model.

## Features

- **3D Rendering:** Uses Three.js to render a realistic, interactive villa/furniture model.
- **Scroll Animations:** Integrated with GSAP and ScrollTrigger for a smooth storytelling experience tied to user scroll.
- **Interactive UI:** Customize the elements inside the model in real time (e.g., color swatches).
- **Smooth Scrolling:** Uses Lenis for seamless scroll interactions.
- **Next.js App Router:** Built heavily utilizing Next.js, optimized for performance and smooth transitions.

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 18 or above is recommended).

## How to Run the Project Locally

1. **Open your Terminal:** Navigate to the folder containing this project.
2. **Install Dependencies:** Run the following command to download all required packages:
   npm install

3. **Start the Development Server:** After installation is complete, run:
   npm run dev

4. **Open in Browser:** Once the server is running, open your browser and navigate to:
   http://localhost:3000

## How to Use It

- **Scroll down** the page to see the camera dynamically animate and shift perspectives around the scene.
- Use the **customization menu** overlaid on the screen to change the fabric/swatch colors of the furniture dynamically in real-time.
- Wait for the initial loading screen to complete, as the 3D model takes a second to establish textures, lighting, and geometries.
