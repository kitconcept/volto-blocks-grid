import { v4 as uuid } from 'uuid';
import { defineMessages } from 'react-intl';

import gridTemplate1 from './grid-1.svg';
import gridTemplate2 from './grid-2.svg';
import gridTemplate3 from './grid-3.svg';
import gridTemplate4 from './grid-4.svg';
import gridTemplate5 from './grid-5.svg';
import gridTemplate6 from './grid-6.svg';
import gridTemplateMore from './grid-more.svg';

const messages = defineMessages({
  column: {
    id: 'column',
    defaultMessage: 'column',
  },
  columns: {
    id: 'columns',
    defaultMessage: 'columns',
  },
});

const getColumns = (numberOfColumns, type) => {
  return [...Array(numberOfColumns).keys()].map((i) => {
    return {
      id: uuid(),
      ...(type && { '@type': type }),
    };
  });
};

const templates = (type) => (intl) => [
  {
    image: gridTemplate1,
    id: 'gridtemplateone',
    title: `1 ${intl.formatMessage(messages.column)}`,
    columns: getColumns(1, type),
  },
  {
    image: gridTemplate2,
    id: 'gridtemplatetwo',
    title: `2 ${intl.formatMessage(messages.columns)}`,
    columns: getColumns(2, type),
  },
  {
    image: gridTemplate3,
    id: 'gridtemplatethree',
    title: `3 ${intl.formatMessage(messages.columns)}`,
    columns: getColumns(3, type),
  },
  {
    image: gridTemplate4,
    id: 'gridtemplatefour',
    title: `4 ${intl.formatMessage(messages.columns)}`,
    columns: getColumns(4, type),
  },
  {
    image: gridTemplate5,
    id: 'gridtemplatefive',
    title: `5 ${intl.formatMessage(messages.columns)}`,
    columns: getColumns(5, type),
  },
  {
    image: gridTemplate6,
    id: 'gridtemplatesix',
    title: `6 ${intl.formatMessage(messages.columns)}`,
    columns: getColumns(6, type),
  },
  {
    image: gridTemplateMore,
    id: 'gridtemplateseven',
    title: `7 ${intl.formatMessage(messages.columns)}`,
    columns: getColumns(7, type),
  },
  {
    image: gridTemplateMore,
    id: 'gridtemplateseight',
    title: `8 ${intl.formatMessage(messages.columns)}`,
    columns: getColumns(8, type),
  },
  {
    image: gridTemplateMore,
    id: 'gridtemplatesnine',
    title: `9 ${intl.formatMessage(messages.columns)}`,
    columns: getColumns(9, type),
  },
  {
    image: gridTemplateMore,
    id: 'gridtemplatesten',
    title: `10 ${intl.formatMessage(messages.columns)}`,
    columns: getColumns(10, type),
  },
  {
    image: gridTemplateMore,
    id: 'gridtemplatesteleven',
    title: `11 ${intl.formatMessage(messages.columns)}`,
    columns: getColumns(11, type),
  },
  {
    image: gridTemplateMore,
    id: 'gridtemplatestwelve',
    title: `12 ${intl.formatMessage(messages.columns)}`,
    columns: getColumns(12, type),
  },
  {
    image: gridTemplateMore,
    id: 'gridtemplathirteen',
    title: `13 ${intl.formatMessage(messages.columns)}`,
    columns: getColumns(13, type),
  },
  {
    image: gridTemplateMore,
    id: 'gridtemplatesfourteen',
    title: `14 ${intl.formatMessage(messages.columns)}`,
    columns: getColumns(14, type),
  },
  {
    image: gridTemplateMore,
    id: 'gridtemplatesfifteen',
    title: `15 ${intl.formatMessage(messages.columns)}`,
    columns: getColumns(15, type),
  },
  {
    image: gridTemplateMore,
    id: 'gridtemplatessixteen',
    title: `16 ${intl.formatMessage(messages.columns)}`,
    columns: getColumns(16, type),
  },
];

export default templates;
