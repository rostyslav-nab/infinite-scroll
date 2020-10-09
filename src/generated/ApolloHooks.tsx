type Maybe<T> = T | null
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
}

export type Book = {
  id: Scalars["ID"]
  title?: Maybe<Scalars["String"]>
  author?: Maybe<Scalars["String"]>
}

export type BooksResponse = {
  books: Array<Book>
  hasNextPage: Scalars["Boolean"]
}

export type BooksQueryVariables = {
  cursor?: Maybe<Scalars["String"]>
  first: Scalars["Int"]
};

export type BooksQuery = { __typename?: "Query" } & {
  books: { __typename?: "BooksResponse" } & Pick<
    BooksResponse,
    "hasNextPage"
  > & {
      books: Array<
        { __typename?: "Book" } & Pick<Book, "id" | "title" | "author">
      >;
    };
};

import gql from "graphql-tag"
import * as ReactApolloHooks from "react-apollo-hooks"

export const BooksDocument = gql`
  query Books($cursor: String, $first: Int!) {
    books(cursor: $cursor, first: $first) {
      books {
        id
        title
        author
      }
      hasNextPage
    }
  }
`;

export function useBooksQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<BooksQueryVariables>
) {
  return ReactApolloHooks.useQuery<BooksQuery, BooksQueryVariables>(
    BooksDocument,
    baseOptions
  );
}
