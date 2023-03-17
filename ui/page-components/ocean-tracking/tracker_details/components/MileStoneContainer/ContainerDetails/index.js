import { useSaasState } from '../../context';
import IconLeft from '../../icons/left-arrow.svg';
import IconRight from '../../icons/right-arrow.svg';
import Modal from '../../ui/Modal';
import { CONTAINER_LENGTH_TO_BARS } from '../../utils/constants';
import ContainerIcon from '../container-icon';

import { ContainerCard } from './styles';

function ContainerDetailsModal({
	isOpen,
	handleModal,
	containersDetails = {},
	containerNo,
}) {
	const { selectedContainer, setSelectedContainer } = useSaasState();

	return (
		<Modal
			heading={`Container details (${containersDetails?.length} in total)`}
			onClose={handleModal}
			isOpen={isOpen}
		>
			<div className="content">
				{containersDetails?.map((item, idx) => (
					<ContainerCard key={idx} onClick={() => { setSelectedContainer(idx); handleModal(); }}>
						<div className="left-container">
							<ContainerIcon
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
					</ContainerCard>
				))}
			</div>
		</Modal>
	);
}

export default ContainerDetailsModal;
