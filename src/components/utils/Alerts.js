/* eslint-disable max-len */
import { Alert } from 'react-native';

export const doAlert = (tittle, message, btn = null, obj = null) => Alert.alert(tittle, message, btn, obj);
export const doAlertWithTimeout = (tittle, message, timeout = 500, btn = null, obj = null) => setTimeout(doAlert, timeout, tittle, message, btn, obj);
