# Kinetic JS Image Slider

A high-octane, physics-based image slider built with Vanilla JavaScript, HTML, and CSS.

## 🌟 Project Overview
This project breaks away from traditional, boring carousel plugins. By utilizing a custom `requestAnimationFrame` render loop, we calculate velocity and momentum to create a slider that feels like a physical object with real inertia. 

## ✨ Features
- **Inertia Dragging:** The slider doesn't stop instantly when you let go. It glides to a halt based on the velocity of your mouse/touch movement.
- **Velocity-Based Transforms:** As the slider moves, images dynamically scale and skew based on the speed of the movement, creating a "motion blur" or kinetic effect.
- **Parallax Typography:** Text elements move at slightly different speeds than the background track to create immersive depth.

## 🚀 Technologies
- **HTML5 & CSS3**
- **Vanilla JavaScript** (No jQuery, no heavy slider libraries)

## 🧠 Engineering Concepts & Architecture
- **Linear Interpolation (Lerp):** The core of the physics system. Instead of setting the element's position directly to the mouse position, we constantly lerp the element's current position toward the target position, creating an inherently smooth, spring-like follow effect.
- **Render Loop:** All DOM manipulation happens inside a single `requestAnimationFrame` tick, decoupling the logic from the unpredictable firing rates of `mousemove` events and ensuring strict 60fps performance.

## 🏆 What Makes This Project Feel Premium
The tactile feedback. Traditional websites feel digital and weightless. By introducing physics, inertia, and velocity-based visual distortions, the interface feels tangible. This interaction psychology is heavily used in premium automotive showcases and high-end fashion portfolios to convey quality.

## 🛠 Setup Instructions
Simply open `index.html` in your browser. No build steps required.
