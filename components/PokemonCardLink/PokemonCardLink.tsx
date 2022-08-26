import { LinkBox, LinkOverlay } from '@chakra-ui/react'
import Link, { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'
import { PokemonCardProp } from '../../utils/Types'
import { PokemonCard } from '../PokemonCard/PokemonCard'

type PokemonCardLinkComponent = PokemonCardProp & LinkProps

const PokemonCardLink: React.FunctionComponent<
  PropsWithChildren<PokemonCardLinkComponent>
> = ({ pokemonData, cardConfig, children, href }) => {
  return (
    <LinkBox>
      <PokemonCard pokemonData={pokemonData} cardConfig={cardConfig}>
        {children}
      </PokemonCard>
      <Link href={href}>
        <LinkOverlay />
      </Link>
    </LinkBox>
  )
}

export { PokemonCardLink }
