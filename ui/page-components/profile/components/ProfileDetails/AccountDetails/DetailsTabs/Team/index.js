import { useTranslation } from 'next-i18next';

import MobileHeader from '../../../../MobileHeader';

import Details from './Details';
import useGetOrganizationUsers from './hooks/useGetOrganizationUsers';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

function Team() {
	const { t } = useTranslation(['settings']);

	const { users, loading, onClickBackButton } = useGetOrganizationUsers();

	function RenderTeamDetails() {
		if (loading) { return <LoadingState />; }
		return (
			<div>
				<div className={styles.header_text}>
					{t('settings:my_team_heading')}
				</div>
				<Details users={users} />
			</div>
		);
	}

	return (
		<>
			<MobileHeader
				heading={t('settings:my_team_heading')}
				onClickBackButton={onClickBackButton}
			/>

			<RenderTeamDetails />
		</>
	);
}

export default Team;
