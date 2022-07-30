import {
  Avatar,
  Box,
  Center,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Stack,
} from '@chakra-ui/react'
import Link from 'next/link'

export type Pokemon = {
  name: string
  src: string
}

const PokemonCard: React.FunctionComponent<Pokemon> = ({ name, src }) => {
  return (
    <LinkBox>
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
              src={src}
              h="210px"
              objectFit="cover"
              alt={`Pokemon name ${name}`}
            />
          </Center>
          <Stack>
            <Heading
              fontSize={'2xl'}
              fontFamily={'body'}
              textTransform="capitalize"
            >
              <Link
                href={{
                  pathname: '/pokemon-wiki/[name]',
                  query: { name: name },
                }}
              >
                <LinkOverlay>{name}</LinkOverlay>
              </Link>
            </Heading>
          </Stack>
        </Box>
      </Center>
    </LinkBox>
  )
}

export { PokemonCard }
