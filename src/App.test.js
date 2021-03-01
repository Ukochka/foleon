import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders resource header", () => {
  render(<App />);
  const headerElement = screen.getByText(/Resources/);
  expect(headerElement).toBeInTheDocument();
});

test("renders search input", () => {
  render(<App />);
  const headerElement = screen.getByPlaceholderText(
    /What are you looking for?/
  );
  expect(headerElement).toBeInTheDocument();
});

test("renders first tab header", () => {
  render(<App />);
  const headerElement = screen.getByText(/All Publications/);
  expect(headerElement).toBeInTheDocument();
});
