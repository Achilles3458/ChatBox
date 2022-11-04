import { Link } from "react-router-dom";
export default function Four0Four() {
  return (
    <div className="container-sm bg-main text-center rounded py-3 text-light">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/">
        <button className="btn btn-primary bg-darkMain btn-outline-dark text-light">
          Return To ChatBox List
        </button>
      </Link>
    </div>
  );
}
