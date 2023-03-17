import { format } from '@cogoport/utils';
import React from 'react';

function Date({ itemData, field }) {
	return <div>{format(itemData[field.key], field.format || 'dd MMM yyyy')}</div>;
}
export default Date;
