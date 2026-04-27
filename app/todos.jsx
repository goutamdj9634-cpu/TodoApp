import { TodoItem } from "@/components/ServerComponent";
import { cookies } from "next/headers";

const fetchTodo = async (token) => {
  try {
    const base = process.env.URL || "http://localhost:3000";

    const res = await fetch(`${base}/api/mytask`, {
      cache: "no-cache",
      headers: {
        cookie: `token=${token}`,
      },
    });

    if (!res.ok) return [];

    const data = await res.json();

    return data.success ? data.tasks : [];
  } catch (error) {
    console.error("fetchTodo error:", error.message);
    return [];
  }
};

const Todos = async () => {
  const cookieStore = await cookies(); // ✅ await required in Next.js 15
  const token = cookieStore.get("token")?.value;

  if (!token) return <p>Please login to see tasks.</p>;

  const tasks = await fetchTodo(token);

  if (!tasks.length) return <p>No tasks found.</p>;

  return (
    <section className="todosContainer">
      {tasks.map((i) => (
        <TodoItem
          key={i._id}
          id={i._id}
          title={i.title}
          description={i.description}
          completed={i.isCompleted}
        />
      ))}
    </section>
  );
};

export default Todos;
