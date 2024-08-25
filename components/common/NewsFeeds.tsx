"use client";

import postData from "@/data/postData";
import ParentComment from "../ui/ParentComment";
import Post from "../ui/Post";
import PostReaction from "../ui/PostReaction";
import SiblingComment from "../ui/SiblingComment";
import WriteComment from "../ui/WriteComment";
import { useEffect, useState } from "react";
import { getAllTables, getUserInfo } from "../../contracts/contract-actions";

const NewsFeeds = ({ clss = "", reaction = "" }) => {
  const [tables, setTables] = useState<any[]>([]); // Masalar için state

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const allTables = await getAllTables();
        setTables([...allTables]); 
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, []); 

  return (
    <div className="post-item d-flex flex-column gap-5 gap-md-7" id="news-feed">
      {tables.map((post) => (
        <div key={post.id} className={`post-single-box ${clss}`}>
          <Post post={post} />
          <PostReaction reaction={reaction} post={post} />
        </div>
      ))}
    </div>
  );
};

export default NewsFeeds;
