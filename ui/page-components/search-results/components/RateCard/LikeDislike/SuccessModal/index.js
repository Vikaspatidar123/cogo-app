import { Modal } from '@cogoport/front/components';
import { IcCFtick } from '@cogoport/icons-react';

import { Container, Title, Description, Submit } from './styles';

function SuccessModal({ show, setShow, title, description, cta = 'Okay' }) {
	const handleClose = () => {
		setShow(false);
	};

	return (
		<Modal show={show} onClose={handleClose} closable={false}>
			<Container>
				<IcCFtick width="60px" height="60px" />
				<Title>{title}</Title>
				<Description>{description}</Description>
				<Submit onClick={handleClose}>{cta}</Submit>
			</Container>
		</Modal>
	);
}

export default SuccessModal;
