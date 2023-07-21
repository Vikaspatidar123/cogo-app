import { Modal } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';
import { useState } from 'react';

import BuyModal from '../BuyModal';

import Footer from './Footer';
import getComponents from './getComponents';
import styles from './styles.module.css';

function PreviewModal({
	formDetails = {},
	showPreviewModal = false,
	setShowPreviewModal = () => { },
	countryDetails = {},
	commodityName = '',
	watcher = [],
	insuranceLoading,
	paymentLoading,
	resp = () => { },
	finalData,
	ratesResponse = {},
}) {
	const {
		institutionName = '',
		partyName = '',
		billingAddress = '',
		gstin = '',
		billingCity = '',
		billingState = '',
		billingPincode = '',
		incoterm = '',
		cargoDescription = '',
		packaging = '',
		transitDate = '',
		locationFrom = '',
		locationTo = '',
		riskCoverage = '',
		destinationCountry = '',
		coverageFrom = '',
		coverageTo = '',
		coverage = '',
		invoiceNo = '',
		invoiceDate = '',
		transitStartDate = '',
		cargoAmount = 0,
		transitMode = '',
		subCommodity = '',
		cogoPolicyNo = '',
		email = '',
		phoneNo = '',
		insuredFirstName = '',
		insuredLastName = '',
		originCountry = '',
		netPremium = 0,
		policyType = '',
		aadharNumber = '',
		panNumber = '',
	} = formDetails || {};

	const { totalApplicableCharges = 0 } = ratesResponse || formDetails || {};

	const { DetailsContainer, HeaderTitle, SectionTitle, AvatarComponent } = getComponents();

	const [noteModal, setNoteModal] = useState(false);

	const fullName = `${insuredFirstName} ${insuredLastName}`;
	const name = institutionName !== '' ? institutionName : fullName;

	const handleSubmit = () => {
		resp(finalData);
	};

	return (
		<Modal
			show={showPreviewModal}
			onClose={() => setShowPreviewModal(false)}
			size="lg"
			scroll
		>
			<Modal.Header title={<HeaderTitle transitMode={transitMode} />} />
			<Modal.Body>
				<AvatarComponent name={name} />
				<div className={styles.address_div}>
					{cogoPolicyNo && (
						<div>
							<div className={styles.label}>Policy No.</div>
							<div className={styles.email_value}>{cogoPolicyNo}</div>
						</div>
					)}
					<div className={styles.label}>Contact Address</div>
					<div className={styles.email_value}>
						{email}
						,
						{' '}
						{phoneNo}
					</div>
				</div>

				<div>
					<SectionTitle title="Billing details" />
					<div className={styles.details_content_div}>
						<div className={styles.row}>
							<DetailsContainer label="Name" value={partyName} />
							<DetailsContainer tooltip label="Address" className="address" value={billingAddress} />
							<div className={styles.panOrAadhar}>
								{panNumber ? (
									<>
										<div className={styles.label}>PAN Number</div>
										<div className={styles.value}>{panNumber}</div>
									</>
								) : null}
								{aadharNumber ? (
									<>
										<div className={styles.label}>Aadhar Number</div>
										<div className={styles.value}>{aadharNumber}</div>
									</>
								) : null}
							</div>
						</div>
						<div className={styles.row}>
							<DetailsContainer label="GST No" value={gstin} />
							<DetailsContainer label="City" value={billingCity} />
							<DetailsContainer label="State" value={billingState} />
							<DetailsContainer label="Pincode" value={billingPincode} />
						</div>
					</div>
				</div>
				<div>
					<SectionTitle title="Cargo details" />
					<div className={styles.details_content_div}>
						<div className={styles.row}>
							<DetailsContainer
								label="Commodity"
								value={commodityName || subCommodity}
								className="commodity"
								tooltip
							/>
							<DetailsContainer
								label="Destination Country"
								value={policyType === 'IMPORT'
									? 'INDIA'
									: countryDetails?.sanctionedCountry || destinationCountry || ''}
								className="commodity"
							/>
							<DetailsContainer
								label="Origin Country"
								value={policyType === 'IMPORT' ? originCountry || '' : 'INDIA'}
								className="commodity"
							/>
						</div>
						<div className={styles.row}>
							<DetailsContainer
								label="Incoterm"
								value={incoterm}
								className="commodity"
							/>
							<DetailsContainer
								label="Cargo Description"
								value={cargoDescription}
								tooltip
								className="commodity"
								valueClassName="value_2"
							/>
							<DetailsContainer
								label="Packaging"
								className="commodity"
								value={startCase(packaging)}
							/>
						</div>
						<div className={styles.row}>
							<DetailsContainer
								label="Coverage from"
								value={locationFrom || coverageFrom}
								tooltip
								className="commodity"
							/>
							<DetailsContainer
								label="Coverage to"
								value={locationTo || coverageTo}
								tooltip
								className="commodity"
							/>
							<DetailsContainer
								label="Coverage"
								value={(riskCoverage || coverage).replace('_', ' ')}
								className="commodity"
							/>
						</div>
						<div className={styles.row}>
							<DetailsContainer
								label="Transit start date"
								value={format(transitDate || transitStartDate, 'dd MMM yy')}
								className="commodity"
							/>
						</div>
					</div>
				</div>
				<div>
					<SectionTitle title="Charge details" />
					<div className={styles.details_content_div}>
						<div className={styles.row}>
							<DetailsContainer
								label="Consignment Value"
								value={cargoAmount
									? `${watcher[0] || 'INR'} ${cargoAmount || 0}`
									: `${watcher[0] || 'INR'} ${watcher[1] || 0}`}
								className="commodity"
							/>
							<DetailsContainer
								label="Invoice No."
								value={watcher[2] || invoiceNo}
								className="commodity"
							/>
							<DetailsContainer
								label="Invoice Date"
								value={format(watcher[3] || invoiceDate, 'dd MMM yy')}
								className="commodity"
							/>
						</div>
					</div>
				</div>

				{noteModal && (
					<BuyModal
						noteModal={noteModal}
						setNoteModal={setNoteModal}
						handleSubmit={handleSubmit}
						paymentLoading={paymentLoading}
						insuranceLoading={insuranceLoading}
					/>
				)}
			</Modal.Body>
			<Modal.Footer align="center">
				<Footer
					cogoPolicyNo={cogoPolicyNo}
					totalApplicableCharges={totalApplicableCharges}
					netPremium={netPremium}
					insuranceLoading={insuranceLoading}
					setNoteModal={setNoteModal}
				/>
			</Modal.Footer>
		</Modal>
	);
}

export default PreviewModal;
