import { Flex } from '@cogoport/front/components';
import { Title, Line, Count } from './styles';

function SingleStrip({
	item = {},
	currentStep = '',
	progressSteps = [],
	count = 1,
}) {
	const status = currentStep === item?.key ? 'active' : 'inactive';

	return (
		<Flex alignItems="center" style={{ width: '100%' }}>
			<Count className={status}>{count}</Count>

			{/* {status === 'success' && (
				<Count style={{ padding: '5px 5px', border: '1px solid  #2C3E50' }}>
					<Tick size={1.4} />
				</Count>
			)} */}

			<Title
				style={{
					color: status === 'active' ? '#333333' : '#828282',
					cursor: count < 1 ? 'pointer' : 'default',
					fontWeight: status === 'active' ? 500 : 'normal',
				}}
			>
				{item?.label}
			</Title>
			{count < progressSteps.length ? <Line /> : null}
		</Flex>
	);
}
export default SingleStrip;
