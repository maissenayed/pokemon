import { gql } from "graphql-request";
import { useQueryClient, useInfiniteQuery, useQuery } from "react-query";
import { graphQLClient } from "../shared/request";

function usePokemons(selectedGeneration = "") {
  const queryCache = useQueryClient();
  const generations = queryCache.getQueryData(["generations"]);
  console.log("generations", generations);
  const genLlimit = generations?.generations?.find(
    (gen) => gen.name === selectedGeneration
  )?.pokemon_species.aggregate.count;
  console.log("limit", genLlimit);

  return useQuery(["pokemons", selectedGeneration], async () => {
    const query = gql`
      query pokemon_details {
        species: pokemon_v2_pokemonspecies(
          where: { pokemon_v2_generation: { name: { _eq: "${selectedGeneration}" } } }
          limit: 10
          offset: 0
        ) {
          id
          name
          base_happiness
          is_legendary
          is_mythical
          generation: pokemon_v2_generation {
            name
          }
          habitat: pokemon_v2_pokemonhabitat {
            name
          }
          pokemon: pokemon_v2_pokemons_aggregate(limit: 1) {
            nodes {
              height
              name
              id
              weight
              abilities: pokemon_v2_pokemonabilities_aggregate {
                nodes {
                  ability: pokemon_v2_ability {
                    name
                  }
                }
              }
              stats: pokemon_v2_pokemonstats {
                base_stat
                stat: pokemon_v2_stat {
                  name
                }
              }
              types: pokemon_v2_pokemontypes {
                slot
                type: pokemon_v2_type {
                  name
                }
              }
              levelUpMoves: pokemon_v2_pokemonmoves_aggregate(
                where: {
                  pokemon_v2_movelearnmethod: { name: { _eq: "level-up" } }
                }
                distinct_on: move_id
              ) {
                nodes {
                  move: pokemon_v2_move {
                    name
                  }
                  level
                }
              }
              foundInAsManyPlaces: pokemon_v2_encounters_aggregate {
                aggregate {
                  count
                }
              }
              fireRedItems: pokemon_v2_pokemonitems(
                where: { pokemon_v2_version: { name: { _eq: "firered" } } }
              ) {
                pokemon_v2_item {
                  name
                  cost
                }
                rarity
              }
            }
          }
          flavorText: pokemon_v2_pokemonspeciesflavortexts(
            where: {
              pokemon_v2_language: { name: { _eq: "en" } }
              pokemon_v2_version: { name: { _eq: "firered" } }
            }
          ) {
            flavor_text
          }
          details: pokemon_v2_pokemons {
            types: pokemon_v2_pokemontypes {
                type: pokemon_v2_type {
                    name
                }
            }
            }
        }
      }
    `;

    return await graphQLClient.request(query);
  });
}

export default usePokemons;
