import { dynamic } from '@/packages/next';

const Dashboard = dynamic(() => import('./components'), { ssr: false });
export default Dashboard;
