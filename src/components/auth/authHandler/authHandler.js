import axios from "axios";
export const getRegistrationDetails = async (userName, email, password, role) => {
    let data = JSON.stringify({
        "userName": userName,
        "email": email,
        "password": password,
        "role": role
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:5000/api/auth/signup',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    try {
        const response = await axios(config);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const loginHandler = async (email,password)=>{
    let data = JSON.stringify({
        "email": email,
        "password": password
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:5000/api/auth/signin',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (err) {
        throw err;
    }

}