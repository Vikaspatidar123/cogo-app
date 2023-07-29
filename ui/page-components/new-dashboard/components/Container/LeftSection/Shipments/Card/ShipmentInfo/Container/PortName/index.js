import { Tooltip } from '@cogoport/components';

const START_INDEX = 0;
const END_INDEX = 25;
function PortName({ data }) {
	return (
		<div>
			<Tooltip
				content={<div style={{ color: 'grey' }}>{data}</div>}
			>
				<div>
					{data?.substring(START_INDEX, END_INDEX)
				|| ''}

				</div>
			</Tooltip>
		</div>
	);
}
export default PortName;
