import { Tooltip, Modal, Avatar, Button } from '@cogoport/components';
import { IcMFsea } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';
import { useState } from 'react';

import BuyModal from '../BuyModal';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function PreviewModal({
	formDetails = {},
	showPreviewModal = false,
	setShowPreviewModal = () => {},
	countryDetails = {},
	commodityName = '',
	watcher = [],
	insuranceLoading,
	paymentLoading,
	resp,
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

	const fullName = `${insuredFirstName} ${insuredLastName}`;
	const name = institutionName !== '' ? institutionName : fullName;
	const [noteModal, setNoteModal] = useState(false);
	const handleSubmit = () => {
		resp(finalData);
	};
	const { totalApplicableCharges = 0 } = ratesResponse || formDetails || {};
	const renderBtn = () => 'Continue';
	return (
		<Modal
			show={showPreviewModal}
			onClose={() => setShowPreviewModal(false)}
			size="lg"
			scroll
		>
			<Modal.Body>
				<div className={styles.heading}>
					<IcMFsea width={20} height={20} />
					<div className={styles.heading_text}>
						{transitMode}
						{' '}
						INSURANCE
					</div>
				</div>
				<div className={styles.name_div}>
					<div className={styles.left_line} />
					<div className={styles.content}>
						<Avatar personName={name} size="35px" />
						<div className={styles.avatar_name}>{name}</div>
					</div>
					<div className={styles.right_line} />
				</div>
				<div className={styles.address_div}>
					{cogoPolicyNo && (
						<div>
							<div className={styles.label}>	Policy No.</div>
							{' '}
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
					<div className={styles.details_header}>
						<div className={styles.left_line_div} />
						<div className={styles.dot_div} />
						<div className={styles.text_div}>Billing details</div>
						<div className={styles.dot_div} />
						<div className={styles.right_line_div} />
					</div>
					<div className={styles.details_content_div}>
						<div className={styles.row}>
							<div className={styles.name}>
								<div className={styles.label}>Name</div>
								<div className={styles.value}>{partyName}</div>
							</div>
							<div className={styles.address}>
								<div className={styles.label}>Address</div>
								{billingAddress?.length > 50 ?	(
									<Tooltip content={billingAddress} placement="top">
										<div className={styles.value}>{billingAddress}</div>
									</Tooltip>
								) : <div className={styles.value}>{billingAddress}</div>}
							</div>
							<div className={styles.panOrAadhar}>
								{panNumber && (
									<>
										<div className={styles.label}>PAN Number</div>
										<div className={styles.value}>{panNumber}</div>
									</>
								)}
								{aadharNumber && (
									<>
										<div className={styles.label}>Aadhar Number</div>
										<div className={styles.value}>{aadharNumber}</div>
									</>
								)}
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.name}>
								<div className={styles.label}>GST No</div>
								<div className={styles.value}>{gstin}</div>
							</div>
							<div className={styles.name}>
								<div className={styles.label}>City</div>
								<div className={styles.value}>{billingCity}</div>
							</div>
							<div className={styles.name}>
								<div className={styles.label}>State</div>
								<div className={styles.value}>{billingState}</div>
							</div>
							<div className={styles.name}>
								<div className={styles.label}>Pincode</div>
								<div className={styles.value}>{billingPincode}</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className={styles.details_header}>
						<div className={styles.left_line_div} />
						<div className={styles.dot_div} />
						<div className={styles.text_div}>Cargo details</div>
						<div className={styles.dot_div} />
						<div className={styles.right_line_div} />
					</div>
					<div className={styles.details_content_div}>
						<div className={styles.row}>
							<div className={styles.commodity}>
								<div className={styles.label}>Commodity</div>
								<Tooltip content={commodityName || subCommodity}>
									<div className={styles.value}>{commodityName || subCommodity}</div>
								</Tooltip>
							</div>
							<div className={styles.commodity}>
								<div className={styles.label}>Destination Country</div>
								<div className={styles.value}>
									{policyType === 'IMPORT'
										? 'INDIA'
										: countryDetails?.sanctionedCountry || destinationCountry || ''}
								</div>
							</div>
							<div className={styles.commodity}>
								<div className={styles.label}>Origin Country</div>
								<div className={styles.value}>
									{policyType === 'IMPORT' ? originCountry || '' : 'INDIA'}
								</div>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.commodity}>
								<div className={styles.label}>Incoterm</div>
								<div className={styles.value}>{incoterm}</div>
							</div>
							<div className={styles.commodity}>
								<div className={styles.label}>Cargo Description</div>
								<Tooltip content={cargoDescription} placement="top">
									<div className={styles.value_2}>{cargoDescription}</div>
								</Tooltip>
							</div>
							<div className={styles.commodity}>
								<div className={styles.label}>Packaging</div>
								<div className={styles.value_2}>{startCase(packaging)}</div>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.commodity}>
								<div className={styles.label}>Coverage from</div>
								{(locationFrom || coverageFrom)?.length > 30 ? (
									<Tooltip content={locationFrom || coverageFrom} placement="top">
										<div className={styles.value}>{locationFrom || coverageFrom}</div>
									</Tooltip>
								)
									: <div className={styles.value}>{locationFrom || coverageFrom}</div>}
							</div>
							<div className={styles.commodity}>
								<div className={styles.label}>Coverage to</div>
								{(locationTo || coverageTo)?.length > 30 ? 	(
									<Tooltip content={locationTo || coverageTo} placement="top">
										<div className={styles.value}>{locationTo || coverageTo}</div>
									</Tooltip>
								) :	<div className={styles.value}>{locationTo || coverageTo}</div>}
							</div>
							<div className={styles.commodity}>
								<div className={styles.label}>Coverage</div>
								<div className={styles.value}>{(riskCoverage || coverage).replace('_', ' ')}</div>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.commodity}>
								<div className={styles.label}>Transit start date</div>
								<div className={styles.value}>
									{format(transitDate || transitStartDate, 'dd MMM yy')}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div>
					<div className={styles.details_header}>
						<div className={styles.left_line_div} />
						<div className={styles.dot_div} />
						<div className={styles.text_div}>Charge details</div>
						<div className={styles.dot_div} />
						<div className={styles.right_line_div} />
					</div>
					<div className={styles.details_content_div}>
						<div className={styles.row}>
							<div className={styles.commodity}>
								<div className={styles.label}>Consignment Value</div>
								<div className={styles.value}>
									{cargoAmount
										? `${watcher[0] || 'INR'} ${cargoAmount || 0}`
										: `${watcher[0] || 'INR'} ${watcher[1] || 0}`}
								</div>
							</div>
							<div className={styles.commodity}>
								<div className={styles.label}>Invoice No.</div>
								<div className={styles.value}>{watcher[2] || invoiceNo}</div>
							</div>
							<div className={styles.commodity}>
								<div className={styles.label}>Invoice Date</div>
								<div className={styles.value}>
									{format(watcher[3] || invoiceDate, 'dd MMM yy')}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={cogoPolicyNo ? styles.footer_center : styles.footer}>
					{cogoPolicyNo && (
						<div className={styles.textforpreview}>
							Premium:
							{' '}
							{formatAmount({
								amount   : netPremium,
								currency : 'INR',
								options  : {
									notation : 'standard',
									style    : 'currency',
								},
							})}
							<div className={styles.inclusive}>(inclusive of taxes)</div>
						</div>
					)}
					{!cogoPolicyNo && (
						<>
							<div className={styles.text}>
								Amount Payable:
								{' '}
								{formatAmount({
									amount   : totalApplicableCharges,
									currency : 'INR',
									options  : {
										notation : 'standard',
										style    : 'currency',
									},
								})}
							</div>
							<Button
								loading={insuranceLoading}
								disabled={insuranceLoading}
								onClick={() => {
									setNoteModal(true);
								}}
							>
								{renderBtn()}
							</Button>
						</>
					)}
					{noteModal && (
						<BuyModal
							noteModal={noteModal}
							setNoteModal={setNoteModal}
							handleSubmit={handleSubmit}
							paymentLoading={paymentLoading}
							insuranceLoading={insuranceLoading}
						/>
					)}
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default PreviewModal;
