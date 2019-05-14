/**
 * 请求统一管理
 */
import { postJson } from './request';

/* Common */
export const getPeople = data => postJson('/user/findAll', data);
export const delPeople = data => postJson('/user/deleteUser', data);
