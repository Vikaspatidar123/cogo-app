const { Pill } = require('@cogoport/components');

export const getAccordianTitle = ({ placeholder, listLength = 0 }) => (
	<div>
		<div>{`${placeholder} ${(listLength >= 1) ? listLength : ''}`}</div>
		<Pill color={listLength >= 1 ? 'green' : 'yellow'} size="sm">
			{listLength >= 1 ? 'Completed' : 'Pending'}
		</Pill>
	</div>
);
