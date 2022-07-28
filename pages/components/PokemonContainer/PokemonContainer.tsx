import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Pokemon, PokemonCard } from "../PokemonCard/PokemonCard";

type PokemonContainer = {
  pokemons: Pokemon[];
};

const PokemonContainer: React.FunctionComponent<PokemonContainer> = ({
  pokemons,
}) => {
  return (
    <Box>
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        {pokemons.map((pokemon, pokeIndex) => {
          return (
            <GridItem key={pokeIndex}>
              <PokemonCard name={pokemon.name} url={pokemon.url} />
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

export { PokemonContainer };
