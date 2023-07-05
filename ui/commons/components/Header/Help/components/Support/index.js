/* eslint-disable react-hooks/exhaustive-deps */
import { Tooltip } from '@cogoport/components';
import { IcMEmail, IcMCall } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useGetTicketsUnreadCount from '../../hooks/useGetTicketsUnreadCount';

import styles from './styles.module.css';
import SupportTypes from './SupportTypes';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const translationKey = 'common:components_header_help_support';

const default_agent = ({ t }) => ({
	name                  : t(`${translationKey}_name`),
	email                 : t(`${translationKey}_email`),
	mobile_country_code   : t(`${translationKey}_countrycode`),
	mobile_number         : t(`${translationKey}_mobilenumber`),
	mobile_number_eformat : `${t(`${translationKey}_countrycode`)}${t(
		`${translationKey}_mobilenumber`,
	)}`,
});

function Support({
	agent = {},
	showPopover = false,
	setModalData = () => {},
	setShowPopover = () => {},
}) {
	const { t } = useTranslation(['common']);

	const agentKey = isEmpty(agent) ? default_agent({ t }) : agent;
	const { getUnreadTicketsCount = () => {}, unreadCount = 0 } = useGetTicketsUnreadCount();

	useEffect(() => {
		if (showPopover) {
			getUnreadTicketsCount();
		}
	}, [showPopover]);

	return (
		<div className={styles.container}>
			<div className={styles.help_header}>
				<div className={styles.help_title}>
					{t(`${translationKey}_title`)}
					:
				</div>
				<div className={styles.agent_details}>
					<div className={styles.agen_info}>
						<div className={styles.agent_avatar}>
							<img
								src={GLOBAL_CONSTANTS.image_url.category_image}
								alt="Profile Pic"
								width={38}
								height={38}
							/>
						</div>
						<div className={styles.agent_contact}>
							<div className={styles.agent_name}>{agentKey.name}</div>
							<div className={styles.agent_email}>
								<IcMEmail className={styles.email_icon} />
								<a
									href={`mailto:${agentKey.email}`}
									className={styles.agent_email_address}
								>
									{agentKey.email}
								</a>
							</div>
						</div>
					</div>
					<Tooltip
						content={
							`${agentKey.mobile_country_code}${agentKey.mobile_number}`
							|| agentKey.mobile_number_eformat
						}
						placement="top"
					>
						<a
							href={`tel:${
								agentKey.mobile_number || agentKey.mobile_number_eformat
							}`}
							className={styles.help_call_icon}
						>
							<IcMCall className={styles.agent_call} />
						</a>
					</Tooltip>
				</div>
			</div>
			<SupportTypes
				setModalData={setModalData}
				setShowPopover={setShowPopover}
				unreadCount={unreadCount}
			/>
		</div>
	);
}

export default Support;
