export const resumeSections = ['education', 'experience', 'projects', 'honors'] as const;
export const aboutSections = ['learning', 'biography', 'engineering-philosophy', 'technical-direction', 'skills', 'workshops', 'resume-and-contact'] as const;
export const projectSections = ['projects'] as const;

export type SectionId = typeof resumeSections[number] | typeof aboutSections[number];
