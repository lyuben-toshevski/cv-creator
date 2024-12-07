export interface IPersonalDetails {
  name: string;
  jobTitle: string;
  phone: string;
  email: string;
  location: string;
  portfolio: string;
}

export type ISkillsSection = Array<string>;

export interface IStrengthsSection {
  name: string;
  description: string;
}

export interface IExperienceSection {
  employerName: string;
  jobTitle: string;
  description: string;
  location: string;
  position: string;
  startDate: string;
  endDate: string;
}

export interface IEducationSection {
  degree: string;
  specialty: string;
  endDate: string;
  location: string;
  startDate: string;
  university: string;
}

export interface IProjectsSection {
  description: string;
  endDate: string;
  githubLink: string;
  location: string;
  name: string;
  startDate: string;
}

export interface ILanguagesSection {
  language: string;
  level: string;
}

export interface ITrainingsSection {
  description: string;
  endDate: string;
  location: string;
  name: string;
  startDate: string;
}

export interface ICertificatesSection {
  description: string;
  name: string;
  endDate: string;
}

export interface IReferencesSection {
  name: string;
  position: string;
  phone: string;
  email: string;
}

export interface IVolunteeringSection {
  description: string;
  endDate: string;
  location: string;
  name: string;
  startDate: string;
}

export type IPassionsSection = Array<string>;

export type SectionData =
  | IPersonalDetails
  | ISkillsSection
  | IStrengthsSection
  | IExperienceSection
  | IEducationSection
  | IProjectsSection
  | ILanguagesSection
  | ITrainingsSection
  | ICertificatesSection
  | IReferencesSection
  | IVolunteeringSection
  | IPassionsSection;
