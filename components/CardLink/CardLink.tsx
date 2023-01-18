import Link, { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'
import { CardProp } from '../../utils/Types'
import { Card } from '../Card/Card'

type PokemonCardLinkComponent = CardProp & LinkProps

const CardLink: React.FunctionComponent<
  PropsWithChildren<PokemonCardLinkComponent>
> = ({ pokemonData, cardConfig, children, href }) => {
  return (
    <Link href={href}>
      <Card pokemonData={pokemonData} cardConfig={cardConfig}>
        {children}
      </Card>
    </Link>
  )
}

export { CardLink }
