import pg from "pg";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function NewPostPage() {
  async function HandleSavedPost(formData) {
    "use server";

    const db = new pg.Pool({ connectionString: process.env.NEXT_POSTGRES });

    const title = formData.get("title");
    const content = formData.get("content");

    await db.query(`INSERT INTO posts (title, content) VALUES ($1, $2)`, [
      title,
      content,
    ]);
    console.log("post saved");

    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <form action={HandleSavedPost}>
      <label htmlFor="title">Title</label>
      <input id="title" name="title" type="text" />
      <label htmlFor="content">Content</label>
      <textarea id="content" name="content" />
      <button type="submit">Save</button>
    </form>
  );
}
