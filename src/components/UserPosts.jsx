import React, { useState } from "react";
import styled from "styled-components";
import { FaRegCommentDots } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
const UserPosts = ({ posts, comments, albums, setPosts }) => {
  // handle comments
  const [showComments, setShowComments] = useState(false);
  // manage to show posts and albums
  const [viewPosts, setViewPosts] = useState(true);
  // handle Delete
  const handleDelete = () => {
    const newPosts = posts.filter((elem) => {
      return elem.id !== elem.id;
    });
    setPosts(newPosts);
  };
  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "2rem",
          width: "600px",
        }}
      >
        <button style={{ width: "200px" }} onClick={() => setViewPosts(true)}>
          Posts
        </button>
        <button style={{ width: "200px" }} onClick={() => setViewPosts(false)}>
          Alubms
        </button>
      </div>
      <h4>{viewPosts ? "My Posts" : "My Albums"}</h4>
      {/* user posts */}
      {viewPosts ? (
        <section className="user-posts">
          {/* serch posts */}
          <div>
            <span>Search</span>{" "}
            <input type="search" placeholder="search post" />
          </div>
          {posts?.map((post) => {
            return (
              <div key={post?.id} className="post">
                <button
                  style={{ float: "right" }}
                  onClick={() => handleDelete()}
                >
                  Delete
                </button>
                <button style={{ float: "right", marginRight: "5px" }}>
                  <BiEdit />
                  Edit
                </button>
                <h4 style={{ marginBottom: "1rem" }}>
                  Title: <span>{post?.title}</span>
                </h4>
                <p>Message: {post?.body}</p>
                <button
                  style={{ marginTop: "5px", marginRight: "5px" }}
                  onClick={() => setShowComments(!showComments)}
                >
                  {showComments ? "Hide Comments" : "Show Comments"}
                </button>
                {/* comments */}
                {showComments && (
                  <div className="comments">
                    {comments?.map((comment) => {
                      return (
                        <div key={comment.id}>
                          <h5>{comment?.name}</h5>
                          <p>{comment?.body}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
                <form
                  method="POST"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1.2rem",
                  }}
                >
                  <input
                    type="text"
                    placeholder="enter comment"
                    style={{ width: "30vw", height: "40px" }}
                  />
                  <button type="submit">
                    <FaRegCommentDots />
                    comment
                  </button>
                </form>
              </div>
            );
          })}
        </section>
      ) : (
        <>
          {/* user alubums */}
          <section className="albums">
            {albums?.map((photo) => {
              return (
                <div key={photo.id}>
                  <img src={photo?.thumbnailUrl} />
                </div>
              );
            })}
          </section>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  box-shadow: 0 0 2px 1px gray;
  max-width: 600px;

  /* user posts */
  .user-posts {
    text-align: start;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .post {
      span {
        font-weight: bold;
      }
    }
  }

  .albums {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    img {
      max-width: 150px;
    }
  }
`;
export default UserPosts;
