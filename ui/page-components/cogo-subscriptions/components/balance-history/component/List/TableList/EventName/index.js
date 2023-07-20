import {
	IcCRedCircle,
	IcCGreenCircle,
} from '@cogoport/icons-react';

import tableStyles from '../../TableHeader/styles.module.css';

function EventName({ type, name }) {
	if (type) {
		return (
			<>
				<IcCGreenCircle width={6} height={6} />
				{name}
			</>
		);
	}
	if (type === null) {
		return (
			<>
				<div className={tableStyles.grey_dot} />
				{name}
			</>
		);
	}
	return (
		<>
			<IcCRedCircle width={6} height={6} />
			{name}
		</>
	);
}
export default EventName;
