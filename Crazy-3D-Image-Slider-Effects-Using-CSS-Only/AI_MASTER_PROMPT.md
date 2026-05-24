# AI MASTER PROMPT: 3D CSS Slider

## PROJECT VISION
**Emotional Feeling:** Hypnotic, futuristic, and mathematically precise.
**Brand Energy:** High-tech digital agency, Web3 landing page, or cyber-security firm.
**Cinematic Inspiration:** The rings of Saturn, perpetual motion machines.
**Style:** Cyberpunk/Sci-Fi, Motion-heavy, CSS-only engineering showcase.
**Why:** Standard carousels are boring. By using 3D perspective and placing items on a mathematical ring, the slider becomes a centerpiece of interaction that draws users in without requiring any JavaScript.

## USER EXPERIENCE FLOW
1. **Initial View:** A central focal point (e.g., a massive typography layout or a model) surrounded by a rotating ring of images.
2. **Perpetual Motion:** The ring spins constantly in an infinite loop.
3. **Hover Interaction:** Hovering over the slider pauses the animation, allowing users to examine the orbiting content, giving them control over the perpetual motion.

## VISUAL HIERARCHY SYSTEM
- **Perspective Illusion:** The `perspective` CSS property creates depth. Elements further away appear smaller, and elements closer appear larger.
- **Backface Visibility:** Depending on the design, elements on the "back" of the ring can be dimmed using CSS filters (`brightness` or `opacity`) to simulate atmospheric depth.
- **Centering:** The entire ring is strictly centered. The hierarchy points directly to the middle of the screen.

## FULL MOTION DESIGN BREAKDOWN
- **Animation Loop:** A single `@keyframes` animation rotating from `0deg` to `360deg` on the Y-axis.
- **Dynamic Easing:** Linear easing is used for the infinite loop to prevent stuttering (e.g., `animation: autoRun 20s linear infinite`).
- **Hover Easing:** Transitioning the `animation-play-state` to `paused` with a slight CSS transition on the items to give a "braking" effect (inertia).

## PARALLAX ENGINEERING GUIDE
**How it works technically:**
- A `.slider` container uses `transform-style: preserve-3d`.
- Each `.item` uses an absolute position.
- We use a CSS variable `--position` for each item. If there are 10 items, we rotate each item by `calc((360deg / 10) * var(--position))` on the Y-axis.
- Then, we push each item outward using `translateZ(400px)`. This creates a perfect 3D cylinder.
- The parent container then rotates `360deg`, taking all the pre-positioned items with it.

## CODE ARCHITECTURE BREAKDOWN
- **No JavaScript:** This entire architecture relies purely on CSS variables and mathematical calculations using `calc()`.
- **CSS Variables:** The `--quantity` variable defines the total number of items, and `--position` defines the index. This makes the HTML incredibly semantic and easy to modify dynamically via backend templates if needed.

## PERFORMANCE ENGINEERING
- **Hardware Acceleration:** By using `transform` (rotateY, translateZ), we force the browser to composite the animation on the GPU.
- **Avoiding Repaints:** Since we aren't changing `left`, `top`, or `margin`, the browser doesn't need to recalculate layout or paint during the animation, resulting in a locked 60fps even on mobile devices.

## INTERACTION PSYCHOLOGY
- **Control over Chaos:** The infinite spinning creates a sense of dynamic energy. Allowing the user to stop it on hover gives them a satisfying sense of control over the environment.

## ENGINEERING TACTICS
- **CSS vs WebGL:** While Three.js could do this easily, using pure DOM elements allows for native accessibility, easy text selection, and native image SEO without the overhead of a WebGL canvas context.

## FULL REBUILD BLUEPRINT
1. **HTML:** Create a container with `--quantity` and children with `--position`.
2. **CSS 3D:** Add `transform-style: preserve-3d` to the container and `perspective` to the wrapper.
3. **Math:** Apply `transform: rotateY(calc((360deg / var(--quantity)) * var(--position))) translateZ(500px)` to the items.
4. **Animation:** Create a `@keyframes` rotating the container 360 degrees.
5. **Interaction:** Add `.slider:hover .item { animation-play-state: paused; }`.
