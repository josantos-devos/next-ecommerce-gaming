import {
  GridGames,
  NoResult,
  Pagination,
  Seo,
  Separator,
} from "@/components/Shared";
import { BasicLayout } from "@/layouts";
import { size } from "lodash";
import { Container } from "semantic-ui-react";

export default function PlatformPage(props) {
  const { games, platform, pagination } = props;
  const hasProduct = size(games);

  return (
    <>
      <Seo title={`Juegos de ${platform.attributes.title}`} />

      <BasicLayout relative>
        <Container>
          <Separator height={50} />

          <h2>{platform.attributes.title}</h2>

          {hasProduct ? (
            <>
              <GridGames games={games} />
              <Separator height={30} />
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              />
            </>
          ) : (
            <NoResult
              text={`La categoria ${platform.attributes.title} aun no tiene productos`}
            />
          )}

          <Separator height={100} />
        </Container>
      </BasicLayout>
    </>
  );
}
