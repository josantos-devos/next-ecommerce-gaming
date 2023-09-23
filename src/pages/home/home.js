import { Home } from "@/components/Home";
import { BannerAd, BarTrust, Separator } from "@/components/Shared";
import { BasicLayout } from "@/layouts";
import { Container } from "semantic-ui-react";

const platformId = {
  playstation: 1,
  xbox: 2,
  nintendo: 3,
  pc: 4,
};

export default function home() {
  return (
    <>
      {/* SEO */}

      <BasicLayout>
        <Home.BannerLastGamePublished />

        <Separator height={100} />

        <Container>
          <Home.LastesGames title="Ultimos lanzamientos" />
        </Container>

        <Separator height={100} />

        <BarTrust />

        <Separator height={100} />

        <Container>
          <Home.LastesGames
            title="PlayStation"
            limit={3}
            platformId={platformId.nintendo}
          />
        </Container>

        <Separator height={100} />

        <BannerAd
          title="Registrate y obten los mejores precios"
          subtitle="!Compara con otros juegos y elige el tuyo!"
          btnTitle="Entrar ahora"
          btnLink="/account"
          image="/images/img01.png"
        />

        <Separator height={50} />

        <Container>
          <Home.LastesGames
            title="Xbox"
            limit={3}
            platformId={platformId.xbox}
          />
        </Container>

        <Separator height={100} />
      </BasicLayout>
    </>
  );
}
