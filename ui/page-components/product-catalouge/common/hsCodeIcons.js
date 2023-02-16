import {
	IcMOtherAnimal,
	IcMVegetables,
	IcMMineralProducts,
	IcMChemicals,
	IcMPlastic,
	IcMWood,
	IcMEdibleOil,
	IcMFootwear,
	IcMTextile,
	IcMTobacco,
	IcMMetal,
	IcMVehicle,
	IcMArmsAmmunition,
	IcMFlcl,
	IcMWasteScrap,
	IcMPreciousStone,
	IcMCement,
	IcMMiscellaneous,
	IcMMedical,
	IcMCeramics,
	IcMHelp,
	IcMGrid,
} from '@cogoport/icons-react';

const HsCodeIconMaping = (isMobile) => {
	const props = { width: isMobile ? 50 : 100, height: 25 };

	const Mapping = {
		'00': <IcMGrid {...props} />,
		'01': <IcMOtherAnimal {...props} />,
		'02': <IcMVegetables fill="#dc3535" {...props} />,
		'05': <IcMMineralProducts fill="#a66cff" {...props} />,
		'06': <IcMChemicals {...props} />,
		'07': <IcMPlastic {...props} fill="#0014ff" />,
		'09': <IcMWood {...props} fill="#c69749" />,
		'03': <IcMEdibleOil fill="#f49d1a" {...props} {...props} />,
		12: <IcMFootwear fill="#815b5b" {...props} />,
		11: <IcMTextile fill="#e14d2a" {...props} />,
		'04': <IcMTobacco fill="#735f32" {...props} {...props} />,
		15: <IcMMetal fill="#ff1e1e" {...props} />,
		17: <IcMVehicle fill="#e80f88" {...props} />,
		19: <IcMArmsAmmunition {...props} />,
		'08': <IcMFlcl {...props} />,
		10: <IcMWasteScrap fill="#829460" {...props} />,
		14: <IcMPreciousStone fill="#5f9df7" {...props} />,
		13: <IcMCement fill="#b73e3e" {...props} />,
		16: <IcMMiscellaneous {...props} />,
		18: <IcMMedical fill="#ff1e1e" {...props} />,
		21: <IcMCeramics fill="#b1b2ff" {...props} />,
		20: <IcMHelp fill="#002e94" {...props} />,
	};
	return { Mapping };
};

export default HsCodeIconMaping;
