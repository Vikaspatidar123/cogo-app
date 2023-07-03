/* eslint-disable no-undef */
import { IcMArrowNext } from '@cogoport/icons-react';
import { deleteCookie } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function MobileMenu({
	OPTIONS_MAPPING,
	activeTab,
	handleChangeTab,
	tabOptions,
}) {
	const { t } = useTranslation(['common']);
	const { query } = useSelector(({ general }) => general);

	const handleChangeMenuTab = (tab) => {
		handleChangeTab(tab);
	};

	const handleClick = async (e) => {
		e.preventDefault();

		deleteCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);

		window.location.href = '/login';
	};

	const { title, containerComponent: ActiveContainerComponent = null } = OPTIONS_MAPPING[activeTab];

	if (!query.activeTab) {
		return (
			<div className={styles.main_container}>
				{tabOptions.map((option, index) => (
					<div className={styles.Container} key={option.title}>
						<div
							className={styles.menu_container}
							role="presentation"
							onClick={() => handleChangeMenuTab(option.key)}
						>
							{option.title}
							<IcMArrowNext height={20} width={20} fill="#828282" />
						</div>

						{index < tabOptions.length && (
							<div className={styles.border_bottom} />
						)}
					</div>
				))}

				<div className={styles.logout_container}>
					<div
						className={styles.logout_text}
						role="presentation"
						onClick={(e) => handleClick(e)}
					>
						{t('common:layouts_app_logout')}
					</div>
				</div>
			</div>
		);
	}

	return <ActiveContainerComponent title={title} />;
}

export default MobileMenu;
