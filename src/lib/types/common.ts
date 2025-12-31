export interface EventImage {
  url: string;
  has_info?: boolean; // Setting to true hides the title, description, time, location, and club on card. Careful of accessibility issues.
}

export interface Repeat {
    every: number;
    unit: 'hours' | 'days' | 'weeks';
    times: number;
}