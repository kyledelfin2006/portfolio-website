export interface WorkshopEntry {
  title: string;
  issuerOrOrganizer: string;
  date: string;
  certificateUrl?: string;
  keyTakeaways?: string[];
}

// Only add confirmed dates and direct credential URLs supplied by the owner.
// The references confirm the scholarship, but not dates or completed tracks.
export const workshops: WorkshopEntry[] = [
  {
    title: 'DataCamp Scholarship Program',
    issuerOrOrganizer: 'DataCamp x Data Engineering Pilipinas',
    date: '',
    keyTakeaways: ['Scholarship supporting continued learning in data and engineering.'],
  },
  // Add verified workshops and certifications here.
];
