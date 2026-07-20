export type ScreenCredit = {
  title: string;
  type: "Film" | "Series" | "Documentary" | "Short Film";
  platform?: string;
  role: string;
  year: string;
  poster: string;
};

export const screenCredits: ScreenCredit[] = [
  {
    title: "Deseo",
    type: "Film",
    platform: "Netflix",
    role: "Colorist",
    year: "2026",
    poster: "/images/screen-credits/deseo.jpg",
  },
  {
    title: "En Trámite",
    type: "Short Film",
    role: "Colorist",
    year: "2026",
    poster: "/images/screen-credits/en-tramite.jpg",
  },
  {
    title: "Último Superviviente a Bordo",
    type: "Short Film",
    role: "Colorist",
    year: "2026",
    poster: "/images/screen-credits/ultimo-superviviente-a-bordo.jpg",
  },
  {
    title: "Galgos",
    type: "Series",
    platform: "Movistar+",
    role: "Colorist",
    year: "2024",
    poster: "/images/screen-credits/galgos.jpeg",
  },
  {
    title: "Society of the Snow: Who Were We on the Mountain?",
    type: "Documentary",
    platform: "Netflix",
    role: "Colorist",
    year: "2024",
    poster: "/images/screen-credits/society-of-the-snow-who-were-we-on-the-mountain.jpg",
  },
  {
    title: "El Nuevo Barrio",
    type: "Short Film",
    role: "Colorist",
    year: "2024",
    poster: "/images/screen-credits/el-nuevo-barrio.jpeg",
  },
  {
    title: "Nasdrovia (S02)",
    type: "Series",
    platform: "Movistar+",
    role: "Colorist",
    year: "2022",
    poster: "/images/screen-credits/nasdrovia-s02.jpeg",
  },
  {
    title: "Express (S01)",
    type: "Series",
    platform: "Prime Video",
    role: "Colorist",
    year: "2022",
    poster: "/images/screen-credits/express-s01.jpg",
  },
  {
    title: "The Cook of Castamar",
    type: "Series",
    platform: "Atresmedia",
    role: "Colorist",
    year: "2021",
    poster: "/images/screen-credits/the-cook-of-castamar.jpg",
  },
  {
    title: "Paraíso (S01)",
    type: "Series",
    platform: "Movistar+",
    role: "Colorist",
    year: "2021",
    poster: "/images/screen-credits/paraiso-s01.jpg",
  },
  {
    title: "El Buen Patrón",
    type: "Film",
    role: "Colorist",
    year: "2021",
    poster: "/images/screen-credits/el-buen-patron.jpg",
  },
  {
    title: "Hasta el Cielo",
    type: "Film",
    role: "Colorist",
    year: "2020",
    poster: "/images/screen-credits/hasta-el-cielo.jpg",
  },
  {
    title: "Por H o por B",
    type: "Series",
    platform: "HBO",
    role: "Colorist",
    year: "2020",
    poster: "/images/screen-credits/por-h-o-por-b.jpg",
  },
  {
    title: "The Head (S01)",
    type: "Series",
    platform: "HBO",
    role: "Colorist",
    year: "2020",
    poster: "/images/screen-credits/the-head-s01.jpg",
  },
  {
    title: "Una Vida, Una Cena",
    type: "Series",
    platform: "Prime Video",
    role: "Colorist",
    year: "2019",
    poster: "/images/screen-credits/una-vida-una-cena.jpg",
  },
];
