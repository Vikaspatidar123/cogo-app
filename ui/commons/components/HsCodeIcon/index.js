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

import styles from './styles.module.css';

const HsCodeIcon = () => {
	const MAPPING = {
		'00' : <IcMGrid className={styles.icon} />,
		'01' : <IcMOtherAnimal className={styles.icon} fill="#333" />,
		'02' : <IcMVegetables fill="#dc3535" className={styles.icon} />,
		'03' : <IcMEdibleOil fill="#f49d1a" className={styles.icon} />,
		'04' : <IcMTobacco fill="#735f32" className={styles.icon} />,
		'05' : <IcMMineralProducts fill="#a66cff" className={styles.icon} />,
		'06' : <IcMChemicals className={styles.icon} />,
		'07' : <IcMPlastic className={styles.icon} fill="#0014ff" />,
		'08' : <IcMFlcl className={styles.icon} />,
		'09' : <IcMWood className={styles.icon} fill="#c69749" />,
		10   : <IcMWasteScrap fill="#829460" className={styles.icon} />,
		11   : <IcMTextile fill="#e14d2a" className={styles.icon} />,
		12   : <IcMFootwear fill="#815b5b" className={styles.icon} />,
		13   : <IcMCement fill="#b73e3e" className={styles.icon} />,
		14   : <IcMPreciousStone fill="#5f9df7" className={styles.icon} />,
		15   : <IcMMetal fill="#ff1e1e" className={styles.icon} />,
		16   : <IcMMiscellaneous className={styles.icon} />,
		17   : <IcMVehicle fill="#e80f88" className={styles.icon} />,
		18   : <IcMMedical fill="#ff1e1e" className={styles.icon} />,
		19   : <IcMArmsAmmunition className={styles.icon} />,
		20   : <IcMHelp fill="#002e94" className={styles.icon} />,
		21   : <IcMCeramics fill="#b1b2ff" className={styles.icon} />,
	};
	return { MAPPING };
};

export default HsCodeIcon;
