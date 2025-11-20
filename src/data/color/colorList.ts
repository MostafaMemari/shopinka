import { ColorOptions } from '@/types/color/colorType';

export const colorsList: ColorOptions[] = [
  {
    name: 'سفید',
    value: 'white',
    backgroundMode: {
      from: 'rgba(0,0,0,0.25)',
      to: 'rgba(0,0,0,0.1)',
    },
  },
  {
    name: 'مشکی',
    value: 'black',
    backgroundMode: {
      from: 'white',
      to: 'lightgray',
    },
  },
  {
    name: 'طلایی',
    value: 'gold',
    backgroundMode: {
      from: 'rgba(0,0,0,0.25)',
      to: 'rgba(0,0,0,0.1)',
    },
  },
  {
    name: 'قرمز',
    value: 'red',
    backgroundMode: {
      from: 'white',
      to: 'lightgray',
    },
  },
  {
    name: 'زرد',
    value: 'yellow',
    backgroundMode: {
      from: 'rgba(0,0,0,0.25)',
      to: 'rgba(0,0,0,0.1)',
    },
  },
];
