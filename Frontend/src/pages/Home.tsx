import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home-icon">✉️</div>
      <h1>Contact Us</h1>
      <p className="home-subtitle">We are here to help you!</p>

      <div className="home-actions">
        <Link to="/contact">
          <Button variant="primary">Send Message</Button>
        </Link>
        <Link to="/queries">
          <Button variant="secondary">View Submitted Queries</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
