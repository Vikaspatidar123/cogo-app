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

import styles from './styles.module.css';

const IconMaping = () => {
	const Mapping = {
		'01' : <IcMOtherAnimal className={styles.icon} />,
		'02' : <IcMVegetables className={styles.icon} />,
		'05' : <IcMMineralProducts className={styles.icon} />,
		'06' : <IcMChemicals className={styles.icon} />,
		'07' : <IcMPlastic className={styles.icon} />,
		'09' : <IcMWood className={styles.icon} />,
		'03' : <IcMEdibleOil className={styles.icon} />,
		12   : <IcMFootwear className={styles.icon} />,
		11   : <IcMTextile className={styles.icon} />,
		'04' : <IcMTobacco className={styles.icon} />,
		15   : <IcMMetal className={styles.icon} />,
		17   : <IcMVehicle className={styles.icon} />,
		19   : <IcMArmsAmmunition className={styles.icon} />,
		'08' : <IcMFlcl className={styles.icon} />,
		10   : <IcMWasteScrap className={styles.icon} />,
		14   : <IcMPreciousStone className={styles.icon} />,
		13   : <IcMCement className={styles.icon} />,
		16   : <IcMMiscellaneous className={styles.icon} />,
		18   : <IcMMedical className={styles.icon} />,
		21   : <IcMCeramics className={styles.icon} />,
		20   : <IcMHelp className={styles.icon} />,
	};
	return { Mapping };
};

export default IconMaping;
