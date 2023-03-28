import { Button } from '@cogoport/front/components/admin';

import CONSTANTS from './utils/constants';

const { MAXIMUM_FULL_RAKE_CONTAINER_COUNT } = CONSTANTS;

function AddMoreContainerButton({
	showForm,
	editFormId,
	containerLoadSubType,
	totalContainerCounts,
	setShowForm,
}) {
	if (showForm || editFormId) {
		return null;
	}

	if (
		containerLoadSubType === 'full_rake'
		&& totalContainerCounts
			>= MAXIMUM_FULL_RAKE_CONTAINER_COUNT[
				MAXIMUM_FULL_RAKE_CONTAINER_COUNT.length - 1
			]
	) {
		return null;
	}

	return (
		<Button
			type="button"
			className="secondary md"
			onClick={() => setShowForm(true)}
		>
			Add More Container
		</Button>
	);
}

export default AddMoreContainerButton;
