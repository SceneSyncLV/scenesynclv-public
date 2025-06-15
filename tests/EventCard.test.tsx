import { render, screen } from "@testing-library/react";
import EventCard from "../src/components/EventCard";

const mockEvent = {
  id: "1",
  title: "Mock",
  starts_at: new Date().toISOString(),
  venue_name: "Test",
  genre: "Rock",
  price: "10",
  flyer_url: null,
  featured_until: null,
};

test("renders title and price badge", () => {
  render(<EventCard event={mockEvent} idx={0} />);
  expect(screen.getByText(/Mock/)).toBeInTheDocument();
  expect(screen.getByText(/\$10/)).toBeInTheDocument();
});
