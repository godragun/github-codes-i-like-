# Floating 3D CSS Product Presentation

A hyper-modern, interactive product showcase built entirely with CSS 3D transforms and Vanilla JavaScript.

## 🌟 Project Overview
This project transforms a flat 2D product image into an immersive, zero-gravity 3D experience. By tracking mouse movements and applying inverse parallax calculations to the background elements, the scene gains vast depth and interactivity without the overhead of WebGL or Three.js.

## ✨ Features
- **Zero-Gravity Animation:** The product and surrounding elements breathe via a slow CSS `@keyframes` animation, creating a weightless feel.
- **Interactive Depth:** The product tilts to "look" at the cursor, while the background rocks shift in the opposite direction.
- **Bokeh Effect:** Background elements utilize CSS `filter: blur()` to simulate a shallow camera depth of field.

## 🚀 Technologies
- **HTML5 & CSS3** (3D Transforms, Variables, Filters)
- **Vanilla JavaScript** (Mouse coordinate tracking)

## 🧠 Engineering Concepts & Architecture
- **Separation of Concerns:** JavaScript does zero DOM styling. It simply updates `--x` and `--y` custom CSS variables on the root. The CSS engine handles the actual math and transformation using `calc()`. This is significantly more performant than updating `style.transform` repeatedly in JS.

## 🏆 What Makes This Project Feel Premium
The subtlety of the mouse tracking. A common mistake is to make elements whip around aggressively. Here, a slight CSS `transition` is applied to the transform, smoothing out the mouse data and giving the product a sense of physical mass. The blurred background rocks create cinematic depth.

## 🛠 Setup Instructions
Simply open `index.html` in your browser. No build steps required.
