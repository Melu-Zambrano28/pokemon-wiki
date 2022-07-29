import { Box, Center, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { Pokemon, PokemonCard } from "../PokemonCard/PokemonCard";

type PokemonContainer = {
  pokemons: Pokemon[];
};

const PokemonContainer: React.FunctionComponent<PokemonContainer> = ({
  pokemons,
}) => {
  return (
    <Box margin="0 auto">
      <Grid templateColumns="repeat(3, 25rem)" justifyContent="center" gap={5}>
        {pokemons.map((pokemon, pokeIndex) => {
          return (
            <GridItem key={pokeIndex}>
              <PokemonCard name={pokemon.name} src={pokemon.src} />
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

export { PokemonContainer };
