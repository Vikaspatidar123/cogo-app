import { Pill } from "@cogoport/components";

const COUNT = 1;
export const AccordianTitle = ({ placeholder, listLength = 0 }) => (
	<div>
		<div>{`${placeholder} ${(listLength >= COUNT) ? listLength : ''}`}</div>
		<Pill color={listLength >= COUNT ? 'green' : 'yellow'} size="sm">
			{listLength >= COUNT ? 'Completed' : 'Pending'}
		</Pill>
	</div>
);
