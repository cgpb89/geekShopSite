import axios from 'axios';

//#region SignUp

export const signup = (pEmail, pPassword) => {
    console.log('pEmail, pPassword', pEmail, pPassword)
    return axios.post('http://localhost:3001/users/signup', {
            email: pEmail,
            password: pPassword
    }).then(function (response) {
        console.log('Response', response);
        return response.data;
    })
        .catch(function (error) {
            console.log(error);
            return error;
        });
};

export const signin = (pEmail, pPassword) => {
    console.log('pEmail, pPassword', pEmail, pPassword)
    return axios.post('http://localhost:3001/users/signin', {
            email: pEmail,
            password: pPassword
    }).then(function (response) {
        console.log('Response', response);
        return response.data;
    })
        .catch(function (error) {
            console.log(error);
            return error;
        });
};

export const artiulosList = () => {
    return axios.get('http://localhost:3001/articles', {
    }).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
            console.log(error);
            return error;
        });
};

export const artiulosInCart = (lista) => {
    console.log('Servicio', lista);
    return axios.get('http://localhost:3001/articlesForCart/', {
        params:{
            articles: JSON.stringify(lista)
        }
 
    }).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
            console.log(error);
            return error;
        });
};






















//#endregion
/*
export const signup= (credentials)=> {

        const request = new Request('http://localhost:3001/users/signup', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        return fetch(request).then(function (response) {
            return response.json().then(function (err,data) {
                console.log('', err,data);
                console.log('response.status',response.status);
                if (response.status === 200) {

                } else {

                }
            });//Json response
        }).catch(error => {
            console.log('error', error);
            return error;
        });
}*/