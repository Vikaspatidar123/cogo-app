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
} from '@cogoport/icons-react';

const IconMaping = (isMobile) => {
	const props = { width: isMobile ? 50 : 100, height: 25 };

	const Mapping = {
		'01': <IcMOtherAnimal {...props} />,
		'02': <IcMVegetables {...props} />,
		'05': <IcMMineralProducts {...props} />,
		'06': <IcMChemicals {...props} />,
		'07': <IcMPlastic {...props} />,
		'09': <IcMWood {...props} />,
		'03': <IcMEdibleOil {...props} />,
		12: <IcMFootwear {...props} />,
		11: <IcMTextile {...props} />,
		'04': <IcMTobacco {...props} />,
		15: <IcMMetal {...props} />,
		17: <IcMVehicle {...props} />,
		19: <IcMArmsAmmunition {...props} />,
		'08': <IcMFlcl {...props} />,
		10: <IcMWasteScrap {...props} />,
		14: <IcMPreciousStone {...props} />,
		13: <IcMCement {...props} />,
		16: <IcMMiscellaneous {...props} />,
		18: <IcMMedical {...props} />,
		21: <IcMCeramics {...props} />,
		20: <IcMHelp {...props} />,
	};
	return { Mapping };
};

export default IconMaping;
