import { Tooltip, Chips } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import FAQComponent from '../../common/FAQComponent';
import redirectUrl from '../../common/redirectUrl';
import getChipOptions from '../../configurations/segmentOptions';
import useGetDraftDetails from '../../hooks/useGetDraftDetails';
import InsuredDetails from '../InsuredDetails';

import styles from './styles.module.css';

import { Image, useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function InsuranceFrom() {
	const { query } = useRouter();

	const { type = '', policyType = '', policyId = '', sid = 'false' } = query || {};

	const [activeStepper, setActiveStepper] = useState({
		1   : 'pro',
		2   : false,
		3   : false,
		svg : 0,
	});

	const [showFaq, setFaq] = useState('none');

	const [activeTab, setActiveTab] = useState(policyType || 'IMPORT');

	const { redirectHome } = redirectUrl();

	const options = getChipOptions({ sid, activeStepper });

	const { draftDetailsPrefilling = {} } = useGetDraftDetails({
		policyId,
		type,
	});

	return (
		<div>
			<div className={styles.heading_wrapper}>
				<div className={styles.heading}>
					<Tooltip content="Back" animation="shift-toward">
						<div className={styles.center}>
							<IcMArrowBack onClick={() => redirectHome()} className={styles.arrow_back} />
						</div>
					</Tooltip>
					<div className={styles.text_type}>
						{type}
						{' '}
						Insurance
					</div>
				</div>
				<div className={styles.segmented_container}>
					<Chips
						items={options}
						selectedItems={activeTab}
						onItemChange={setActiveTab}
						className={styles.chips}
						size="lg"
					/>
					<Image
						src={GLOBAL_CONSTANTS.image_url.faq_image}
						onClick={() => {
							setFaq('block');
						}}
						alt="faq_button"
						className={showFaq === 'block' ? styles.faq_hidden : styles.faq}
						width={60}
						height={45}
					/>
					<FAQComponent
						showFaq={showFaq}
						setFaq={setFaq}
					/>
				</div>

				{policyId && !isEmpty(draftDetailsPrefilling) && (
					<InsuredDetails
						type={type}
						activeTab={activeTab}
						setActiveStepper={setActiveStepper}
						activeStepper={activeStepper}
						draftDetailsPrefilling={draftDetailsPrefilling}
						policyId={policyId}
					/>
				)}
				{!policyId && (
					<InsuredDetails
						type={type}
						activeTab={activeTab}
						setActiveStepper={setActiveStepper}
						activeStepper={activeStepper}
					/>
				)}
			</div>
		</div>
	);
}
export default InsuranceFrom;
