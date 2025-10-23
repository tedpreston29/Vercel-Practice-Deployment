import Link from "next/link";
import pg from "pg";

export default async function PostsPage() {
  const db = new pg.Pool({
    connectionString: process.env.NEXT_POSTGRES,
  });

  const posts = (await db.query(`SELECT * FROM posts`)).rows;
  console.log(posts);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <Link key={posts.id} href={`/posts/new`}>
        Make New Post!
      </Link>
    </div>
  );
}
