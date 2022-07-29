import { NextPage } from "next";
import { useRouter } from "next/router";
import { PokemonCard } from "../components/PokemonCard/PokemonCard";

type PokemonWiki = {
  name: string;
  location_area_encounters: string;
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  };
};

const PokemonWiki: NextPage<PokemonWiki> = ({ name, sprites }) => {
  return <PokemonCard name={name} src={sprites.front_default} />;
};

const getPokemon = async (pokemonName: string): Promise<PokemonWiki> => {
  return fetch(`${process.env.NEXT_PUBLIC_POKE_API_URL}/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => ({
      name: data.name,
      abilities: data.abilities,
      location_area_encounters: data.location_area_encounters,
      sprites: data.sprites,
    }));
};

export async function getServerSideProps(context: any) {
  const params = context.params;
  const name = params?.name;
  const pokemon = await getPokemon(name);
  console.log(`getServerSideProps `, pokemon);
  return {
    props: {
      name: pokemon.name,
      location_area_encounters: pokemon.location_area_encounters,
      sprites: pokemon.sprites,
    },
  };
}

export default PokemonWiki;
