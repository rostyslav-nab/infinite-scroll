import { CircularProgress, List, ListItem, Paper } from "@material-ui/core"
import Icon from '@material-ui/core/Icon'
import React from "react"
import { Waypoint } from "react-waypoint"
import { useBooksQuery } from "./generated/ApolloHooks"

const App = () => {
  const { data, fetchMore, networkStatus, } = useBooksQuery({
    variables: { first: 50 },
    notifyOnNetworkStatusChange: true
  });

  if (!data || !data.books) {
    return <CircularProgress />;
  }

  return (
    <div
      style={{
        backgroundColor: "#fae6a0",
        fontFamily: "cursive"
      }}
    >
      <div style={{ maxWidth: 600, margin: "auto", padding: 10, backgroundColor: "darkgray" }}>
        <Paper>
          <List>
            {data.books.books.map((x, i) => (
              <React.Fragment key={x.id}>
                <ListItem><Icon>book</Icon><b>Title:</b>&nbsp;{x.title}</ListItem>
                <ListItem><Icon>face</Icon><b>Author:</b>&nbsp;{x.author}</ListItem>
                <hr/>
                {data.books.hasNextPage && i === data.books.books.length - 10 && (
                  <Waypoint
                    onEnter={() =>
                      fetchMore({
                        variables: {
                          first: 50,
                          cursor:
                            data.books.books[data.books.books.length - 1].id
                        },
                        updateQuery: (pv, { fetchMoreResult }) => {
                          if (!fetchMoreResult) {
                            return pv;
                          }

                          return {
                            books: {
                              __typename: "BooksResponse",
                              books: [
                                ...pv.books.books,
                                ...fetchMoreResult.books.books
                              ],
                              hasNextPage: fetchMoreResult.books.hasNextPage
                            }
                          };
                        }
                      })
                    }
                  />
                )}
              </React.Fragment>
            ))}
          </List>
          {networkStatus === 3 && <CircularProgress />}
        </Paper>
      </div>
    </div>
  );
};

export default App
