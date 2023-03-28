import { startCase } from '@cogoport/front/utils';

import { Text, TextWrapper, Wrapper } from './styles';

const SCHEDULE_TYPE_MAPPING = {
	transshipment : 'Trans-shipment',
	direct        : 'Direct',
};

export function FclTags({ data }) {
	return (
		<TextWrapper>
			{data?.payment_term ? (
				<div>
					<Wrapper className="payment_term">
						<Text>
							{' '}
							{startCase(data.payment_term)}
						</Text>
					</Wrapper>
				</div>
			) : null}

			{data?.schedule_type ? (
				<div>
					<Wrapper>
						<Text className="schedule_type">
							{' '}
							{SCHEDULE_TYPE_MAPPING[data.schedule_type]
									|| startCase(data.schedule_type)}
						</Text>
					</Wrapper>
				</div>
			) : null}
		</TextWrapper>
	);
}
