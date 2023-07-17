import {gql} from '@apollo/client'

export const GET_USERS_LIST = gql`
  query {
      getAllUsers{
          id
          username
          age
      }
  }
`

export const GET_USER = gql`
    query getUser($id: ID ) {
        getUser(id: $id){
            id
            username
        }
    }
`

