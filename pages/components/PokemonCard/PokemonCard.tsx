import { Box, Text, Heading } from "@chakra-ui/react";

export type Pokemon = {
  name: string;
  url: string;
};

const PokemonCard: React.FunctionComponent<Pokemon> = ({ name, url }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="xl" textAlign="center">
        {name}
      </Heading>
      <Text>{url}</Text>
    </Box>
  );
};

export { PokemonCard };
