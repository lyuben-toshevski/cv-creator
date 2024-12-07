import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CvService {
  cvData$ = new BehaviorSubject({
    personalDetails: {
      name: 'John Doe',
      jobTitle: 'Software Engineer',
      phone: '+35988723435',
      email: '',
      location: '',
      portfolio: '',
      summary: '',
    },
    skills: ['Angular', 'React', 'Vue'],
    strengths: [{ name: 'Strength 1', description: 'Description 1' }],
    experience: [
      {
        employerName: 'Employer name 1',
        description: 'Description 1',
        location: 'Location 1',
        position: 'Position 1',
        startDate: '2021-01-01',
        endDate: '2021-01-01',
      },
    ],
    education: [
      {
        degree: 'Degree 1',
        specialty: 'Informatics',
        endDate: '2021-01-01',
        location: 'Location 1',
        startDate: '2021-01-01',
        university: 'University 1',
      },
    ],
  });
  constructor() {}
}
