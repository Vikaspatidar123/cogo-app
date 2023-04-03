import { Flex } from '@cogoport/front/components';
import { Modal } from '@cogoport/front/components/admin';
import { isEmpty } from '@cogoport/front/utils';
import { forwardRef } from 'react';

import CargoAndLoadDetails from './CargoAndLoadDetails';
import SavedContainerContents from './SavedContainerContents';
import { Container, Title, ContentContainer, ErrorMessage } from './styles';
import useCargoAndLoadDetailsContent from './useCargoAndLoadDetailsContent';

function CargoAndLoadDetailsContent(props, ref) {
	const { isFormSubmitted } = props;

	const { showModal, setShowModal, draftData, savedData, onSave, onClose } =		useCargoAndLoadDetailsContent(props, ref);

	return (
		<Container>
			<Flex direction="column">
				<Title>Cargo And Load Details</Title>
				<ContentContainer onClick={() => setShowModal(true)}>
					<SavedContainerContents content={savedData} />
				</ContentContainer>
				{isFormSubmitted && isEmpty(savedData) && (
					<ErrorMessage>Cargo And Load Details is Required</ErrorMessage>
				)}
			</Flex>

			<Modal
				show={showModal}
				closable={false}
				className="primary xl"
				// fullscreen
				bodyScroll
				onOuterClick={() => {}}
				// styles={{ dialog: { overflow: 'visible' } }}
				styles={{
					dialog: {
						margin  : 'auto',
						padding : 0,
					},
				}}
			>
				<CargoAndLoadDetails
					formValues={draftData || savedData || {}}
					onSave={onSave}
					onClose={onClose}
				/>
			</Modal>
		</Container>
	);
}

export default forwardRef(CargoAndLoadDetailsContent);
