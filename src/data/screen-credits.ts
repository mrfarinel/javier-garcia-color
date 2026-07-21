export type ScreenCredit = {
  title: string;
  type: "Film" | "Series" | "Documentary" | "Short Film";
  platform?: string;
  year: string;
  poster: string;
  imdbUrl?: string;
};

export const screenCredits: ScreenCredit[] = [
  {
    title: "Deseo",
    type: "Film",
    platform: "Netflix",
    year: "2026",
    poster: "/images/screen-credits/deseo.jpg",
    imdbUrl: "https://www.imdb.com/title/tt41617470/",
  },
  {
    title: "Galgos",
    type: "Series",
    platform: "Movistar+",
    year: "2024",
    poster: "/images/screen-credits/galgos.jpeg",
    imdbUrl: "https://www.imdb.com/title/tt23557990/",
  },
  {
    title: "Society of the Snow: Who Were We on the Mountain?",
    type: "Documentary",
    platform: "Netflix",
    year: "2024",
    poster: "/images/screen-credits/society-of-the-snow-who-were-we-on-the-mountain.jpg",
    imdbUrl: "https://www.imdb.com/title/tt31014113/",
  },
  {
    title: "The Cook of Castamar",
    type: "Series",
    platform: "Atresmedia",
    year: "2021",
    poster: "/images/screen-credits/the-cook-of-castamar.jpg",
    imdbUrl: "https://www.imdb.com/title/tt12626014/",
  },
  {
    title: "Nasdrovia (S02)",
    type: "Series",
    platform: "Movistar+",
    year: "2022",
    poster: "/images/screen-credits/nasdrovia-s02.jpeg",
    imdbUrl: "https://www.imdb.com/title/tt10464754/",
  },
  {
    title: "Express (S01)",
    type: "Series",
    platform: "Prime Video",
    year: "2022",
    poster: "/images/screen-credits/express-s01.jpg",
    imdbUrl: "https://www.imdb.com/title/tt14253638/",
  },
  {
    title: "En Trámite",
    type: "Short Film",
    year: "2026",
    poster: "/images/screen-credits/en-tramite.jpg",
    imdbUrl: "https://www.imdb.com/title/tt43630890/",
  },
  {
    title: "Último Superviviente a Bordo",
    type: "Short Film",
    year: "2026",
    poster: "/images/screen-credits/ultimo-superviviente-a-bordo.jpg",
    imdbUrl: "https://www.imdb.com/title/tt14466048/",
  },
  {
    title: "El Nuevo Barrio",
    type: "Short Film",
    year: "2024",
    poster: "/images/screen-credits/el-nuevo-barrio.jpeg",
    imdbUrl: "https://www.imdb.com/title/tt30827952/",
  },
  {
    title: "El Buen Patrón",
    type: "Film",
    year: "2021",
    poster: "/images/screen-credits/el-buen-patron.jpg",
    imdbUrl: "https://www.imdb.com/title/tt13066182/",
  },
  {
    title: "Paraíso (S01)",
    type: "Series",
    platform: "Movistar+",
    year: "2021",
    poster: "/images/screen-credits/paraiso-s01.jpg",
    imdbUrl: "https://www.imdb.com/title/tt11623464/",
  },
  {
    title: "Hasta el Cielo",
    type: "Film",
    year: "2020",
    poster: "/images/screen-credits/hasta-el-cielo.jpg",
    imdbUrl: "https://www.imdb.com/title/tt10978398/",
  },
  {
    title: "The Head",
    type: "Series",
    platform: "HBO",
    year: "2020",
    poster: "/images/screen-credits/the-head-s01.jpg",
    imdbUrl: "https://www.imdb.com/title/tt8290362/",
  },
  {
    title: "Por H o por B",
    type: "Series",
    platform: "HBO",
    year: "2020",
    poster: "/images/screen-credits/por-h-o-por-b.jpg",
    imdbUrl: "https://www.imdb.com/title/tt10371088/",
  },
  {
    title: "Una Vida, Una Cena",
    type: "Series",
    platform: "Prime Video",
    year: "2019",
    poster: "/images/screen-credits/una-vida-una-cena.jpg",
    imdbUrl: "https://www.imdb.com/title/tt11138848/",
  },
];
