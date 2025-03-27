import {EventsByDate} from '../models/event.model';

export const events: EventsByDate = {
  '2025-03-27': [
    {
      id: 'event-1',
      title: 'Coffee with Alex',
      description:
        "Meet with Alex to brainstorm ideas for the upcoming product launch. We'll review market research and competitor analysis to identify potential opportunities and challenges.",
      imageUrl:
        'https://fastly.picsum.photos/id/312/1920/1080.jpg?hmac=OD_fP9MUQN7uJ8NBR7tlii78qwHPUROGgohG4w16Kjw',
      time: '09:00 AM',
    },
    {
      id: 'event-2',
      title: 'Team Standup',
      description:
        "Weekly standup meeting with the dev team. Discuss progress, blockers, and align on next week's priorities.",
      imageUrl:
        'http://fastly.picsum.photos/id/737/1920/1080.jpg?hmac=aFzER8Y4wcWTrXVx2wVKSj10IqnygaF33gESj0WGDwI',
      time: '02:00 PM',
    },
  ],
  '2025-03-28': [
    {
      id: 'event-3',
      title: 'Yoga Session',
      description:
        'Join for a relaxing yoga session to reduce stress and improve mindfulness. Suitable for all levels, focusing on gentle stretches.',
      imageUrl:
        'https://fastly.picsum.photos/id/392/1920/1080.jpg?hmac=Fvbf7C1Rcozg8EccwYPqsGkk_o6Bld2GQRDPZKWpd7g',
      time: '12:00 PM',
    },
    {
      id: 'event-4',
      title: 'Product Demo',
      description:
        'Demo of UI improvements and performance optimizations to gather stakeholder feedback.',
      imageUrl: 'https://picsum.photos/seed/picsum/200/100',
      time: '03:30 PM',
    },
  ],
  '2025-03-29': [
    {
      id: 'event-5',
      title: 'Client Meeting',
      description:
        'Review project progress, timeline adjustments, and outline roadmap for next quarter with the client.',
      imageUrl: 'https://picsum.photos/id/237/200/100',
      time: '11:30 AM',
    },
  ],
};
