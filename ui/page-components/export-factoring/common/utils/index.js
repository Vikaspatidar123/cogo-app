import { Pill } from '@cogoport/components';

const COUNT = 1;
export function AccordianTitle({ placeholder, listLength = 0 }) {
	return (
		<div>
			<div>{`${placeholder} ${(listLength >= COUNT) ? listLength : ''}`}</div>
			<Pill color={listLength >= COUNT ? 'green' : 'yellow'} size="sm">
				{listLength >= COUNT ? 'Completed' : 'Pending'}
			</Pill>
		</div>
	);
}
