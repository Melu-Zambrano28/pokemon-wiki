import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Pokemon } from "./components/PokemonCard/PokemonCard";
import { PokemonContainer } from "./components/PokemonContainer/PokemonContainer";

const Home: NextPage<PokemonContainer> = ({ pokemons }) => {
  return (
    <div className={styles.container}>
      <PokemonContainer pokemons={pokemons} />
    </div>
  );
};
export async function getServerSideProps() {
  const urlApiPoke = `https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20`;
  const responsePoke = await fetch(urlApiPoke);
  const dataPoke = await responsePoke.json();
  const pokemonsData: Pokemon[] = dataPoke.results ? dataPoke.results : [];

  return {
    props: {
      pokemons: pokemonsData,
    },
  };
}

export default Home;
