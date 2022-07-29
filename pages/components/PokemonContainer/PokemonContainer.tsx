import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Pokemon, PokemonCard } from "../PokemonCard/PokemonCard";

type PokemonContainer = {
  pokemons: Pokemon[];
};

const PokemonContainer: React.FunctionComponent<PokemonContainer> = ({
  pokemons,
}) => {
  return (
    <Box maxWidth="78rem" margin="0 auto">
      <Grid templateColumns="repeat(3, 25rem)" justifyContent="center" gap={5}>
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
