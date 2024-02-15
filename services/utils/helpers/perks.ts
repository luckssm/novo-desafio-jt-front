export type Perk = {
  slug: "airline-ticket" | "wi-fi" | "breakfast" | "room";
  name: string;
  iconPath: string;
};

const perksList: Array<Perk> = [
  {
    slug: "airline-ticket",
    name: "Passagem Aérea",
    iconPath: "/static/icons/airline-ticket.svg",
  },
  {
    slug: "wi-fi",
    name: "Wi-fi",
    iconPath: "/static/icons/wi-fi.svg",
  },
  {
    slug: "breakfast",
    name: "Café de manhã",
    iconPath: "/static/icons/coffee-cup.svg",
  },
  {
    slug: "room",
    name: "Quarto",
    iconPath: "/static/icons/home-house-big.svg",
  },
];

export const findPerkByType = ({ perkType }: { perkType: Perk["slug"] }) => {
  return perksList.find((perk) => perk.slug === perkType);
};
