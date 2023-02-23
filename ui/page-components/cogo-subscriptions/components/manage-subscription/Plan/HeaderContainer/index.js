import { IcAEndToEndVisibility, IcAManage, IcAProfessionalQuotations } from '@cogoport/icons-react';

import CargoInsurance from '../../../../asset/cargoInsurance.svg';
import Support from '../../../../asset/support.svg';

import styles from './styles.module.css';

const iconList = [
	{
		icon     : <IcAManage width="40px" height="40px" />,
		text     : 'Trade Life Cycle Planning',
		isComing : false,
	},
	{
		icon     : <IcAEndToEndVisibility width="40px" height="40px" />,
		text     : 'Tracking & Visibility',
		isComing : false,
	},
	{
		icon     : <IcAProfessionalQuotations width="40px" height="40px" />,
		text     : 'Quick Premium Quotation',
		isComing : false,
	},
	{
		icon     : <Support width="40px" height="40px" />,
		text     : '24/7 customer support',
		isComing : false,
	},
	{
		icon     : <CargoInsurance width="40px" height="40px" />,
		text     : 'Instant Cargo Insurance',
		isComing : true,
	},
];

function HeaderContainer() {
	return (
		<div className={styles.container}>
			<div className={styles.heading_container}>
				<div className={styles.heading}>One Stop Solution for your Supply Chain</div>
				<div className={styles.sub_heading}>
					We use technology to make freight more efficient, drive efficiency & Maximize
					your business
				</div>
			</div>

			<div className={styles.scroll_footer}>
				<div className={styles.footer}>
					{iconList.map(({ icon, text, isComing }) => (
						<div className={styles.col}>
							<div className={styles.icn_container}>{icon}</div>
							{isComing && <div className={styles.styled_tag}>Coming Soon...</div>}
							<div className={styles.txt}>{text}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default HeaderContainer;
