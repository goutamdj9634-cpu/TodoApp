import { TodoItem } from "@/components/ServerComponent";
import Form from "./AddTodoForm";
import { Suspense } from "react";
import Todos from "./todos";

export default function page() {
  return (
    <div className="container">
      <Form />

      <Suspense fallback={<div>loading...</div>}>
        <Todos />
      </Suspense>
    </div>
  );
}
