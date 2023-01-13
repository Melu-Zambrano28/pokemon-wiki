import Image from 'next/image'
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
          width={-1}
          height={-1}
          loader={() => cardConfig.cardImage}
          src={cardConfig.cardImage}
          alt={`${cardConfig.cardAltImage}`}
          className={style['cardImage']}
        />
      </div>
      <div>{children}</div>
    </div>
  )
}

export { PokemonCard }
