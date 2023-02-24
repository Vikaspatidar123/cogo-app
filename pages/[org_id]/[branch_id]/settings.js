import { ProfileDetails } from '@/ui/page-components/profile';

function ProfileComponent() {
	return <ProfileDetails />;
}
ProfileComponent.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Profile',
	},
});
export default ProfileComponent;
