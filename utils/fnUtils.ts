import { PokemonType } from './Types'

const pokemonTypeAndColor = new Map<string, string>()
pokemonTypeAndColor.set('NORMAL', 'yellow.900')
pokemonTypeAndColor.set('FIRE', 'orange.100')
pokemonTypeAndColor.set('WATER', 'blue.100')
pokemonTypeAndColor.set('GRASS', 'green.100')
pokemonTypeAndColor.set('ELECTRIC', 'yellow.100')
pokemonTypeAndColor.set('ICE', 'light_blue.100')
pokemonTypeAndColor.set('FIGHTING', 'red')
pokemonTypeAndColor.set('POISON', '#a040a0')
pokemonTypeAndColor.set('GROUND', '##e0c068')
pokemonTypeAndColor.set('FLYING', '#a890f0')
pokemonTypeAndColor.set('PSYCHIC', '#f85888')
pokemonTypeAndColor.set('BUG', '#a7b622')
pokemonTypeAndColor.set('ROCK', '#b8a038')
pokemonTypeAndColor.set('GHOST', '#705898')
pokemonTypeAndColor.set('DARK', '#705848')
pokemonTypeAndColor.set('DRAGON', '#713bf2')
pokemonTypeAndColor.set('STEEL', '#b8b8d0')
pokemonTypeAndColor.set('FAIRY', '#efb5bb')

const getBGColor = () => {
  const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'purple',
    'gray',
    'teal',
    'yellow',
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}

const getBGColorByPokemonType = (pokemonTypes: ReadonlyArray<PokemonType>) => {
  const colors = pokemonTypes.map((pokemonType) => {
    return pokemonTypeAndColor.get(pokemonType.type.name.toLocaleUpperCase())
  })

  return colors[0] ? colors[0] : ''
}

const getTypesColorbyPokemonType = (pokemonType: string) => {
  return pokemonTypeAndColor.get(pokemonType.toLocaleUpperCase())
}

export { getBGColor, getBGColorByPokemonType, getTypesColorbyPokemonType }
