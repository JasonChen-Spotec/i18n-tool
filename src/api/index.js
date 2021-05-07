import { createAPI, httpMethod } from '@/shared/utils/request';

export const toCSV = createAPI(httpMethod.POST, '/toCSV');
