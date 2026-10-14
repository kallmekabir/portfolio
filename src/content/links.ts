// Your personal info lives in src/content/ as plain data, separate from the UI code.
// An empty string means "not available yet": the UI hides that link or button.
export const profile = {
  name: 'Kabir Khan',
  role: 'Software Engineer', // shown on the headshot card's name tag
  tagline: 'Software engineer who likes building things you can play with.',
  bio: "Java and data structures are my home turf. Lately I've been bringing them to the web, so most of the projects below run right in your browser.",
  nowBuilding: 'A chess engine in Java that compiles to WebAssembly, so you can play it right here.',
  linkedin: 'https://www.linkedin.com/in/kabir-khan-b7589b287/',
  github: 'https://github.com/kallmekabir',
  email: '',
  // Set to '/resume.pdf' once the file is in public/. (Until then, that URL would
  // be caught by the SPA rewrite in vercel.json and download index.html instead.)
  resumePdf: '',
  // Set to '/images/headshot.webp' once the photo is in public/images/. Until then the
  // headshot card shows a "KK" monogram instead.
  headshot: '',
};
