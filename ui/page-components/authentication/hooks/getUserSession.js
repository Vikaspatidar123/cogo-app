import { request } from '@/packages/request';

const getUserSession = (ctx) => request.get('user/get_user_session', { ctx });

export default getUserSession;
