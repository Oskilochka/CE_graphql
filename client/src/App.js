import { useMutation, useQuery } from "@apollo/client";
import "./App.css";
import React from "react";
import { CREATE_USER } from "./mutations/user";
import { GET_USERS_LIST } from "./query/user";

function App() {

  const [ users, setUsers ] = React.useState([]);
  const [ username, setUsername ] = React.useState("");
  const [ age, setAge ] = React.useState(0);

  const {
    data,
    loading,
    error,
  } = useQuery(GET_USERS_LIST);
  const {
    data: user,
    loading: userLoading,
  } = useQuery(GET_USER({
    variables: {
      id: 12345676543
    }
  }));

  const [ newUser ] = useMutation(CREATE_USER);

  React.useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [ data, loading ]);

  const addUser = (e) => {
    e.preventDefault()
    newUser({
      variables: {
        input: {
          username, age
        }
      }
    }).then(({ data }) => {
      console.log(data, 'data');
    })
    setUsername('')
    setAge(0)
  }

  return (
    <div>
      <form>
        <input value={username} onChange={e => setUsername(e.target.value)} type="text" />
        <input value={age} onChange={e => setAge(+e.target.value)} type="number" />

        <button >Get</button>
        <button onClick={(e) => addUser(e)}>Create</button>
      </form>

      {
        loading ? <h1>Loading</h1> :
          <div>
            {users?.map((user, i) => {
              return (
                <div key={user.id + i}>
                  {user.id}
                  {user.username}
                  {user.age}

                </div>
              );
            })}
          </div>
      }
    </div>
  );
}

export default App;
