import { Modal } from '@cogoport/components';
import { IcAContainer } from '@cogoport/icons-react';

import { useSaasState } from '../../context';
import { CONTAINER_LENGTH_TO_BARS } from '../../utils/constants';

function ContainerDetailsModal({
	isOpen,
	handleModal,
	containersDetails = {},

}) {
	const { setSelectedContainer } = useSaasState();

	return (
		<Modal
			heading={`Container details (${containersDetails?.length} in total)`}
			onClose={handleModal}
			isOpen={isOpen}
		>
			<div className="content">
				{containersDetails?.map((item, idx) => (
					<div role="presentation" onClick={() => { setSelectedContainer(idx); handleModal(); }}>
						<div className="left-container">
							<IcAContainer
								label={idx + 1}
								bars={CONTAINER_LENGTH_TO_BARS[item?.container_length]}
							/>
						</div>
						<div className="right-container">
							<h3>
								{item?.container_length ? `${item?.container_length}ft` : ''}
								{' '}
								{item?.container_description ?? ''}
							</h3>
							<p>
								Container no:
								{item?.container_no}
							</p>
						</div>
					</div>
				))}
			</div>
		</Modal>
	);
}

export default ContainerDetailsModal;
