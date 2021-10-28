export type CostumeResponseObject = {
  name: string;
  origin?: string;
  imageUrl: string;
  fandomLink?: string;
  description: string;
};

type character = {
  hair: string;
  gender: string;
  glasses?: boolean;
  pet?: boolean;
}


export type GitRowsCostumeResponseObject =  CostumeResponseObject & {
  theme: string[];
  size: number;
  characters: character[];
}