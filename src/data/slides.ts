import { Slide } from '../models/slide.model';

const slides: Slide[] = [
  {
    id: Math.random().toString(),
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.Natus ullam voluptate officia repellendus libero.',
    pathImage: '/assets/images/slide-1.png',
  },
  {
    id: Math.random().toString(),
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.Natus ullam voluptate officia repellendus libero.',
    pathImage: '/assets/images/slide-2.png',
  },
  {
    id: Math.random().toString(),
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.Natus ullam voluptate officia repellendus libero.',
    pathImage: '/assets/images/slide-3.png',
  },
];

export const getSlides = () => slides;
