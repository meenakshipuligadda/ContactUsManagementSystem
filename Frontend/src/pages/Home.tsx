import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <svg
        className="home-mark"
        viewBox="0 0 108 78"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect className="env-body" x="1" y="1" width="106" height="76" rx="8" />
        <line className="env-line" x1="22" y1="52" x2="66" y2="52" />
        <line className="env-line" x1="22" y1="62" x2="48" y2="62" />
        <path className="env-flap" d="M4 8 L54 44 L104 8" />
      </svg>

      <h1>Get in touch</h1>
      <p className="home-subtitle">
        Send us a message and we'll get back to you. Every enquiry is logged and
        tracked so nothing gets lost.
      </p>

      <div className="home-actions">
        <Link to="/contact">
          <Button variant="primary">Send a message</Button>
        </Link>
        <Link to="/queries">
          <Button variant="secondary">View submitted queries</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
