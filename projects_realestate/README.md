# Luxury Parallax Real Estate 

A premium, cinematic real estate portfolio/landing page showcasing high-end properties using Next.js and Framer Motion.

## 🌟 Project Overview
This project completely reimagines the traditional property listing grid. By utilizing slow-easing parallax backgrounds and staggered entry animations, it creates an immersive "million-dollar brand" experience. It avoids feeling like a standard database and instead feels like a curated, high-end architectural brochure.

## ✨ Features
- **Cinematic Parallax Backgrounds:** Scroll-linked background movements to create immense depth.
- **Ambient Micro-Animations:** Staggered, slow-easing property card reveals using `framer-motion`.
- **Luxury Branding:** A stark, high-contrast visual hierarchy prioritizing massive typography and premium photography.
- **SSG Rendering:** Utilizes Next.js `getStaticProps` to render lighting-fast property grids for SEO advantages.

## 🚀 Technologies
- **Next.js** (Pages Router, SSG)
- **Framer Motion** (Motion Design & Parallax Binding)
- **Chakra UI** (Rapid styling & layout)

## 🧠 Engineering Concepts & Architecture
- **MotionValue Binding:** Using Framer Motion's `useScroll` and `useTransform` to bind DOM styles directly to scroll position, bypassing React state re-renders for 60fps parallax.
- **Staggered Variants:** Lists animate sequentially to guide the user's eye naturally down the page.

## 🏆 What Makes This Project Feel Premium
The *timing* of the animations. Everything moves with a highly deliberate `cubic-bezier` exponential easing. Instead of fast, snappy transitions, elements glide into place slowly, conveying confidence and luxury. The parallax effect creates a visual separation between the foreground text and the background estates, mimicking drone photography.

## 🛠 Setup Instructions
```bash
npm install
npm run dev
```
