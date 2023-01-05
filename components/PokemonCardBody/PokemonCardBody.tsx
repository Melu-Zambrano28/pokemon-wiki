import { Badge, Flex } from '@chakra-ui/react'
import { getBGColorByPokemonType } from '../../utils/fnUtils'
import { PokemonProps } from '../../utils/Types'
import style from '../PokemonCardBody/PokemonCardBody.module.css'

type PokemonCardBodyProp = {
  pokemonData: PokemonProps
}

const PokemonCardBody: React.FunctionComponent<PokemonCardBodyProp> = ({
  pokemonData,
}) => {
  return (
    <div className={style['container']}>
      <h2>{pokemonData.pokemonId}</h2>
      <div className={style['body-details']}>
        <h2>{pokemonData.pokemonName}</h2>
        <div>
          <div>
            {pokemonData.pokemonType?.map((pokemonType, typeIndex) => {
              const colorBadge = getBGColorByPokemonType(pokemonType.type.name)
              return (
                <Badge
                  key={`pokemonBadgeType${pokemonType.type.name}-${typeIndex}`}
                  bg={colorBadge}
                  color="white"
                >
                  {pokemonType.type.name}
                </Badge>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export { PokemonCardBody }
