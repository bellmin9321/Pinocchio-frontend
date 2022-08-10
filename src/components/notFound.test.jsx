import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import NotFound from "./NotFound";

describe("NotFoundPage", () => {
  beforeEach(() => {
    render(
      <Router>
        <NotFound />
      </Router>,
    );
  });

  it("render NotFoundPage page text", () => {
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("render error-image", () => {
    expect(screen.getByAltText("error-img")).toHaveAttribute(
      "src",
      "image/Error_Image.png",
    );
  });

  it("move to <Home /> when button is clicked ", () => {
    const button = screen.getByRole("button", { name: "Home" });

    fireEvent.click(button);

    waitFor(() => {
      expect(screen.getByText("CLICK")).toBeInTheDocument();
      expect(screen.getByText("Be honest")).toBeInTheDocument();
    });
  });
});
