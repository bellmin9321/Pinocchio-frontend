import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("<Home />", () => {
  beforeEach(() => {
    render(
      <Router>
        <Home />
      </Router>,
    );
  });

  it("render text", () => {
    expect(screen.getByText("CLICK !")).toBeInTheDocument();
    expect(screen.getByText("Be honest .")).toBeInTheDocument();
  });

  it("render logo-image", () => {
    expect(screen.getByAltText("logo-img")).toHaveAttribute(
      "src",
      "image/beHonest.png",
    );
  });

  it("move to <Main /> when logo-image is clicked ", () => {
    expect(screen.getByRole("link")).toHaveAttribute("href", "/main");
  });
});
