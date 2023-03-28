import { isEmpty, startCase } from '@cogoport/front/utils';

import { Container, ItemContainer, Label, Value, NoContainers } from './styles';

function SavedContainerContents({ content }) {
	if (isEmpty(content)) {
		return <NoContainers>Select container details ...</NoContainers>;
	}

	const { cargoDetails, cargoContainersDetails } = content || {};

	const {
		cargo_value,
		container_load_type: containerLoadType,
		container_load_sub_type: containerLoadSubType,
	} = cargoDetails;

	const { currency, value } = cargo_value || {};

	const contentArr = [
		{
			label : 'Container Type',
			value : `${startCase(containerLoadType)} - ${startCase(
				containerLoadSubType,
			)}`,
		},
		{ label: 'Cargo Value', value: `${currency} ${value}` },
		{
			label : 'Total Containers',
			value : (cargoContainersDetails || []).reduce((total, item) => {
				const { container_count } = item;

				return total + Number(container_count);
			}, 0),
		},
	];

	return (
		<Container>
			{contentArr.map((item) => {
				const { label = '', value: contentValue = '' } = item;

				return (
					<ItemContainer key={label.replaceAll(' ', '_')}>
						{label && (
							<Label>
								{label}
								:
							</Label>
						)}
						{contentValue ? <Value>{contentValue}</Value> : null}
					</ItemContainer>
				);
			})}
		</Container>
	);
}

export default SavedContainerContents;
