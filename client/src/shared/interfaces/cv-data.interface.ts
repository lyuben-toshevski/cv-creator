import { SectionType } from '@shared/enums';
import {
  IEducationSection,
  IProjectsSection,
  ILanguagesSection,
  ITrainingsSection,
  ICertificatesSection,
  IReferencesSection,
  IVolunteeringSection,
  IPassionsSection,
  IPersonalDetails,
} from './section-data.interface';

export interface ICvData {
  [SectionType.PERSONAL_DETAILS]: IPersonalDetails;
  [SectionType.SKILLS]: Array<string>;
  [SectionType.STRENGTHS]: Array<{ name: string; description: string }>;
  [SectionType.EXPERIENCE]: Array<{
    employerName: string;
    jobTitle: string;
    description: string;
    location: string;
    position: string;
    startDate: string;
    endDate: string;
  }>;
  [SectionType.EDUCATION]: Array<IEducationSection>;
  [SectionType.PROJECTS]: Array<IProjectsSection>;
  [SectionType.LANGUAGES]: Array<ILanguagesSection>;
  [SectionType.TRAININGS]: Array<ITrainingsSection>;
  [SectionType.CERTIFICATES]: Array<ICertificatesSection>;
  [SectionType.REFERENCES]: Array<IReferencesSection>;
  [SectionType.VOLUNTEERING]: Array<IVolunteeringSection>;
  [SectionType.PASSIONS]: IPassionsSection;
}
