import { Game } from "@/api";

export { default } from "./game";

export async function getServerSideProps(context) {
  const {
    params: { game },
  } = context;

  const gameCrtl = new Game();
  const responseGame = await gameCrtl.getBySlug(game);

  return {
    props: {
      game: responseGame,
    },
  };
}
