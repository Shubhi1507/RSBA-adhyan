import {BASE_URL} from '.';
const headers = {
  'Content-Type': 'multipart/form-data',
};

const Login = async data => {
  console.log('data', data);
  try {
    const URL = BASE_URL + 'volunteer';

    const formdata = new FormData();
    formdata.append('mobile', data.mobile);
    formdata.append('state_id', '1');
    formdata.append('name', '');

    const response = await fetch(URL, {
      method: 'POST',

      headers: headers,
      body: formdata,
    });
    console.log('response', await response.json());
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export {Login};
