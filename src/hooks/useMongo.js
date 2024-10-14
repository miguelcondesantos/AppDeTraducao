import axios from "axios";

const mongo = axios.create({
    baseURL: process.env.REACT_BASE_URL || "http://10.0.2.2:5000"
})

export const UseMongo = () => ({
    feedback: async (texto) => {
        try {
            const response = await mongo.post('/feedback', { texto }, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ texto }),
            });
            return response
        } catch (error) {
            console.error(error);
        }
    }

})