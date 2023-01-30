import Dashboard from '@/ui/page-components/dashboard';

function DashboardComponent() {
	return <Dashboard />;
}
DashboardComponent.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Dashboard',
	},
});

export default DashboardComponent;
