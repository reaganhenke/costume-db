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
}


export type GitRowsCostumeResponseObject =  CostumeResponseObject & {
  theme: string[];
  size: number;
  characters: character[];
}