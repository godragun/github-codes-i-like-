# ExploreScape Travel Website

A highly immersive, cinematic travel landing page built with layered parallax effects to simulate deep 3D environments.

## 🌟 Project Overview
This project demonstrates how to use 2D image layering and GSAP ScrollTrigger to create an illusion of vast physical depth. By moving foreground, midground, and background elements at different speeds relative to the user's scroll, the website acts as an interactive diorama, instantly pulling the user into a nature documentary-style experience.

## ✨ Features
- **Layered Parallax Scrolling:** Foreground trees, typography, and background mountains move at calculated differential speeds.
- **Cinematic Storytelling:** The user discovers the content by physically scrolling "through" the forest.
- **Smooth Interpolation:** Prevents native scrollbar jitter to ensure a premium, heavy, and deliberate scrolling experience.

## 🚀 Technologies
- **HTML5 / CSS3**
- **JavaScript (Vanilla)**
- **GSAP (GreenSock Animation Platform)**
- **ScrollTrigger**

## 🧠 Engineering Concepts & Architecture
- **Depth Illusion via `translateY`:** Binds the `y` position of absolutely positioned PNG layers to the scroll event using GSAP's optimized requestAnimationFrame loop.
- **Z-Index Layering:** Typography is sandwiched between environmental layers to ground it within the world.

## 🏆 What Makes This Project Feel Premium
The seamless integration of typography into the environment. Because the text scales and moves relative to the trees in front of it and the mountains behind it, it feels like a physical object in a 3D space rather than flat text on a screen. The smooth scroll dampening gives the entire page "weight."

## 🛠 Setup Instructions
Simply open `index.html` in your browser or run a live server:
```bash
npx serve .
```
