import * as t from 'io-ts'

export const Ability = t.readonly(
  t.type({
    ability: t.readonly(
      t.type({
        name: t.string,
        url: t.string,
      }),
    ),
    is_hidden: t.boolean,
    slot: t.number,
  }),
)

export type Ability = t.TypeOf<typeof Ability>

const pokemonWikiQuery = t.readonly(
  t.type({
    name: t.string,
  }),
  'pokemonWikiQuery',
)
export type PokemonWikiQuery = t.TypeOf<typeof pokemonWikiQuery>

const PokemonTypeLiteral = t.keyof({
  normal: null,
  fire: null,
  water: null,
  grass: null,
  electric: null,
  ice: null,
  fighting: null,
  poison: null,
  ground: null,
  flying: null,
  psychic: null,
  bug: null,
  rock: null,
  ghost: null,
  dark: null,
  dragon: null,
  steel: null,
  fairy: null,
})

export type PokemonTypeLiteral = t.TypeOf<typeof PokemonTypeLiteral>

//codec
const PokemonType = t.readonly(
  t.type({
    slot: t.number,
    type: t.readonly(
      t.type({
        name: PokemonTypeLiteral,
        url: t.string,
      }),
    ),
  }),
  'PokemonType',
)

export type PokemonType = t.TypeOf<typeof PokemonType>

const undefinedAndNullStringCodec = t.union([t.string, t.undefined, t.null])

export const PokemonWiki = t.readonly(
  t.type({
    id: t.number,
    abilities: t.readonlyArray(Ability),
    name: t.string,
    location_area_encounters: t.string,
    sprites: t.readonly(
      t.type({
        back_default: t.string,
        back_female: undefinedAndNullStringCodec,
        back_shiny: undefinedAndNullStringCodec,
        back_shiny_female: undefinedAndNullStringCodec,
        front_default: t.string,
        front_female: undefinedAndNullStringCodec,
        front_shiny: undefinedAndNullStringCodec,
        front_shiny_female: undefinedAndNullStringCodec,
        other: t.readonly(
          t.type({
            dream_world: t.readonly(
              t.type({
                front_default: t.string,
                front_female: undefinedAndNullStringCodec,
              }),
            ),
          }),
        ),
      }),
    ),
    types: t.readonlyArray(PokemonType),
  }),
  'PokemonWiki',
)

export type PokemonWiki = t.TypeOf<typeof PokemonWiki>

export type PokemonCardProp = {
  pokemonData: PokemonProps
  cardConfig: CardProps
}

export type PokemonProps = {
  pokemonId: number
  pokemonName: string
  pokemonDescription?: string
  pokemonType?: ReadonlyArray<PokemonType>
}

type CardProps = {
  cardImage: string
  cardAltImage: string
  cardColor?: string
  cardHeaderClasses?: string
}

export type SomePokemonResponse = {
  count: number
  next: string | null
  previous: string | null
  results: { name: string; url: string }[]
}

export type PokemonSideProp = {
  pokemons: PokemonCardProp[]
}

export type PokemonsResponse = {
  numNextPokemonPage: number
  allPokemons: PokemonCardProp[]
}
