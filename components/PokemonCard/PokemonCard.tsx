import { Box, Center, Heading, Image, Stack } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'
import { PokemonCardProp } from '../../utils/Types'

const PokemonCard: React.FunctionComponent<
  PropsWithChildren<PokemonCardProp>
> = ({ pokemonData, cardConfig, children }) => {
  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Center
          h={'210px'}
          bg={cardConfig.cardColor ? cardConfig.cardColor : `white.100`}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}
        >
          <Image
            src={cardConfig.cardImage}
            h="210px"
            objectFit="cover"
            alt={cardConfig.cardAltImage}
          />
        </Center>
        <Stack>
          <Heading
            fontSize={'2xl'}
            fontFamily={'body'}
            textTransform="capitalize"
          >
            {children}
          </Heading>
        </Stack>
      </Box>
    </Center>
  )
}

export { PokemonCard }
