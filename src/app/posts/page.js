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
          <Link key={post.id} href={`/post/${post.id}`}>
            {post.title}
          </Link>
        ))}
      </ul>
    </div>
  );
}
