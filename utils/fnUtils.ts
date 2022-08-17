import { PokemonType } from '../pages/pokemon-wiki/[name]'

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

const getBGColorByPokemonType = (pokemonTypes: PokemonType[]) => {
  const color = pokemonTypes.map((type) => {
    const typeUpper = type.type.name ? type.type.name.toLocaleUpperCase() : ''
    return pokemonTypeAndColor.get(typeUpper)
  })

  return color[0] ? color[0] : ''
}

export { getBGColor, getBGColorByPokemonType }
