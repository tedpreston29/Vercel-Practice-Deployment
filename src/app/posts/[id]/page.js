import pg from "pg";
import db from "@/utils/utilities";

export default async function Post({ params }) {
  const { id } = await params;

  const db = new pg.Pool({
    connectionString: process.env.NEXT_POSTGRES,
  });

  const result = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
  const post = result.rows;

  return (
    <div>
      {post.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
