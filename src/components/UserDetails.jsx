import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import UserPosts from "./UserPosts";

const UserDetails = () => {
  const { id } = useParams();
  // api
  const API = "https://jsonplaceholder.typicode.com";
  // loading state
  const [loading, setLoading] = useState(true);
  // managing user state
  const [user, setUser] = useState([]);
  // managing posts state
  const [posts, setPosts] = useState([]);
  console.log("posts: ", posts);
  const [albums, setAlbums] = useState([]);
  console.log("albums: ", albums);

  // manganing comments of user posts
  const [comments, setComments] = useState([]);
  console.log("comments: ", comments);



  useEffect(() => {
    // fetching user by id
    axios
      .get(`${API}/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // fetching users posts

    axios
      .get(`${API}/posts?userId=${id}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // fetching 0comments for post

    axios
      .get(`${API}/posts/${id}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // get alubums
    axios.get(`${API}/photos?albumId=${id}`).then((response) => {
      setAlbums(response.data);
    });

    setLoading(false);
  }, [id]);

  return (
    <Wrapper>
      <h4 style={{ textAlign: "start" }}>
        {" "}
        <Link to="/">
          <BiArrowBack /> Back
        </Link>
      </h4>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* user info */}
          <section className="single-user">
            <FaUserCircle className="icon" />
            <hr />
            <div className="user-details">
              <h4>
                NAME: <span>{user?.name}</span>
              </h4>
              <h4>
                EMAIL: <span>{user?.email}</span>
              </h4>
              <h4>
                PHONE: <span>{user?.phone}</span>
              </h4>
              <h4>
                WEBSITE:<span>{user?.website}</span>
              </h4>
              <h4>ADDRESS:</h4>
              <address>
                {`Street: ${user?.address?.street},${user?.address?.suite},ZipCode: ${user?.address?.zipcode}`}
              </address>
            </div>
          </section>
        </>
      )}
      {/* userPosts */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <UserPosts
          posts={posts}
          setPosts={setPosts}
          comments={comments}
          albums={albums}
          
          id={id}
        />
      )}
    </Wrapper>
  );
};
const Wrapper = styled.section`
  box-shadow: 0 0 2px 1px gray;

  .single-user {
    box-shadow: 0 0 2px 1px gray;
    max-width: 600px;
    .icon {
      font-size: 4rem;
    }
    .user-details {
      text-align: start;
      span {
        font-size: medium;
        font-weight: 100;
      }
    }
  }
`;
export default UserDetails;
