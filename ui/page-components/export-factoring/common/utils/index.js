const { Pill } = require('@cogoport/components');

const Count = 1;
export const getAccordianTitle = ({ placeholder, listLength = 0 }) => (
	<div>
		<div>{`${placeholder} ${(listLength >= Count) ? listLength : ''}`}</div>
		<Pill color={listLength >= Count ? 'green' : 'yellow'} size="sm">
			{listLength >= Count ? 'Completed' : 'Pending'}
		</Pill>
	</div>
);
