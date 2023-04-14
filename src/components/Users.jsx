import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("users: ", users);
  const FetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    FetchData();
  }, []);
  return (
    <Wrapper>
      <div className="users">
        <h2>USERS</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          users.map((user) => {
            return (
              <div className="user" key={user.id}>
                <span>{user.id + ")"} </span>

                <Link to={`user/${user.id}`} className="name">
                  {user.name}
                </Link>
                <div className="pop-up">
                  <p>Email:{user.email}</p>
                  <p>UserName:{user.username}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 100vh;
  text-align: start;
  .users {
    box-shadow: 0 0 2px 0 gray;
    width: 350px;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    align-items: center;
    justify-content: center;
    .user {
      width: 100%;
      background-color: gray;
      padding: 4px;
      position: relative;
      transition: all 1.5s ease-in-out;
      .pop-up {
        display: none;
        position: absolute;
        top: 100%;
        left: 5%;
        right: 5%;
        background-color: #fff;
        padding: 0.5em;
        min-width: 10rem;
      }

      :hover {
        .pop-up {
          display: block;
        }
      }
    }
  }
`;
export default Users;
