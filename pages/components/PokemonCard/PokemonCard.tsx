import {
  Avatar,
  Box,
  Center,
  Heading,
  Image,
  Stack,
  styled,
  Text,
} from "@chakra-ui/react";

export type Pokemon = {
  name: string;
  url: string;
};

const PokemonCard: React.FunctionComponent<Pokemon> = ({ name, url }) => {
  return (
    <Center py={6}>
      <Box
        maxW={"445px"}
        w={"full"}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Center
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <Image
            src={url}
            h="210px"
            objectFit="cover"
            alt={`Pokemon name ${name}`}
          />
        </Center>
        <Stack>
          <Heading
            fontSize={"2xl"}
            fontFamily={"body"}
            textTransform="capitalize"
          >
            {name}
          </Heading>
        </Stack>
      </Box>
    </Center>
  );
};

export { PokemonCard };
