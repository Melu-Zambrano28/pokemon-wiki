import { PokemonProps } from '../../utils/Types'
import style from '../CardBody/CardBody.module.scss'
import gobalStyle from '../../styles/globals/styles.module.scss'

type CardBodyProp = {
  pokemonData: PokemonProps
}

const CardBody: React.FunctionComponent<CardBodyProp> = ({ pokemonData }) => {
  return (
    <div className={`${style['container']}`}>
      <h2>{pokemonData.pokemonId}</h2>
      <div className={`${style['bodyDetails']}`}>
        <h2>{pokemonData.pokemonName}</h2>
        <div>
          <div>
            {pokemonData.pokemonType?.map((pokemonType, typeIndex) => {
              return (
                <div
                  className={`${style[`badgeBase`]} ${
                    gobalStyle[`${pokemonType.type.name}`]
                  } ${gobalStyle[`colorWhite`]}`}
                  key={`pokemonBadgeType${pokemonType.type.name}-${typeIndex}`}
                >
                  {pokemonType.type.name}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export { CardBody }
