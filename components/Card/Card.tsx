import React, { PropsWithChildren } from 'react'
import { CardProp } from '../../utils/Types'
import style from '../Card/Card.module.scss'
import globalStyle from '../../styles/globals/styles.module.scss'

const Card: React.FunctionComponent<PropsWithChildren<CardProp>> = ({
  cardConfig,
  children,
}) => {
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

export { Card }
