import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <div>
      <Link to="/" style={{ marginRight: "1rem" }}> Home</Link>
      <Link to="/meetings"> Meetings</Link>
      </div>
    </nav>
  );
}
