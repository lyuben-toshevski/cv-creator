import { Injectable } from '@angular/core';
import { SectionType } from '@shared/enums';
import { SectionData } from '@shared/interfaces';
import { CvData } from '@shared/models';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';

export const initialData = {
  personalDetails: {
    name: 'John Doe',
    jobTitle: 'Software Engineer',
    phone: '+35988723435',
    email: 'toshevski@gmail.com',
    location: 'Remote',
    portfolio: 'toshevski.com',
  },
  [SectionType.SKILLS]: ['Angular', 'React', 'Vue'],
  [SectionType.STRENGTHS]: [
    { name: 'Strength 1', description: 'Description 1' },
  ],
  [SectionType.EXPERIENCE]: [
    {
      employerName: 'Employer name 1',
      jobTitle: 'Job title 1',
      description: 'Description 1',
      location: 'Location 1',
      position: 'Position 1',
      startDate: '2021-01-01',
      endDate: '2021-01-01',
    },
  ],
  [SectionType.EDUCATION]: [
    {
      degree: 'Degree 1',
      specialty: 'Informatics',
      endDate: '2021-01-01',
      location: 'Location 1',
      startDate: '2021-01-01',
      university: 'University 1',
    },
  ],
  [SectionType.PROJECTS]: [
    {
      description: 'Description 1',
      endDate: '2021-01-01',
      githubLink: 'github.com',
      location: 'Location 1',
      name: 'Project 1',
      startDate: '2021-01-01',
    },
  ],
  [SectionType.LANGUAGES]: [{ language: 'English', level: 'Native' }],
  [SectionType.TRAININGS]: [
    {
      description: 'Description 1',
      endDate: '2021-01-01',
      location: 'Location 1',
      name: 'Training 1',
      startDate: '2021-01-01',
    },
  ],
  [SectionType.CERTIFICATES]: [
    {
      description: 'Description 1',
      name: 'Certificate 1',
      endDate: '2021-01-01',
    },
  ],
  [SectionType.REFERENCES]: [
    {
      name: 'Reference 1',
      position: 'Position 1',
      phone: '+35988723435',
      email: '',
    },
  ],
  [SectionType.VOLUNTEERING]: [
    {
      description: 'Description 1',
      endDate: '2021-01-01',
      location: 'Location 1',
      name: 'Volunteering 1',
      startDate: '2021-01-01',
    },
  ],
  [SectionType.PASSIONS]: ['Pass', 'Passion'],
};

@Injectable({ providedIn: 'root' })
export class CvService {
  private _cvData$ = new BehaviorSubject<CvData>(new CvData(initialData));

  getCvData(): Observable<CvData> {
    return this._cvData$.pipe(delay(1000));
  }

  updateCvData(sectionType: SectionType, payload: SectionData): void {
    this._cvData$.next({
      ...this._cvData$.value,
      [sectionType]: payload,
    });
  }
}
