import {FormValues} from "../pages/auth/helpers/form";
import {useState, useCallback} from 'react';

export const loginHandler = async (request:any, formData: FormValues) => {
    try {
        const data = await request('/api/auth/login', 'POST', {...formData})
        const message = data.message;
        return {data, message}
    } catch(e) {}
}