import { format } from '@cogoport/utils';

const formatDate = (date) => format(new Date(date), 'dd LLL yyyy');

const formatTime = (date) => format(new Date(date), 'KK:mm aaa');

export { formatDate, formatTime };
