import { v4 as uuid } from 'uuid';

import gridTemplate1 from './grid-1.svg';
import gridTemplate2 from './grid-2.svg';
import gridTemplate3 from './grid-3.svg';
import gridTemplate4 from './grid-4.svg';

const templates = (type) => () => [
  {
    image: gridTemplate1,
    id: 'gridtemplateone',
    title: '1 column',
    columns: [
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
    ],
  },
  {
    image: gridTemplate2,
    id: 'gridtemplatetwo',
    title: '2 columns',
    columns: [
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
    ],
  },
  {
    image: gridTemplate3,
    id: 'gridtemplatethree',
    title: '3 columns',
    columns: [
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
    ],
  },
  {
    image: gridTemplate4,
    id: 'gridtemplatefour',
    title: '4 columns',
    columns: [
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
    ],
  },
];

export default templates;
