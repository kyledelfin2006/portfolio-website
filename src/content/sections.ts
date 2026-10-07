export const resumeSections = ['education', 'experience', 'projects', 'skills', 'workshops'] as const;
export const aboutSections = ['honors', 'learning', 'biography', 'engineering-philosophy', 'technical-direction', 'workshops', 'resume-and-contact'] as const;
export const projectSections = ['projects'] as const;

export type SectionId = typeof resumeSections[number] | typeof aboutSections[number];
