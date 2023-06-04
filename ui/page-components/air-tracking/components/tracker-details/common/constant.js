const POC_TYPES = { CONSIGNEE: 'CONSIGNEE', SHIPPER: 'SHIPPER' };
const INCOTERM_TYPES = {
	EXW : 'EXW',
	FCA : 'FCA',
	FAS : 'FAS',
	FOB : 'FOB',
	CFR : 'CFR',
	CIF : 'CIF',
	DPU : 'DPU',
	CPT : 'CPT',
	CIP : 'CIP',
	DDP : 'DDP',
};

const IMPORT_INCOTERMS = [
	INCOTERM_TYPES.EXW,
	INCOTERM_TYPES.FCA,
	INCOTERM_TYPES.FAS,
	INCOTERM_TYPES.FOB,
];

const EXPORT_INCOTERMS = [
	INCOTERM_TYPES.CFR,
	INCOTERM_TYPES.CIF,
	INCOTERM_TYPES.DPU,
	INCOTERM_TYPES.CPT,
	INCOTERM_TYPES.CIP,
	INCOTERM_TYPES.DDP,
];

const altImage =	'https://prod-cogoport.s3.ap-south-1.amazonaws.com/669242b94926dee5f79e2e3401d7ed5e/og-image.jpg';
const MAX_STEPS = 1;
const STEPS_INFO = [
	{ heading: 'Add and manage Contacts', nextButtonLabel: 'Customize Alerts' },
	{ heading: 'Customize events for updates and deviations', nextButtonLabel: 'Save' },
];

export { POC_TYPES, IMPORT_INCOTERMS, EXPORT_INCOTERMS, altImage, STEPS_INFO, MAX_STEPS };
