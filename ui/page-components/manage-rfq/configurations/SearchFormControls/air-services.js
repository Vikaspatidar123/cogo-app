const AirServices = {
	cif : ['export_transportation', 'lcl_freight'],
	cfr : ['export_transportation', 'lcl_freight'],
	cpt : ['export_transportation', 'lcl_freight'],
	cip : ['export_transportation', 'lcl_freight'],
	dat : ['export_transportation', 'lcl_freight'],
	dap : ['export_transportation', 'air_freight', 'import_transportation'],
	ddp : ['export_transportation', 'air_freight', 'import_transportation'],
	fob : ['air_freight', 'import_transportation'],
	exw : ['export_transportation', 'air_freight', 'import_transportation'],
	fca : ['export_transportation', 'air_freight', 'import_transportation'],
	fas : ['air_freight', 'import_transportation'],
};

export default AirServices;
