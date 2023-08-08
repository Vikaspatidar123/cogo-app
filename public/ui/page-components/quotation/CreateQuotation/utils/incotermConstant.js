const MappingConstant = () => {
	const CHARGES = {
		1 : 'Destination Custom Clearance',
		2 : 'Destination Transportation',
		3 : 'Destination CFS Clearance',
		4 : 'Origin Custom Clearance',
		5 : 'Origin Transportation',
		6 : 'Origin CFS Clearance',
	};

	const MAPPING = {
		CIF : [4, 5, 6],
		FOB : [1, 2, 3],
		EXW : [1, 2, 3, 4, 5, 6],
		FCA : [1, 2, 3, 5],
		FAS : [1, 2, 3],
		CFR : [4, 5, 6],
		CPT : [4, 5, 6],
		CIP : [4, 5, 6],
		DAT : [4, 5, 6],
		DAP : [4, 5, 6, 2],
		DDP : [1, 2, 3, 4, 5, 6],
	};

	const SERVICE_MAPPING = {
		import_fcl_customs : 'Destination Custom Clearance',
		export_fcl_customs : 'Origin Custom Clearance',
		import_fcl_cfs     : 'Destination CFS Clearance',
		export_fcl_cfs     : 'Origin CFS Clearance',
		import_lcl_customs : 'Destination Custom Clearance',
		export_lcl_customs : 'Origin Custom Clearance',
		import_air_customs : 'Destination Custom Clearance',
		export_air_customs : 'Origin Custom Clearance',
	};

	return {
		CHARGES,
		MAPPING,
		SERVICE_MAPPING,
	};
};

export default MappingConstant;
