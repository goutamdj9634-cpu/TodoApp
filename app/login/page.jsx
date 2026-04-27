"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import { Context } from "@/components/Clients";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),

        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      return toast.error(error);
    }
  };

  if (user._id) return redirect("/");

  return (
    <div className="login">
      <section>
        <form onSubmit={loginHandler}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter Password"
          />

          <button type="Submit">Log In</button>

          <p>or</p>

          <Link href={"/register"}>New User </Link>
        </form>
      </section>
    </div>
  );
};

export default page;
