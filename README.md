# github-codes-i-like-

<p align="center">
  <img src="images/Screenshot%202026-05-24%20010033.png" alt="Screenshot 2026-05-24 010033" width="225"/>
  <img src="images/Screenshot%202026-05-25%20122538.png" alt="Screenshot 2026-05-25 122538" width="225"/>
  <img src="images/Screenshot%202026-05-25%20122624.png" alt="Screenshot 2026-05-25 122624" width="225"/>
</p>

This repository contains a curated collection of code snippets and mini-projects in various domains, such as web design, UI effects, games, and more. Each folder showcases a working example or interesting technique, perfect for quick reference or inspiration.

## What's Inside?

- **3D-Rotation-Effect:** Creative 3D rotation animations, likely with HTML/CSS/JS.
- **Crazy-3D-Image-Slider-Effects-Using-CSS-Only:** Complex image slider effects using only CSS.
- **Create-A-Slider-Crazy-Effects-Using-HTML-CSS-And-Javascript:** Advanced sliders using HTML, CSS, and JS.
- **ExploreScape-Travel-website:** A travel website demo site.
- **narrative-game:** A basic narrative-driven game.
- **parallax-scrolling-website:** A site demonstrating parallax scrolling principles.
- **physics-with-rapier-and-three:** Web physics experiments.
- **projects_realestate:** Real estate projects (details inside).
- **villa-maravilha:** Presumably a villa webpage or project.

## Code Previews

Below are previews illustrating some core code from key projects. You can replace these with real screenshots if you prefer images.

### 3D-Rotation-Effect
```html
<!-- 3D-Rotation-Effect/index.html (Preview) -->
<div class="cube">
  <div class="face front"></div>
  <div class="face back"></div>
  ...
</div>
```

### Crazy-3D-Image-Slider-Effects-Using-CSS-Only
```css
/* Crazy-3D-Image-Slider-Effects-Using-CSS-Only/style.css (Preview) */
.slider {
  perspective: 1200px;
}
.slide {
  transform: rotateY(45deg) translateZ(200px);
  ...
}
```

### Create-A-Slider-Crazy-Effects-Using-HTML-CSS-And-Javascript
```js
// Create-A-Slider-Crazy-Effects-Using-HTML-CSS-And-Javascript/script.js (Preview)
document.querySelector('.next').addEventListener('click', function() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
});
```

### ExploreScape-Travel-website
```html
<!-- ExploreScape-Travel-website/index.html (Preview) -->
<header>
  <h1>Welcome to ExploreScape</h1>
</header>
```

### parallax-scrolling-website
```css
/* parallax-scrolling-website/style.css (Preview) */
.parallax {
  background-image: url('mountains.jpg');
  height: 500px;
  background-attachment: fixed;
  ...
}
```

*(For other folders, explore contents for similar previews.)*

---

## How These Projects Help

- **Reference:** Use as templates for your own projects.
- **Learning:** Study clean implementations of interactive web components.
- **Inspiration:** See working code for modern, engaging UI effects.

---

## How to Use

1. **Clone the repository:**
   ```sh
   git clone https://github.com/godragun/github-codes-i-like-.git
   ```

2. **Try out a project:**  
   Navigate to a project folder and open the `index.html` or read included files for usage.

3. **Pull for updates:**
   ```sh
   git pull origin main
   ```

4. **Push your changes (if you have write access):**
   ```sh
   git add .
   git commit -m "Describe your changes"
   git push origin main
   ```

---

## Contributing

Feel free to submit pull requests or open issues to improve examples or add your own favorite codes.

---

**Happy coding!**
