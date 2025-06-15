export interface Event {
  id: string;
  title: string;
  starts_at: string;
  venue_name: string;
  price: string | null;
  flyer_url: string | null;
  genre: string | null;
}

export interface AlertPref {
  id: string;
  user_id: string;
  genre: string | null;
  cheap_only: boolean;
  created_at: string;
}

export interface EventFront {
  id: string;
  title: string;
  starts_at: string;
  venue_name: string;
  genre: string | null;
  price: string | null;
  flyer_url: string | null;
  featured_until: string | null;
}
