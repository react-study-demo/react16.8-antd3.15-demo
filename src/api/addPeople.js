/**
 * 请求统一管理
 */
import { postJson } from './request';

/* Common */
export const addPeople = data => postJson('/user/add', data);
