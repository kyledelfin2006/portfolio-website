export const resumeSections = ['education', 'experience', 'projects', 'honors', 'skills'] as const;
export const aboutSections = ['biography', 'technical-skills', 'workshops', 'engineering-philosophy', 'resume-and-contact'] as const;
export const projectSections = ['projects'] as const;

export type SectionId = typeof resumeSections[number] | typeof aboutSections[number];
