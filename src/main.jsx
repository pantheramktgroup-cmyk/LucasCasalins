import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ThankYouPage from "./pages/ThankYouPage.jsx";

const path = window.location.pathname.replace(/\/$/, "") || "/";
const isThankYouPage =
  path === "/thank-you-page" ||
  path === "/thank-you-page-page";
const pageElement = isThankYouPage ? <ThankYouPage /> : <App />;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {pageElement}
  </StrictMode>,
);
