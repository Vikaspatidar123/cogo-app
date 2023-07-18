import MobileHeader from '../../../../MobileHeader';

import Details from './Details';
import useGetOrganizationUsers from './hooks/useGetOrganizationUsers';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

function Team() {
	const { users, loading, onClickBackButton } = useGetOrganizationUsers();

	function RenderTeamDetails() {
		if (loading) { return <LoadingState />; }
		return (
			<div>
				<div className={styles.header_text}>
					My Team
				</div>
				<Details users={users} />
			</div>
		);
	}

	return (
		<>
			<MobileHeader
				heading="Company Details"
				onClickBackButton={onClickBackButton}
			/>

			<RenderTeamDetails />
		</>
	);
}

export default Team;
