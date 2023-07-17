import { Modal, Stepper, Button, Checkbox } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { useState } from 'react';

import { TERMS_AND_CONDITIONS } from '../../../../common/constant';
import SigningModal from '../SigningModal';

import useFetchOfferReceivablesReports from
	'@/ui/page-components/export-factoring/hooks/useFetchOfferReceivablesReports';

const stepperContent = [
	{
		title : 'Review Details',
		key   : 'review_details',
	},
	{
		title : 'Signing',
		key   : 'signing',
	},
];

function ReviewDetails({
	data,
	refetch,
	creditRequest,
	receivableModal,
	setReceivableModal,
}) {
	const [currentStep, setCurrentStep] = useState('review_details');
	const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false);

	const { loading, onSubmit } = useFetchOfferReceivablesReports({
		data,
		refetch,
		creditRequest,
		setCurrentStep,
	});

	return (
		<Modal
			show={receivableModal}
			onClose={() => (setReceivableModal((pv) => !pv))}
			size="lg"
			style={{ minHeight: '500px' }}
		>
			<Modal.Header title="Funding Request Letter" />
			<Stepper
				active={currentStep}
				setActive={setCurrentStep}
				items={stepperContent}
				style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '0px' }}
			/>

			{currentStep === 'review_details' ? (
				<>
					<Modal.Body>

						<div style={{ display: 'flex', margin: '10px 0px' }}>
							<Checkbox
								checked={isPrivacyPolicyChecked}
								onChange={() => setIsPrivacyPolicyChecked((pv) => !pv)}
							/>
							<div>{TERMS_AND_CONDITIONS}</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button
							type="button"
							size="md"
							className="secondary"
							onClick={() => setReceivableModal((pv) => !pv)}
							style={{ marginRight: '10px' }}
						>
							Cancel
						</Button>
						<Button
							type="button"
							size="md"
							themeType="accent"
							disabled={!isPrivacyPolicyChecked || loading}
							onClick={() => {
								onSubmit();
							}}
							loading={loading}
						>
							Next
							<IcMArrowNext />
						</Button>
					</Modal.Footer>

				</>
			) : (
				<SigningModal
					data={data}
					creditRequest={creditRequest}
					setCurrentStep={setCurrentStep}
					refetch={refetch}
					receivableModal={receivableModal}
					setReceivableModal={setReceivableModal}
				/>
			)}

		</Modal>
	);
}

export default ReviewDetails;
