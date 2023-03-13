import { Tooltip, Chips } from '@cogoport/components';
// import SegmentedControl from '@cogoport/front/components/SegmentedControl';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import FAQDiv from '../../common/FAQDiv/index';
import redirectUrl from '../../common/redirectUrl';
import { options } from '../../configurations/segmentOptions';
import useGetDraftDetails from '../../hooks/useGetDraftDetails';
import useGetFaq from '../../hooks/useGetFaq';
import InsuredDetails from '../InsuredDetails';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function InsuranceFrom() {
	const { isMobile } = useSelector((state) => state);
	const { query } = useRouter();
	const { type, policyId = '', policyType = '' } = query || {};
	const [activeTab, setActiveTab] = useState(policyType || 'IMPORT');
	const [showFaq, setFaq] = useState('none');
	const { redirectHome } = redirectUrl();
	const { draftDetailsPrefilling } = useGetDraftDetails({
		policyId,
		type,
	});
	const { faqDetails = [], response } = useGetFaq();
	const [activeStepper, setActiveStepper] = useState({
		1   : 'pro',
		2   : false,
		3   : false,
		svg : 0,
	});
	return (
		<div>
			<FAQDiv
				faqDetails={faqDetails}
				showFaq={showFaq}
				setFaq={setFaq}
				isMobile={isMobile}
			/>
			<div>
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
				<div className={isMobile ? styles.segmented_container_mobile : styles.segmented_container}>
					<Chips
						items={options}
						selectedItems={activeTab}
						onItemChange={setActiveTab}
						className={styles.chips}
					/>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/faq.svg"
						onClick={() => {
							setFaq('block');
							response();
						}}
						role="presentation"
						alt=""
						className={showFaq === 'block' ? styles.faq_hidden : styles.faq}
					/>
				</div>
				{policyId && Object.keys(draftDetailsPrefilling).length > 0 && (
					<InsuredDetails
						type={type}
						isMobile={isMobile}
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
						isMobile={isMobile}
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
