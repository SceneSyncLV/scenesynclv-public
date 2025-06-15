export interface Event {
  id: string;
  title: string;
  starts_at: string;
  venue_name: string;
  price: string | null;
  flyer_url: string | null;
}
