import { PropsWithChildren } from 'react'
import style from '../CardsLayout/CardsLayout.module.scss'

const CardsLayout: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return <div className={style['containerGrid']}>{children}</div>
}

export { CardsLayout }
