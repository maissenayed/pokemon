import { gql } from "graphql-request";
import { useQuery } from "react-query";
import { graphQLClient } from "../shared/request";

function useGenerations() {
  return useQuery(["generations"], async () => {
    const query = gql`
      query gensAPIquery {
        generations: pokemon_v2_generation {
          name
          pokemon_species: pokemon_v2_pokemonspecies_aggregate {
            aggregate {
              count
            }
          }
        }
      }
    `;

    return await graphQLClient.request(query);
  });
}

export default useGenerations;
