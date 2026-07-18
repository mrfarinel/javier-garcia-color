import fs from "node:fs";
import path from "node:path";

type ClientLogo = {
  name: string;
  fileName: string;
  className?: string;
};

const logosDirectory = path.join(process.cwd(), "public", "logos");

export const clientLogos: ClientLogo[] = [
  { name: "Netflix", fileName: "netflix.svg", className: "max-h-[28px]" },
  { name: "Prime Video", fileName: "prime-video.svg", className: "max-h-[28px]" },
  { name: "Movistar Plus+", fileName: "movistar-plus.svg", className: "max-h-[30px]" },
  { name: "Apple TV+", fileName: "apple-tv-plus.svg", className: "max-h-[30px]" },
  { name: "HBO Max", fileName: "hbo-max.svg", className: "max-h-[27px]" },
  { name: "Mahou", fileName: "mahou.svg", className: "max-h-[34px]" },
  { name: "Pilsen", fileName: "pilsen.svg", className: "max-h-[34px]" },
  { name: "ONCE", fileName: "once.svg", className: "max-h-[32px]" },
  { name: "El Corte Ingles", fileName: "el-corte-ingles.svg", className: "max-h-[34px]" },
  { name: "Cerveza Imperial", fileName: "imperial.svg", className: "max-h-[34px]" },
  { name: "ASISA", fileName: "asisa.svg", className: "max-h-[30px]" },
  { name: "Renfe", fileName: "renfe.svg", className: "max-h-[30px]" },
  { name: "Central Lechera Asturiana", fileName: "central-lechera-asturiana.svg", className: "max-h-[38px]" },
];

export function getAvailableClientLogos() {
  return clientLogos.map((logo) => ({
    ...logo,
    src: `/logos/${logo.fileName}`,
    isAvailable: fs.existsSync(path.join(logosDirectory, logo.fileName)),
  }));
}
