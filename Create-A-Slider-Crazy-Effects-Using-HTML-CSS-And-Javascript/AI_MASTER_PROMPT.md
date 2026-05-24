# AI MASTER PROMPT: JS Crazy Slider

## PROJECT VISION
**Emotional Feeling:** High-octane, dynamic, and physically responsive.
**Brand Energy:** Modern streetwear brand, automotive showcase, or high-end portfolio.
**Cinematic Inspiration:** MTV-style fast cuts, kinetic typography, dynamic inertia.
**Style:** Awwwards-style, interaction-heavy, physics-based.
**Why:** Traditional sliders feel dead and linear. By adding Javascript to track drag inertia and applying complex clip-paths or scale transforms during the transition, the slider feels like a physical object you are throwing rather than a webpage you are scrolling.

## USER EXPERIENCE FLOW
1. **Initial View:** A massive edge-to-edge image slider with kinetic, oversized typography.
2. **Interaction:** The user grabs the slider (or clicks a direction).
3. **The "Crazy" Transition:** Instead of just sliding left/right, the current image might slice into pieces, scale down, or skew dramatically while the next image forces its way into the viewport.
4. **Settling:** The transition finishes with a slight "bounce" or lerp (linear interpolation), satisfying the user's action.

## VISUAL HIERARCHY SYSTEM
- **Edge-to-Edge:** Images should bleed off the edges of the screen to make the slider feel uncontained and massive.
- **Typography Integration:** Text should react to the slide. If the image moves left, the text might stagger its movement, moving slightly faster or slower than the image (parallax drag).
- **Z-Index Play:** Images might overlap or weave between typography layers during transitions.

## FULL MOTION DESIGN BREAKDOWN
- **Inertia Physics:** When a user drags and lets go, the slider doesn't stop instantly. JavaScript calculates the velocity of the drag and applies a decaying momentum to the slider.
- **Scale and Skew:** During active dragging or transitioning, images scale down to `0.9` and skew based on velocity. Fast drag = high skew. As momentum dies, they ease back to `scale: 1, skew: 0`.
- **Easing:** `Expo.easeOut` or Custom Spring physics for the final resting position.

## PARALLAX ENGINEERING GUIDE
**How it works technically:**
- A master container listens for `pointerdown`, `pointermove`, and `pointerup`.
- We calculate `deltaX` (change in mouse position).
- This value is applied to the main wrapper's `translateX`.
- We use a custom `requestAnimationFrame` loop to constantly `lerp` the visual position towards the target position. 
- *Equation:* `currentX += (targetX - currentX) * 0.1;`

## CODE ARCHITECTURE BREAKDOWN
- **Event Listeners:** Unified pointer events to handle both mouse and touch seamlessly.
- **State Management:** Tracking `isDragging`, `startX`, `currentX`, and `targetX`.
- **Animation Loop:** A dedicated `tick()` function running on `requestAnimationFrame` that handles all DOM updates. This prevents layout thrashing that occurs when updating the DOM directly inside a `mousemove` event.

## PERFORMANCE ENGINEERING
- **Will-Change:** Applying `will-change: transform` to the images so the browser promotes them to their own compositor layer.
- **Transform Only:** We absolutely NEVER animate `left`, `margin`, or `width`. Only `transform: translate3d()` to ensure the CPU is bypassed and the GPU handles the heavy lifting.
- **Image Decoding:** Using `decoding="async"` on images to prevent the main thread from blocking when massive carousel images load.

## INTERACTION PSYCHOLOGY
- **Tactile Feedback:** Humans expect physical objects to have mass. When you throw a heavy object, it takes time to stop. Replicating this physics in the browser bridges the gap between digital and physical, making the website feel "expensive."

## ENGINEERING TACTICS
- **Vanilla JS vs Libraries:** While Swiper.js or Splide could handle this, building a custom physics-based slider in Vanilla JS or with GSAP's Draggable plugin allows for custom shaders, clip-paths, and skew effects that off-the-shelf libraries don't support well.

## FULL REBUILD BLUEPRINT
1. **HTML:** Create a `.slider-viewport` and a `.slider-track`.
2. **CSS:** Ensure the track uses `display: flex` and items are sized correctly.
3. **JS State:** Set up variables for inertia math.
4. **Events:** Bind `pointerdown/move/up`. Calculate velocity.
5. **Render Loop:** Create a `requestAnimationFrame` function that lerps the track's `translateX`.
6. **Crazy Effects:** Inside the render loop, map the current velocity to a CSS `skewX` or `scale` value and apply it to the images.
