import { Flex } from '@cogoport/front/components';

import ContainerDetailsListItem from './ContainerDetailsListItem';

function ContainerDetailsList({
	list,
	editFormId,
	onClickListEditButton,
	onClickListDeleteButton,
	renderCargoContainerDetailsForm,
}) {
	return (
		<Flex direction="column" paddingBottom={16}>
			{list.map((item, index) => {
				const { id } = item;

				if (editFormId === id) {
					return renderCargoContainerDetailsForm || null;
				}

				return (
					<Flex
						key={id}
						direction="column"
						marginBottom={index === list.length - 1 ? 0 : 8}
					>
						<ContainerDetailsListItem
							key={id}
							item={item}
							onEdit={() => onClickListEditButton({ id })}
							onDelete={() => onClickListDeleteButton({ id })}
						/>
					</Flex>
				);
			})}
		</Flex>
	);
}

export default ContainerDetailsList;
