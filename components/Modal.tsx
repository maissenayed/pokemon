/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import PokemonStats from "./PokemonStats";
import { Dialog } from "@headlessui/react";
interface IModalProps {
  isOpened: boolean;
  closeModal: () => void;
}
export default function Modal({
  isOpened,
  closeModal,
  selectedPokemon,
}: IModalProps) {
  function escHandler({ key }: KeyboardEvent) {
    if (key === "Escape") {
      closeModal();
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", escHandler);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", escHandler);
      }
    };
  }, []);

  const { id, name, pokemon, flavorText } = selectedPokemon || {};
  const pokemonDetails = pokemon?.nodes[0] || {};
  const { height, weight, stats } = pokemonDetails;
  const description = (flavorText?.length && flavorText[0]?.flavor_text) || "";

  return (
    <Dialog
      open={isOpened}
      onClose={closeModal}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <div className={`justify-center items-center flex outline-none`}>
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <img
                className="block h-50 mx-auto my-10"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                alt={name}
              />
              <h4 className="text-center text-3xl font-semibold capitalize bold">
                {name}
              </h4>
              <div className="flex mt-4 divide-x">
                <div className="flex-1 text-center">
                  <span>{weight / 10}kg</span>
                  <p>
                    <strong>Weight</strong>
                  </p>
                </div>
                <div className="flex-1 text-center">
                  <span>{height / 10}m</span>
                  <p>
                    <strong>Height</strong>
                  </p>
                </div>
              </div>
              <p className="text-center mt-5">{description}</p>
              <div className="mt-8">
                <PokemonStats stats={stats} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
