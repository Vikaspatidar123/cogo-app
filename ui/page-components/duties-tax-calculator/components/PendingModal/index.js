import { Button, Modal } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';

// import IconTridot from '../../../../common/icons/loading.svg';
// import LoadingBanner from '../../../../common/icons/pending-modal.svg';

import { Container, Title, Txt } from './styles';

import { useRouter } from '@/packages/store';

function PendingModal({ showPendingModal, setShowPendingModal, stop }) {
	const { query } = useRouter();
	const { org_id = '', branch_id = '', account_type = '' } = query || {};

	const closeModalHandler = () => {
		const redirectUrl = `${process.env.APP_URL}app/${org_id}/${branch_id}/${account_type}/saas/premium-services/duties-taxes-calculator`;
		window.open(redirectUrl, '_self');
		setShowPendingModal(false);
	};
	return (
		<Modal className="primary md" show={showPendingModal} closable={false}>
			{!stop && (
				<Container>
					<LoadingBanner style={{ width: 300, height: 'auto' }} />
					<Title>Hang on! Checking payment status...</Title>
					<IconTridot style={{ width: 40, height: 'auto', marginBottom: 32 }} />
				</Container>
			)}

			{stop && (
				<Container>
					<IcMInformation fill="#FBDC00" width={52} height={52} />
					<Txt className="error">
						Sorry, It took longer than usual. We will notify you once payment is
						successful
					</Txt>
					<Button className="secondary sm text" onClick={closeModalHandler}>
						Close
					</Button>
				</Container>
			)}
		</Modal>
	);
}
export default PendingModal;
