export interface Artwork {
  id: string;
  title: string;
  image: string;
  technique: string;
  size?: string;
  description?: string;
  hasBlacklight?: boolean;
  blacklightImage?: string;
}

export const artworks: Artwork[] = [
  {
    id: "red-conqueror",
    title: "The Red Conqueror",
    image: "/artwork/The Red Conqueror.jpg",
    technique: "Acrylic on canvas",
    size: "40x50 cm",
    description: "A majestic red panda holds the universe in a glass sphere, surrounded by swirling crimson nebulae. Commissioned work capturing the spirit of cosmic curiosity.",
  },
  {
    id: "charlie-spacing-out",
    title: "Charlie Spacing Out",
    image: "/artwork/Charlie Spacing Out.jpg",
    technique: "Acrylic on canvas",
    size: "40x50 cm",
    description: "Charlie floats through a vibrant galaxy of colors, a tuxedo cat lost in dreams of stardust and cosmic adventures. Commissioned work.",
  },
  {
    id: "hogwarts",
    title: "A Trip to Hogwarts",
    image: "/artwork/A trip to Hogwarts.jpg",
    technique: "Digital art",
    description: "A curious rabbit stands before the magical silhouette of Hogwarts, where the castle itself is woven from the fabric of the Milky Way. Commissioned work.",
  },
  {
    id: "lucy",
    title: "Lucy in the Sky with Diamond",
    image: "/artwork/Lucy in the sky with diamond.jpg",
    technique: "Acrylic on canvas",
    size: "30x30 cm",
    description: "Picture yourself on a boat on a river... A three-eyed cosmic cat with a diamond pendant, surrounded by Beatles lyrics painted in stardust. Created as a wedding gift.",
  },
  {
    id: "glow-flow",
    title: "Glow with the Flow",
    image: "/artwork/Glow with the Flow  daylight.jpg",
    technique: "Acrylic on canvas",
    size: "40x50 cm",
    description: "A sea turtle glides through spiral galaxies of bioluminescent blue, where ocean currents become cosmic streams. This piece transforms under blacklight, revealing hidden depths.",
    hasBlacklight: true,
    blacklightImage: "/artwork/Glow with the flow.jpg",
  },
  {
    id: "shamanic-trip",
    title: "Shamanic Trip",
    image: "/artwork/Shamanic Trip daylight.jpg",
    technique: "Acrylic on canvas",
    size: "70x50 cm",
    description: "A shaman sits in meditation among sacred plants and cacti, the galaxy spiraling overhead. Under blacklight, the artwork reveals its true psychedelic nature. Commissioned work.",
    hasBlacklight: true,
    blacklightImage: "/artwork/Shamanic Trip.jpg",
  },
  {
    id: "moon",
    title: "The Moon",
    image: "/artwork/The moon.jpg",
    technique: "Acrylic on wood",
    size: "90x38 cm",
    description: "Earth's eternal companion, rendered in meticulous detail on natural wood. Every crater tells a story of cosmic collisions spanning billions of years.",
  },
  {
    id: "sofia",
    title: "My Fluffy Bunny",
    image: "/artwork/Sofia-rabbit-original.jpg",
    technique: "Digital art",
    description: "Sofia dances among flowers and butterflies, a portrait of innocence and joy. Digital artwork commissioned to capture a beloved pet's gentle spirit.",
  },
];
