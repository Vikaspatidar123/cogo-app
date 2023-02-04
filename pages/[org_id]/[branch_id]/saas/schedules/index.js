import Tools from '@/ui/page-components/cpq-tools';

function ToolsComponent() {
	return <Tools />;
}
ToolsComponent.getInitialProps = () => ({
	layout : 'app',
	head   : {
		title: 'Schedules Tools',
	},
});

export default ToolsComponent;
