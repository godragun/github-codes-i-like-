# AI MASTER PROMPT: ExploreScape Travel Website

## PROJECT VISION
**Emotional Feeling:** Immersive, breathtaking, and deeply narrative-driven. Users should feel like they are already traveling.
**Brand Energy:** National Geographic meets high-end luxury travel agency.
**Cinematic Inspiration:** Sweeping forest drone shots, documentary-style storytelling.
**Style:** Awwwards-style, documentary storytelling, parallax-heavy.
**Why:** A travel website should sell an experience, not just a destination. The layered forest parallax immediately immerses the user in the environment before they even read a word.

## USER EXPERIENCE FLOW
1. **Initial View:** A massive layered 2D/3D forest scene. The title typography is integrated *behind* the foreground trees but *in front* of the background mountains.
2. **Scrolling:** As the user scrolls down, the foreground elements move up quickly, the midground elements move slowly, and the background elements barely move. The title text scales up and fades out.
3. **Transition:** The forest reveals a clean, minimalist travel content section detailing destinations. 
4. **Cinematic Pacing:** The scroll speed is slightly dampened (smooth scrolling) to force the user to consume the environment at a majestic pace.

## VISUAL HIERARCHY SYSTEM
- **Layering:** Depth is the primary hierarchy. Elements are explicitly assigned `z-index` values to create a diorama effect.
- **Typography:** Giant, bold, serif fonts for the hero section to evoke classic editorial/magazine feelings.
- **Focus:** The center of the screen is kept clear of obstructions to guide the eye toward the vanishing point of the forest.

## FULL MOTION DESIGN BREAKDOWN
- **Foreground Parallax:** Moves at `1.5x` scroll speed.
- **Midground Parallax:** Moves at `0.8x` scroll speed.
- **Background Parallax:** Moves at `0.2x` scroll speed.
- **Text Parallax:** Moves at `1.0x` scroll speed but also scales down by `0.9x` as it moves up.
- **Easing:** All parallax uses `linear` easing bound directly to the scrollbar, but smoothed via a virtual scroll wrapper (e.g., Lenis or Locomotive).

## PARALLAX ENGINEERING GUIDE
**How it works technically:**
The forest scene isn't a single image. It is composed of 4 to 5 transparent PNG layers (e.g., `trees-front.png`, `trees-mid.png`, `mountains-back.png`, `sky.png`). 
Each layer is absolutely positioned on top of each other. Using JavaScript or GSAP ScrollTrigger, we multiply the `window.scrollY` by a different coefficient for each layer and apply it to `transform: translateY()`.
**Why it creates immersion:** The human brain uses relative motion (motion parallax) to judge distance. Replicating this artificially tricks the brain into perceiving real depth on a flat screen.

## CODE ARCHITECTURE BREAKDOWN
- **HTML Structure:** A `.parallax-container` set to `100vh` and `overflow: hidden`, containing absolute-positioned `img` tags.
- **GSAP ScrollTrigger:** Used to bind the `translateY` of each layer to the scroll position without manual event listeners.
- **Smooth Scroll Wrapper:** Lenis is used to hijack native scrolling, applying a slight friction/lerp (linear interpolation) to make the scroll wheel feel heavier and more cinematic.

## PERFORMANCE ENGINEERING
- **Image Optimization:** Transparent PNGs can be massive. They must be compressed heavily, ideally served as WebP where supported.
- **GPU Acceleration:** Using `transform: translate3d(0, Ypx, 0)` forces the browser to render the layers on the GPU, preventing jitter and layout thrashing during the scroll.

## ASSET CREATION GUIDE
- **Sourcing:** Assets can be created by taking a high-res landscape photo into Photoshop and manually cutting out layers using the Pen tool.
- **AI Workflow:** Midjourney can generate landscapes. Photoshop Generative Fill can be used to expand the edges or fill in the background behind the cut-out foreground trees.

## INTERACTION PSYCHOLOGY
- **The "Reveal":** By hiding the main content below a massive 100vh parallax section, the user is forced to perform an action (scrolling) to "discover" the site. This mimics physical exploration.

## ENGINEERING TACTICS
- **GSAP vs CSS Parallax:** Pure CSS parallax (using `perspective` and `translateZ`) is performant but notoriously difficult to control across different devices and browsers. GSAP + `transform` provides pixel-perfect control and cross-browser consistency at the cost of a slight JS payload.

## FULL REBUILD BLUEPRINT
1. **Setup:** Basic HTML/CSS/JS. Import GSAP and ScrollTrigger.
2. **Assets:** Slice a landscape image into 4 transparent layers.
3. **Layout:** Stack the images using `position: absolute`.
4. **Motion:** Create a GSAP timeline linked to ScrollTrigger. Add a `.to()` tween for each layer with a different `y` value.
5. **Content:** Build the standard website content below the `.parallax-container`.
6. **Polish:** Add a smooth-scroll library (Lenis) to eliminate native scroll-wheel jitter.
