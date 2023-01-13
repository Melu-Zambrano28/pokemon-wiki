import { GetServerSideProps, NextPage } from 'next'
import { PokemonCard } from '../../components/PokemonCard/PokemonCard'
import { getClassNameByPokemonTypes } from '../../utils/fnUtils'

import { PokemonWiki, PokemonWikiQuery } from '../../utils/Types'
import style from '../../styles/namePokemonPage.module.scss'
import { PokemonContainer } from '../../components/PokemonContainer/PokemonContainer'
import globalStyle from '../../styles/globals/styles.module.scss'

const getPokemon = async (pokemonName: string): Promise<PokemonWiki> => {
  return fetch(`${process.env['NEXT_PUBLIC_POKE_API_URL']}/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => ({
      id: data.id,
      name: data.name,
      abilities: data.abilities,
      location_area_encounters: data.location_area_encounters,
      sprites: data.sprites,
      types: data.types ?? [],
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
    props: pokemon,
  }
}

const PokemonWikiPage: NextPage<PokemonWiki> = ({
  id,
  name,
  sprites,
  types,
}) => {
  const cardHeaderClasses = getClassNameByPokemonTypes(types)

  const pokemonData = {
    pokemonId: id,
    pokemonName: name,
    pokemonDescription: '',
    pokemonType: [],
  }

  return (
    <div className={style[`containerGrid`]}>
      <div className={`${globalStyle[`centerHeader`]}`}>
        <h1>{`Pokemon Wiki`}</h1>
      </div>

      <div className={style[`main`]}>
        <div className={style[`gallery`]}>
          {' '}
          col 1
          <PokemonContainer>
            <PokemonCard
              pokemonData={pokemonData}
              cardConfig={{
                cardImage: sprites.front_default,
                cardAltImage: name,
                cardHeaderClasses: cardHeaderClasses,
              }}
            >
              {`${pokemonData.pokemonId}.${pokemonData.pokemonName}`}
            </PokemonCard>

            {sprites.front_female && (
              <PokemonCard
                pokemonData={pokemonData}
                cardConfig={{
                  cardImage: sprites.front_female,
                  cardAltImage: `${name} Female`,
                  cardHeaderClasses: cardHeaderClasses,
                }}
              >
                {`Female`}
              </PokemonCard>
            )}

            {sprites.front_shiny && (
              <PokemonCard
                pokemonData={pokemonData}
                cardConfig={{
                  cardImage: sprites.front_shiny,
                  cardAltImage: `${name} Front Shiny`,
                  cardHeaderClasses: cardHeaderClasses,
                }}
              >
                {`Front Shiny`}
              </PokemonCard>
            )}

            {sprites.back_shiny && (
              <PokemonCard
                pokemonData={pokemonData}
                cardConfig={{
                  cardImage: sprites.back_shiny,
                  cardAltImage: `${name} Back Shiny`,
                  cardHeaderClasses: cardHeaderClasses,
                }}
              >
                {`Back Shiny`}
              </PokemonCard>
            )}
          </PokemonContainer>
        </div>
        <div>col 2</div>
      </div>
      <div>Footer</div>
    </div>
  )
}

export default PokemonWikiPage
