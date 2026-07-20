export type ScreenCredit = {
  title: string;
  type: "Film" | "Series" | "Documentary" | "Short Film";
  platform?: string;
  year: string;
  poster: string;
};

export const screenCredits: ScreenCredit[] = [
  {
    title: "Deseo",
    type: "Film",
    platform: "Netflix",
    year: "2026",
    poster: "/images/screen-credits/deseo.jpg",
  },
  {
    title: "Galgos",
    type: "Series",
    platform: "Movistar+",
    year: "2024",
    poster: "/images/screen-credits/galgos.jpeg",
  },
  {
    title: "Society of the Snow: Who Were We on the Mountain?",
    type: "Documentary",
    platform: "Netflix",
    year: "2024",
    poster: "/images/screen-credits/society-of-the-snow-who-were-we-on-the-mountain.jpg",
  },
  {
    title: "The Cook of Castamar",
    type: "Series",
    platform: "Atresmedia",
    year: "2021",
    poster: "/images/screen-credits/the-cook-of-castamar.jpg",
  },
  {
    title: "Una Vida, Una Cena",
    type: "Series",
    platform: "Prime Video",
    year: "2019",
    poster: "/images/screen-credits/una-vida-una-cena.jpg",
  },
  {
    title: "Nasdrovia (S02)",
    type: "Series",
    platform: "Movistar+",
    year: "2022",
    poster: "/images/screen-credits/nasdrovia-s02.jpeg",
  },
  {
    title: "Express (S01)",
    type: "Series",
    platform: "Prime Video",
    year: "2022",
    poster: "/images/screen-credits/express-s01.jpg",
  },
  {
    title: "En Trámite",
    type: "Short Film",
    year: "2026",
    poster: "/images/screen-credits/en-tramite.jpg",
  },
  {
    title: "Último Superviviente a Bordo",
    type: "Short Film",
    year: "2026",
    poster: "/images/screen-credits/ultimo-superviviente-a-bordo.jpg",
  },
  {
    title: "El Nuevo Barrio",
    type: "Short Film",
    year: "2024",
    poster: "/images/screen-credits/el-nuevo-barrio.jpeg",
  },
  {
    title: "El Buen Patrón",
    type: "Film",
    year: "2021",
    poster: "/images/screen-credits/el-buen-patron.jpg",
  },
  {
    title: "Paraíso (S01)",
    type: "Series",
    platform: "Movistar+",
    year: "2021",
    poster: "/images/screen-credits/paraiso-s01.jpg",
  },
  {
    title: "Hasta el Cielo",
    type: "Film",
    year: "2020",
    poster: "/images/screen-credits/hasta-el-cielo.jpg",
  },
  {
    title: "The Head",
    type: "Series",
    platform: "HBO",
    year: "2020",
    poster: "/images/screen-credits/the-head-s01.jpg",
  },
  {
    title: "Por H o por B",
    type: "Series",
    platform: "HBO",
    year: "2020",
    poster: "/images/screen-credits/por-h-o-por-b.jpg",
  },
];
