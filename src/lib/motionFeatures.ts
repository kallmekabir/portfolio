// The part of Motion that actually updates elements on screen (the renderer plus
// animations). Layout.tsx imports this file lazily through <LazyMotion>, so Vite
// puts it in its own small file that loads right after the page instead of
// making the first download bigger.
import { domAnimation } from 'motion/react';

export default domAnimation;
