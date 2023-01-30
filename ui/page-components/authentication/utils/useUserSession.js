import { request } from '@/packages/request/request';

const useUserSession = (ctx) => request.get('get_user_session', { ctx });

export default useUserSession;
