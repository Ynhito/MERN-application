import {FormValues} from "../pages/auth/helpers/form"

export const registerHandler = async (request:any, formData: FormValues) => {
    try {
        const data = await request('/api/auth/register', 'POST', {...formData})
        const message = data.message;
        return {data, message}
    } catch(e) {}
}