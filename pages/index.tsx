import type { NextPage } from "next";
import Head from "next/head";
import PokemonsList from "../components/PokemonsList";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pokemons</title>
        <meta name="description" content="List Pokemons cards" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PokemonsList />
      </main>
    </>
  );
};

export default Home;
