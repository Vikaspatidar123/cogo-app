import { get, isEmpty, startCase } from '@cogoport/front/utils';

import CARGO_HANDLING_VALUE_LABEL_MAPPING from '../../configurations/cargo-handling-value-label-mapping.json';

import {
	Container,
	PillTextContainer,
	PillTextLabel,
	PillTextValue,
} from './styles';

const pills = {
	cargo_handling: (value) => {
		const { cargo_handling } = value || {};

		return {
			label : '',
			value : CARGO_HANDLING_VALUE_LABEL_MAPPING[cargo_handling] || '',
		};
	},
	truck_type: (value) => ({
		label : 'Truck Type',
		value : startCase(get(value, 'truck_type')) || '',
	}),
	trucks_count: (value) => ({
		label : 'Truck Count',
		value : get(value, 'trucks_count') || '',
	}),
};

function CargoHandlingPopoverSavedContent({ data, onClickShowPopover }) {
	if (isEmpty(data)) {
		return null;
	}

	return (
		<Container onClick={() => onClickShowPopover()}>
			{Object.entries(pills).map(([key, fun]) => {
				const { label, value } = fun(data);

				if (!value) {
					return null;
				}

				return (
					<PillTextContainer key={key}>
						{label && (
							<PillTextLabel>
								{label}
								:
							</PillTextLabel>
						)}
						<PillTextValue>{value}</PillTextValue>
					</PillTextContainer>
				);
			})}
		</Container>
	);
}

export default CargoHandlingPopoverSavedContent;
