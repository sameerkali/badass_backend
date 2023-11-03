import { useEffect, useState } from "react";

const API_ENDPOINT = "http://localhost:6969/api/v1/blog/all-blog";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);

  // Cache the result of the blog post title expression
  const blogPostTitles = blogPosts?.blogs?.map((blogPost) => blogPost.title);
  const blogPostDescription = blogPosts?.blogs?.map((blogPost) => blogPost.description);

  useEffect(() => {
    async function fetchBlogPosts() {
      const response = await fetch(API_ENDPOINT);
      const blogPosts = await response.json();
      setBlogPosts(blogPosts);
    }

    fetchBlogPosts();
  }, []);

  return (
    <>
      <h1>Blog Posts</h1>
      <ul>
        {blogPostTitles?.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
      <ul>
        {blogPostDescription?.map((desc, index) => (
          <li key={index}>{desc}</li>
        ))}
      </ul>
    </>
  );
}
