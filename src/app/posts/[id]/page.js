import { db } from "@/utils/utilities";
import Link from "next/link";

export default async function Post({ params }) {
  const { id } = await params;

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
      <div>
        <Link href={`/posts`}>Back to All Posts</Link>
      </div>
    </div>
  );
}
