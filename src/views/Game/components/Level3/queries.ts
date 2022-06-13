import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'

import { Dispatch, SetStateAction } from "react"
import { DocumentNode } from 'graphql'


export const snapshotClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://hub.snapshot.org/graphql'
  }),
  cache: new InMemoryCache()
})

export const VOTED = gql`
  query Votes($proposalId: String!, $voter: String!) {
    votes (
      where: {
        proposal: $proposalId,
        voter: $voter
      }
    ) {
      voter
      choice
    }
  }
`;

interface DelegateQuery {
  query: DocumentNode
  variables?: { proposalId: string; voter: string; skip?: number | undefined }
  fetchPolicy: string
}

async function fetchVotedFromClient(
  client: any,
  setError: Dispatch<SetStateAction<string>>,
  query: DelegateQuery,
): Promise<boolean | null> {
  try {
    return client
      .query(query)
      .then(async (res) => {
        return res.data?.votes?.length > 0;
      })
      .catch((e: any) => {
        const errorMsg = `Error fetching delegates from subgraph: ${e.message}`
        setError(errorMsg)
        return Promise.reject(errorMsg)
      })
  } catch (e) {
    const errorMsg = 'Unable to fetch delegates'
    setError(errorMsg)
    return Promise.reject(errorMsg)
  }
}

export async function fetchVoted(
  client: any,
  setError: Dispatch<SetStateAction<string>>,
  proposalId: string,
  voter: string,
): Promise<boolean | null> { // FIX
  return fetchVotedFromClient(client, setError, {
    query: VOTED,
    variables: {
      proposalId: proposalId,
      voter: voter
    },
    fetchPolicy: 'cache-first'
  })
}