import { LogoutBtn } from "@/components/Clients";
import Link from "next/link";

const Header = () => {
  return (
    <div className="header">
      <div className="bli">
        <h2 className="hii">Todo.new</h2>
      </div>

      <article className="art">
        <Link href={"/"}>Home</Link>
        <Link href={"/profile"}>Profile</Link>

        <LogoutBtn />
      </article>
    </div>
  );
};

export default Header;
