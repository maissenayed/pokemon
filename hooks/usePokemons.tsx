import { gql } from "graphql-request";
import { useInfiniteQuery } from "react-query";
import { graphQLClient } from "../shared/request";

// the graphql api is new and still in beta so it still missing some feature like cursor and total length
//for this demo the total length is hardcoded
const totalLength = 1126;
const limit = 20;

function usePokemons() {
  return useInfiniteQuery(
    ["pokemons"],
    async ({ pageParam = 0 }) => {
      const query = gql`
      query samplePokeAPIquery {
        pokemons: pokemon_v2_pokemon(limit: ${limit}, offset: ${pageParam}) {
          name
          id
          type: pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
        }
      }
    `;

      return await graphQLClient.request(query);
    },
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < Math.round(totalLength / limit)) {
          return pages.length * limit;
        } else {
          return undefined;
        }
      },
    }
  );
}

export default usePokemons;
