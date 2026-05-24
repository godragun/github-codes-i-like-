# 3D CSS Perpetual Image Slider

A futuristic, mathematically precise 3D carousel built entirely without JavaScript.

## 🌟 Project Overview
This project demonstrates how powerful pure CSS can be for creating immersive 3D experiences. By leveraging CSS variables and mathematical calculations within `calc()`, this slider arranges images into a perfect 3D cylinder that rotates perpetually in space. 

## ✨ Features
- **Zero JavaScript:** 100% of the mathematical positioning and animation is handled natively by the CSS engine.
- **Saturn-Ring Perspective:** Uses CSS `perspective` and `transform-style: preserve-3d` to create vast depth.
- **Dynamic CSS Variables:** Items are positioned automatically based on their `--position` and `--quantity` inline variables.
- **Hover Interaction:** The perpetual motion can be paused on hover to allow users to investigate individual frames.

## 🚀 Technologies
- **HTML5**
- **CSS3** (Variables, 3D Transforms, Keyframe Animations)

## 🧠 Engineering Concepts & Architecture
- **Hardware Acceleration:** By exclusively animating `transform` properties (`rotateY`), the browser offloads the rendering to the GPU, guaranteeing a locked 60 FPS even on mobile devices.
- **Polar Coordinates to Cartesian:** The CSS `calc()` function essentially converts an angle and a radius (`translateZ`) into physical 3D space, mimicking polar coordinate logic directly in the stylesheet.

## 🏆 What Makes This Project Feel Premium
The absolute lack of stutter. Because there is no JavaScript event loop fighting for main thread resources, the infinite animation is buttery smooth. The depth effect combined with a moody, dark-mode aesthetic gives it a cyber-security or high-end digital agency vibe.

## 🛠 Setup Instructions
Simply open `index.html` in your browser. No build steps required.
