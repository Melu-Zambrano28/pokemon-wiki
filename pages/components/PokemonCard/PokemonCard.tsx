import { Box, Center, Heading, Image, Stack } from '@chakra-ui/react'

export type Pokemon = {
  pokemonName: string
  pokemonSrc: string
}

const PokemonCard: React.FunctionComponent<Pokemon> = ({
  pokemonName,
  pokemonSrc,
}) => {
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
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}
        >
          <Image
            src={pokemonSrc}
            h="210px"
            objectFit="cover"
            alt={`Pokemon name ${pokemonName}`}
          />
        </Center>
        <Stack>
          <Heading
            fontSize={'2xl'}
            fontFamily={'body'}
            textTransform="capitalize"
          >
            {pokemonName}
          </Heading>
        </Stack>
      </Box>
    </Center>
  )
}

export { PokemonCard }
