import { SectionType } from '@shared/enums';
import {
  ICertificatesSection,
  ICvData,
  IEducationSection,
  IExperienceSection,
  ILanguagesSection,
  IPersonalDetails,
  IProjectsSection,
  IReferencesSection,
  ISkillsSection,
  IStrengthsSection,
  ITrainingsSection,
  IVolunteeringSection,
} from '@shared/interfaces';

export class CvData implements ICvData {
  [SectionType.PERSONAL_DETAILS]: IPersonalDetails;
  [SectionType.SKILLS]: ISkillsSection;
  [SectionType.STRENGTHS]: Array<IStrengthsSection>;
  [SectionType.EXPERIENCE]: Array<IExperienceSection>;
  [SectionType.EDUCATION]: Array<IEducationSection>;
  [SectionType.PROJECTS]: Array<IProjectsSection>;
  [SectionType.LANGUAGES]: Array<ILanguagesSection>;
  [SectionType.TRAININGS]: Array<ITrainingsSection>;
  [SectionType.CERTIFICATES]: Array<ICertificatesSection>;
  [SectionType.REFERENCES]: Array<IReferencesSection>;
  [SectionType.VOLUNTEERING]: Array<IVolunteeringSection>;
  [SectionType.PASSIONS]: Array<string>;

  constructor(rawObject: ICvData) {
    this.personalDetails = rawObject?.personalDetails;
    this.skills = rawObject.skills;
    this.strengths = rawObject.strengths;
    this.experience = rawObject.experience;
    this.education = rawObject.education;
    this.projects = rawObject.projects;
    this.languages = rawObject.languages;
    this.trainings = rawObject.trainings;
    this.certificates = rawObject.certificates;
    this.references = rawObject.references;
    this.volunteering = rawObject.volunteering;
    this.passions = rawObject.passions;
  }
}
