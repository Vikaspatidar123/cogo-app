const LCLServices = {
	cif : ['export_transportation', 'export_lcl_customs', 'lcl_freight'],
	cfr : ['export_transportation', 'export_lcl_customs', 'lcl_freight'],
	cpt : ['export_transportation', 'export_lcl_customs', 'lcl_freight'],
	cip : ['export_transportation', 'export_lcl_customs', 'lcl_freight'],
	dat : ['export_transportation', 'export_lcl_customs', 'lcl_freight'],
	dap : [
		'export_transportation',
		'export_lcl_customs',
		'lcl_freight',
		'import_transportation',
	],
	ddp: [
		'export_transportation',
		'export_lcl_customs',
		'lcl_freight',
		'import_lcl_customs',
		'import_transportation',
	],
	fob : ['lcl_freight', 'import_lcl_customs', 'import_transportation'],
	exw : [
		'export_transportation',
		'export_lcl_customs',
		'lcl_freight',
		'import_lcl_customs',
		'import_transportation',
	],
	fca: [
		'export_transportation',
		'lcl_freight',
		'import_lcl_customs',
		'import_transportation',
	],
	fas: ['lcl_freight', 'import_lcl_customs', 'import_transportation'],
};

export default LCLServices;
