import { Game } from "@/api";

export { default } from "./search";

export async function getServerSideProps(context) {
  const {
    query: { s, page = 1 },
  } = context;

  const gameCrtl = new Game();
  const responseGames = await gameCrtl.searchGames(s, page);

  return {
    props: {
      games: responseGames.data,
      pagination: responseGames.meta.pagination,
      searchText: s,
    },
  };
}
