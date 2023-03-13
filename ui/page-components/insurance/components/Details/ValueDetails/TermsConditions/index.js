import { Modal, Placeholder, Button } from '@cogoport/components';

import useGetTermsConditions from '../../../../hooks/useGetTermsConditions';

import styles from './styles.module.css';

function TermsConditions({
	termsconditionshow = false,
	setTermsConditionsShow = () => {},
	setAgree = () => {},
	isMobile = false,
	activeTab = '',
	type = '',
	formDetails = {},
	countryCode = '',
}) {
	const { terms = {}, fetchTermsLoading = false } = useGetTermsConditions({
		formDetails,
		activeTab,
		type,
		countryCode,
	});

	const {
		cargoWarranty = [],
		clauses = [],
		claimDocuments = [],
		termsHtml,
	} = terms || {};

	// eslint-disable-next-line react/no-unstable-nested-components
	function CreateReactComponent() {
		return <div dangerouslySetInnerHTML={{ __html: termsHtml }} />;
	}

	return (
		<Modal
			size={isMobile ? 'sm' : 'lg'}
			show={termsconditionshow}
			onClose={() => setTermsConditionsShow(false)}
			scroll
			placement="top"
			showCloseIcon
		>
			<Modal.Body>
				<div className={styles.flex_row}>
					<div className={styles.styled_col}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/terms.svg"
							width={40}
							height={40}
							alt=""
						/>
					</div>
					<div className={styles.styled_col_2}>
						<div className={styles.terms}>Terms of Service</div>
						<div className={styles.date}>Updated December 2022</div>
					</div>
				</div>
				{fetchTermsLoading
				&& [1, 2, 3, 4, 5].map(() => (
					<div className={styles.loading_wrapper}>
						<Placeholder width="20%" />
						<Placeholder width="15%" />
						{[1, 2, 3, 4].map(() => <Placeholder width="100%" />)}
					</div>
				))}
				{!fetchTermsLoading && Object.keys(terms)?.length === 0 && (
					<div className={styles.padded_div}>
						<div className={styles.coverage}>Terms of service not found!! Please try again later</div>
					</div>
				)}
				{!fetchTermsLoading && Object.keys(terms)?.length > 0 && (
					<>
						<div className={styles.padded_div}>
							<div className={styles.coverage}>
								<div className={styles.first_column}>
									<div className={styles.heading}>Coverage Clauses, Condition and Warranties </div>
								</div>
								<div className={styles.second_column}>
									<div className={styles.line_wrapper}>
										<div className={styles.dot} />
										<div className={styles.line} />
									</div>
								</div>
							</div>
							<ul>
								{(clauses || []).map((x) => <li className={styles.list}>{x}</li>)}
							</ul>
							<div className={styles.coverage}>
								<div className={styles.first_column}>
									<div className={styles.heading}>Excess</div>
								</div>
								<div className={styles.second_column}>
									<div className={styles.line_wrapper}>
										<div className={styles.dot} />
										<div className={styles.line} />
									</div>
								</div>
							</div>
							<ul>
								<li className={styles.list}>
									The first 0.50% of whole consignment value each and every loss
								</li>
							</ul>
							<div className={styles.coverage}>
								<div className={styles.first_column}>
									<div className={styles.heading}>Specific Condition</div>
								</div>
								<div className={styles.second_column}>
									<div className={styles.line_wrapper}>
										<div className={styles.dot} />
										<div className={styles.line} />
									</div>
								</div>
							</div>
							<ul>
								<li className={styles.list}>
									Coverage as per Terms of Sale max from the Load Port/Airport/Indian Border
									onwards only
								</li>
							</ul>
							<div className={styles.coverage}>
								<div className={styles.first_column}>
									<div className={styles.heading}>Standard Conditions and Warranties</div>
								</div>
								<div className={styles.second_column}>
									<div className={styles.line_wrapper}>
										<div className={styles.dot} />
										<div className={styles.line} />
									</div>
								</div>
							</div>
							<ul>
								{(cargoWarranty || []).map((x) => <li className={styles.list}>{x}</li>)}
							</ul>
							<div className={styles.coverage}>
								<div className={styles.first_column}>
									<div className={styles.heading}>Documents to claim insurance</div>
								</div>
								<div className={styles.second_column}>
									<div className={styles.line_wrapper}>
										<div className={styles.dot} />
										<div className={styles.line} />
									</div>
								</div>
							</div>
							<ul>
								{(claimDocuments || []).map((x) => <li className={styles.list}>{x}</li>)}
							</ul>
							<div className={styles.coverage}>
								<div className={styles.first_column}>
									<div className={styles.heading}>Additional Terms</div>
								</div>
								<div className={styles.second_column}>
									<div className={styles.line_wrapper}>
										<div className={styles.dot} />
										<div className={styles.line} />
									</div>
								</div>
							</div>
							<div className={styles.terms_wrapper}>{CreateReactComponent()}</div>
						</div>
						<div className={styles.wrapper_2}>
							<Button
								onClick={() => {
									setTermsConditionsShow(false);
									setAgree(true);
								}}
							>
								I Agree
							</Button>
						</div>
					</>
				)}
			</Modal.Body>
		</Modal>
	);
}
export default TermsConditions;
