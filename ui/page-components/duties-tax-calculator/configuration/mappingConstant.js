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
		FOB : [1, 2, 3],
		EXW : [1, 2, 3, 4, 5, 6],
		FCA : [1, 2, 3, 5],
		FAS : [1, 2, 3],
		CIF : [4, 5, 6],
		CFR : [4, 5, 6],
		CPT : [4, 5, 6],
		CIP : [4, 5, 6],
		DAT : [4, 5, 6],
		DAP : [4, 5, 6, 2],
		DDP : [1, 2, 3, 4, 5, 6],
	};

	return {
		CHARGES,
		MAPPING,
	};
};

export default MappingConstant;
