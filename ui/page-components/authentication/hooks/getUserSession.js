import { request } from '@/packages/request';

const getUserSession = (ctx) => request.get('auth/get_user_session', { ctx });

export default getUserSession;
