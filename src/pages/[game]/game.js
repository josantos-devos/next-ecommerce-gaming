import { Game } from "@/components/Game";
import { Separator } from "@/components/Shared";
import { BasicLayout } from "@/layouts";

export default function GamePage(props) {
  const { game } = props;

  const wallpaper = game.attributes.wallpaper;

  return (
    <>
      <BasicLayout>
        <Game.HeaderWallpaper image={wallpaper.data.attributes.url} />
        <Game.Panel gameId={game.id} game={game.attributes} />

        <Separator height={50} />

        <Game.Info game={game.attributes} />

        <Separator height={30} />

        <Game.Media
          video={game.attributes.video}
          screenshots={game.attributes.screenshots.data}
        />
      </BasicLayout>
    </>
  );
}
