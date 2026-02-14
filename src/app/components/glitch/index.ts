// Main component
export { Glitch } from './glitch';

// Reusable hooks (for custom compositions)
export { useGlitchState } from './glitch_state';
export { useNameCycler } from './name_state';

// Individual effects – import and compose your own glitch!
export { ShakeEffect } from './effects/shake';
export { ChromaticAberrationEffect } from './effects/chromatic_aberration';
export { MotionBlurEffect } from './effects/motion_blur';
export { NoiseEffect } from './effects/noise';
export { ScanlineEffect } from './effects/scanline';
export { FlickerEffect } from './effects/flicker';

// CSS – user must import this separately
// export { default as glitchCss } from './glitch_effects.css?inline'; // or just document the path