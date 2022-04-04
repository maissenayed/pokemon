/* eslint-disable @next/next/no-img-element */
import usePokemons from "../hooks/usePokemons";
import PokemonCard from "./PokemonCard";
import LoaderSvg from "../assets/loader.svg";

interface IPokemonsListProps {
  generation: string;
}

function PokemonsList({ generation }: IPokemonsListProps) {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    usePokemons(generation);
  console.log({ hasNextPage });

  return (
    <>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {data?.pages.map((page) =>
            page.species?.map(({ id, name, details }) => (
              <PokemonCard key={name} id={id} name={name} types={details} />
            ))
          )}
        </div>

        <div className="flex justify-center mt-6">
          {hasNextPage ? (
            <button
              onClick={fetchNextPage}
              disabled={isFetchingNextPage}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center "
            >
              {isFetchingNextPage ? (
                <div className="hidden loader simple-circle mr-2"></div>
              ) : null}
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default PokemonsList;
