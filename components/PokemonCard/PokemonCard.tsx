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
        <img
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
