import { Image } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'
import { PokemonCardProp } from '../../utils/Types'
import style from '../PokemonCard/PokemonCard.module.scss'
import globalStyle from '../../styles/globals/styles.module.scss'

const PokemonCard: React.FunctionComponent<
  PropsWithChildren<PokemonCardProp>
> = ({ cardConfig, children }) => {
  return (
    <div className={style['cardcontainer']}>
      <div
        className={`${style['cardHeader']} ${
          globalStyle[`${cardConfig.cardHeaderClasses}`]
        }`}
      >
        <Image
          src={cardConfig.cardImage}
          h="210px"
          objectFit="cover"
          alt={cardConfig.cardAltImage}
          className={style['center']}
        />
      </div>
      <div>{children}</div>
    </div>
  )
}

export { PokemonCard }
