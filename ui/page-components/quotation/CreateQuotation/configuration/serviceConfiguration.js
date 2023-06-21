import {
	IcAIncoterms,
	IcACustomeAgents,
	IcAAllInOneDashboard,
} from '@cogoport/icons-react';

const servicesConfiguration = [
	{
		id          : 1,
		displayName : 'Duties & Taxes',
		value       : 'isLandedCost',
		price       : 299,
		name        : 'duties_and_taxes',
		icon        : <IcAIncoterms width={25} height={25} />,
		tooltip     : (
			<div style={{ fontSize: '12px', color: '#333' }}>
				Get duties & taxes applicable for your trade in one-click! Plan your trade and
				cashflow by knowing all your applicable costs of trade beforehand.
			</div>
		),
	},
	{
		id          : 2,
		displayName : 'I/E Documents',
		value       : 'isDocumentation',
		price       : 399,
		name        : 'import_export_documents',
		icon        : <IcACustomeAgents width={25} height={25} />,
		tooltip     : (
			<div style={{ fontSize: '12px', color: '#333' }}>
				Get all required import/export documents information and templates before your
				trade and keep up-to-date knowledge of all legal documents and reduce the
				probability of detention or other charges
			</div>
		),
	},
	{
		id          : 3,
		displayName : 'I/E Controls',
		value       : 'isControls',
		price       : 499,
		name        : 'import_export_controls',
		icon        : <IcAAllInOneDashboard width={25} height={25} />,
		tooltip     : (
			<div style={{ fontSize: '12px', color: '#333' }}>
				Know what controls (like licenses, permits, sanction/embargo etc) are applicable
				before you start your trade.
			</div>
		),
	},
];

export default servicesConfiguration;
