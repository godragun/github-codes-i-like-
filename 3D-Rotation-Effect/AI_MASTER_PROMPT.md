# AI MASTER PROMPT: 3D CSS Product Rotation

## PROJECT VISION
**Emotional Feeling:** Weightless, mystical, and hyper-modern.
**Brand Energy:** High-end energy drink, boutique skincare, or luxury tech product.
**Cinematic Inspiration:** Zero-gravity product shots, floating debris in space.
**Style:** Awwwards-style product landing page, interactive CSS 3D.
**Why:** E-commerce needs to move beyond flat product grids. Suspending a product in 3D space with floating parallax elements (rocks, hills) creates a "hero" moment that elevates the perceived value of the product instantly.

## USER EXPERIENCE FLOW
1. **Initial View:** A highly rendered product (e.g., a can or bottle) floating in the center of the screen, surrounded by out-of-focus background elements (hills/rocks).
2. **Interaction:** As the user moves their mouse, the entire scene tilts slightly. The product rotates on its axis to face the cursor.
3. **Parallax Effect:** The background rocks move inversely to the mouse, creating a strong sense of depth.

## VISUAL HIERARCHY SYSTEM
- **The Anchor:** The product is dead-center and crisp.
- **The Atmosphere:** The background elements (rocks/hills) are deliberately blurred (CSS `filter: blur()`) to simulate a shallow depth of field (bokeh effect).
- **Lighting:** A soft, glowing radial gradient sits behind the product to naturally draw the eye to the center.

## FULL MOTION DESIGN BREAKDOWN
- **Floating Animation:** A subtle `@keyframes` animation translates the product and rocks up and down on the Y-axis by 10-15px over a long duration (e.g., 4 seconds) with `ease-in-out` to simulate zero-gravity breathing.
- **Mouse Tracking:** JavaScript maps the mouse X/Y coordinates to CSS variables (`--x`, `--y`).
- **Easing:** The CSS `transition: transform 0.1s ease-out` ensures the product follows the mouse smoothly without feeling completely detached or jittery.

## PARALLAX ENGINEERING GUIDE
**How it works technically:**
- We bind `mousemove` to the `document`.
- We calculate the mouse's offset from the center of the screen: `x = (e.clientX - window.innerWidth / 2) / 20`.
- We apply these values to the product's `transform: rotateY()` and `rotateX()`.
- For the floating rocks, we apply the *inverse* values to `translateX` and `translateY` to make them parallax against the mouse movement.

## CODE ARCHITECTURE BREAKDOWN
- **Vanilla Setup:** A simple HTML structure with an `.environment` container and a `.product` container.
- **CSS Variables:** The JS only updates `--mouseX` and `--mouseY` on the `:root`. The CSS handles all the actual transform logic using `calc()`. This separates state (JS) from presentation (CSS).

## PERFORMANCE ENGINEERING
- **Will-Change:** The floating rocks and product have `will-change: transform` to force them onto the GPU.
- **Blur Performance:** Standard `filter: blur()` can be expensive on large elements. We ensure the blurred rocks are small PNGs, not massive background images.

## INTERACTION PSYCHOLOGY
- **Responsiveness:** Humans love things that react to them. When a digital product "looks" at your cursor, it creates a subconscious connection. It feels alive.

## ENGINEERING TACTICS
- **CSS 3D vs WebGL:** While Three.js handles 3D models better, if you only have a 2D image of a product, using CSS 3D transforms (`rotateX`, `rotateY`) on a PNG is incredibly lightweight and achieves 80% of the effect with 5% of the payload.

## FULL REBUILD BLUEPRINT
1. **HTML:** Create a `.scene` wrapper containing `.product` and multiple `.rock` elements.
2. **CSS:** Apply `filter: blur(5px)` to the rocks. Add the floating `@keyframes` to all objects.
3. **JS Math:** Listen for `mousemove`. Calculate center offset. Update CSS variables `--x` and `--y`.
4. **CSS Transform:** In CSS, apply `transform: rotateY(var(--x)) rotateX(var(--y))` to the product, and `transform: translate(calc(var(--x) * -2), calc(var(--y) * -2))` to the rocks.
