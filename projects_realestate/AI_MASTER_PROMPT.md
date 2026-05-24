# AI MASTER PROMPT: Parallax Real Estate

## PROJECT VISION
**Emotional Feeling:** The user should feel an overwhelming sense of exclusivity, luxury, and expansive depth.
**Brand Energy:** Million-dollar real estate brand (e.g., Sotheby's, Zaha Hadid).
**Cinematic Inspiration:** Drone photography over vast estates; slow, deliberate panning shots. 
**Style:** Luxury, Awwwards-style, Motion-heavy, Cinematic.
**Why:** A luxury real estate site shouldn't feel like a standard grid of boxes. It should feel like an immersive brochure. The parallax effect creates a sense of scale and depth, mimicking the feeling of looking out over a vast property from a high balcony.

## USER EXPERIENCE FLOW
1. **Initial View:** A massive, screen-filling hero image of an architectural masterpiece. The text is elegant, serif typography, fading in slowly.
2. **Scrolling:** As the user scrolls down, the foreground text moves up faster than the background image (the core parallax illusion).
3. **Transition:** The background image slightly dims and blurs, drawing focus to the property listings that slide up from the bottom with a staggered delay.
4. **Premium Feeling:** Achieved by deliberate, slow easings. Nothing snaps into place; everything glides.

## VISUAL HIERARCHY SYSTEM
- **Scale:** Hero typography is massive but thin. Secondary text is small and tracked out (letter-spacing).
- **Separation:** The foreground (UI) is stark white or deep black, separating cleanly from the rich, photographic background.
- **Lighting/Shadows:** Property cards have deep, soft drop-shadows to separate them from the background canvas.

## FULL MOTION DESIGN BREAKDOWN
- **Hero Image Parallax:** `translateY` linked to scroll progress. Easing is `linear` to the scroll, but the movement speed is 0.5x of the scroll speed to create depth.
- **Card Stagger:** As the grid enters the viewport, cards animate in: `translateY: 50px -> 0`, `opacity: 0 -> 1`.
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (an exponential out easing) creates a swift entry that settles very slowly, giving the objects "weight".

## PARALLAX ENGINEERING GUIDE
**How it works technically:**
By listening to the window's `scrollY`, we apply a CSS transform to the background image. If the user scrolls 100px down, we translate the background image 50px down (`translateY(50px)`). Because the background moves slower than the rest of the document, our brains perceive it as being further away (motion parallax).
**Tools Used:** Framer Motion (`useScroll`, `useTransform`) to bind the `scrollY` value directly to the component's `y` style without triggering expensive React re-renders.

## CODE ARCHITECTURE BREAKDOWN
- `/components`: Contains `Banner.js` and `Property.js`. These are wrapped in `motion.div` for entry animations.
- `/pages/index.js`: The main scroll container where `useScroll` is initialized.
- **Why this structure:** Next.js provides static site generation (SSG) via `getStaticProps` which is crucial for SEO in real estate. The UI is separated into dumb components that handle their own Framer Motion micro-interactions.

## PERFORMANCE ENGINEERING
- **Image Optimization:** Next.js `<Image />` component is used to serve WebP formats and lazy-load property images as they enter the viewport.
- **Avoiding Re-renders:** Parallax is handled via Framer Motion's `MotionValue`, which bypasses React state and updates the DOM directly via `requestAnimationFrame`.

## ASSET CREATION GUIDE
- **Photography:** Sourced from high-end architectural photographers. Must be minimum 4K resolution, heavily color-graded for moody or golden-hour lighting.

## INTERACTION PSYCHOLOGY
- **Hover Delays:** Hovering a property card scales the image slightly over 0.6 seconds. This slow transition feels "expensive." Fast animations feel cheap and nervous; slow animations feel confident and premium.

## ENGINEERING TACTICS
- **Library:** Framer Motion is chosen over GSAP here because it integrates deeply with React's component lifecycle, making staggered list animations trivial with `variants`.

## FULL REBUILD BLUEPRINT
1. **Setup:** Initialize Next.js and install `framer-motion` and `@chakra-ui/react`.
2. **Layout:** Build the grid system with Chakra UI.
3. **Motion System:** Import `useScroll` and `useTransform` in the Hero component.
4. **Parallax:** Bind the background image's `y` transform to the scroll value.
5. **Interactions:** Add hover states to the `Property` cards.
6. **Deploy:** Export and deploy to Vercel for edge-cached images.
