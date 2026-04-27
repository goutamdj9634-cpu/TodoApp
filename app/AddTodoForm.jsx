"use client";

import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { Context } from "../components/Clients";

const AddTodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useContext(Context);

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/newtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      // Guard: if server returned HTML error page, don't try to parse JSON
      if (!res.ok && res.headers.get("content-type")?.includes("text/html")) {
        return toast.error("Server error. Check console.");
      }

      const data = await res.json();

      if (!data.success) return toast.error(data.message || "Error");

      toast.success(data.message);
      router.refresh();
      setTitle("");
      setDescription("");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  // SAFE GUARD
  if (!user) return null;
  if (!user._id) return redirect("/login");

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Task Title"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Task Description"
          />

          <button type="submit">Create Task</button>
        </form>
      </section>
    </div>
  );
};

export default AddTodoForm;
