import {
  GridGames,
  NoResult,
  Pagination,
  Seo,
  Separator,
} from "@/components/Shared";
import { BasicLayout } from "@/layouts";
import { size } from "lodash";
import { useEffect } from "react";
import { Container } from "semantic-ui-react";

export default function SearchPage(props) {
  const { games, pagination, searchText } = props;
  const hasResult = size(games) > 0;

  useEffect(() => {
    document.getElementById("search-games").focus();
  }, []);

  return (
    <>
      <Seo title="Busqueda" />
      
      <BasicLayout relative isOpenSearch>
        <Container>
          <Separator height={50} />

          <h2>Buscando: {searchText}</h2>
          {hasResult ? (
            <>
              <GridGames games={games} />
              <Separator height={30} />
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              />
            </>
          ) : (
            <NoResult text="No se han encontrado resultados" />
          )}

          <Separator height={100} />
        </Container>
      </BasicLayout>
    </>
  );
}
