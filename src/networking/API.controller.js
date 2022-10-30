import {BASE_URL} from '.';

const Login = async data => {
    console.log("data" , data)
  try {
    const URL = BASE_URL + 'volunteer';
    let body = {
      mobile: data.mobile,
      state_id: 1,
     name: "",
    };
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    console.log("response" , await  response.json());
    return response;
  } catch (error) {
    console.log(error)
    return error 
  }
};
 export {Login}