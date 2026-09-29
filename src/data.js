// ===== EDIT THIS FILE to change your site =====

export const SITE = {
  name: "Selo",
  email: "amishkoli10@gmail.com",
  headline: "I cut stories that hold attention.",
  intro:
    "Video editor for YouTube creators and brands. Talking heads, short-form and motion graphics, edited to keep viewers watching.",
  about: [
    "I'm a video editor who cares about pacing, sound and clean storytelling. Every project I finish teaches me something, and this page grows with each new video.",
  ],
  tools: ["Premiere Pro", "After Effects", "Photoshop"],
};

// To add a new video: copy one block, paste it at the end, change the values.
// thumb: optional cover image. Put the file in public/images and use "/images/name.jpg".
// hue: 0-360, sets the cover color when there is no thumb.
export const PROJECTS = [
  {
    id: "p1",
    title: "Vlog",
    category: "Talking Head",
    description: "Converted Multiple Clips into single Story",
    tags: ["Cuts", "Captions"],
    date: "2026-01-15",
    duration: "4:05",
    software: ["Premiere Pro"],
    link: "https://www.youtube.com/embed/lmtL69PSzKo",
    thumb: "../src/thumb/one.png",
    hue: 340,
  },
  {
    id: "p2",
    title: "Reels",
    category: "Short Form",
    description: "Created an immersive reel edit",
    tags: ["Reels", "Sound design"],
    date: "2026-03-02",
    duration: "0:36",
    software: ["Premiere Pro"],
    link: "https://www.youtube.com/embed/KCBMfQeB3Sw",
    thumb: "../src/thumb/two.png",
    hue: 190,
  },
  {
    id: "p3",
    title: "Animation",
    category: "Motion Graphics",
    description: "Created an animation type video",
    tags: ["Animation", "Titles"],
    date: "2026-05-20",
    duration: "0:15",
    software: ["After Effects", "Premiere Pro"],
    link: "https://www.youtube.com/embed/iThdqAXgkUk",
    thumb: "../src/thumb/third.png",
    hue: 270,
  },
];
