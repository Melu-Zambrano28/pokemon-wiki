import { GetServerSideProps, NextPage } from 'next'
import { PokemonCard } from '../components/PokemonCard/PokemonCard'

type PokemonWiki = {
  name: string
  location_area_encounters: string
  sprites: {
    back_default: string
    back_female: string
    back_shiny: string
    back_shiny_female: string
    front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
  }
}

type PokemonWikiQuery = {
  name: string
}

const getPokemon = async (pokemonName: string): Promise<PokemonWiki> => {
  return fetch(`${process.env['NEXT_PUBLIC_POKE_API_URL']}/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => ({
      name: data.name,
      abilities: data.abilities,
      location_area_encounters: data.location_area_encounters,
      sprites: data.sprites,
    }))
}

export const getServerSideProps: GetServerSideProps<
  PokemonWiki,
  PokemonWikiQuery
> = async (context) => {
  const params = context.params
  const name = params?.name ? params.name : ''
  const pokemon = await getPokemon(name)
  console.log(`getServerSideProps `, pokemon)
  return {
    props: {
      name: pokemon.name,
      location_area_encounters: pokemon.location_area_encounters,
      sprites: pokemon.sprites,
    },
  }
}

const PokemonWiki: NextPage<PokemonWiki> = ({ name, sprites }) => {
  return <PokemonCard name={name} src={sprites.front_default} />
}

export default PokemonWiki
