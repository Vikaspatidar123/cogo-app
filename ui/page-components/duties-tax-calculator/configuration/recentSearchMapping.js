const containerSizeMap = {
	20     : '20FT',
	40     : '40FT',
	'20HC' : '20FTHC',
	'40HC' : '40FTHC',
};
const containerTypeMap = {
	standard  : 'DRY',
	refer     : 'REFRIGERATED',
	open_top  : 'OPEN TOP',
	flat_rack : 'FLAT',
	iso_tank  : 'ISO',
	open_side : 'OPEN SIDE',
};
const serviceTypeMap = {
	lcl_freight : 'LCL_FREIGHT',
	fcl_freight : 'FCL_FREIGHT',
};
const incotermMap = {
	cpt : 'CPT',
	cfr : 'CFR',
	fob : 'FOB',
	exw : 'EXW',
	fca : 'FCA',
	cip : 'CIP',
	cif : 'CIF',
	fas : 'FAS',
	dat : 'DAT',
	dap : 'DAP',
	ddp : 'DDP',
};

export { containerSizeMap, containerTypeMap, serviceTypeMap, incotermMap };
