import { request } from '@/packages/request/helpers/request';

const useDraftAirwayBill = (body) => request.post('/verify_awb_email_token', body);

export default useDraftAirwayBill;
