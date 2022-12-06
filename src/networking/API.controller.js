import {useSelector} from 'react-redux';
import {BASE_URL} from '.';
const headers = {
  'Content-Type': 'multipart/form-data',
};

const Login = async data => {
  try {
    const URL = BASE_URL + 'volunteer';
    const formdata = new FormData();
    formdata.append('mobile', data.mobile);
    formdata.append('state_id', data.state_id || '1');
    formdata.append('name', data.name || '');
    const response = await fetch(URL, {
      method: 'POST',
      headers: headers,
      body: formdata,
    });
    if (response.status === 200) {
      let respJson = await response.json();
      return respJson;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const VerifyOTP = async data => {
  try {
    const URL = BASE_URL + 'volunteer/verify';
    const formdata = new FormData();
    formdata.append('mobile', data.mobile);
    formdata.append('otp', data.otp);

    const response = await fetch(URL, {
      method: 'POST',
      headers: headers,
      body: formdata,
    });
    let respJson = await response.json();
    return respJson;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getListofStates = async () => {
  try {
    const URL = BASE_URL + 'states';
    const response = await fetch(URL, {
      method: 'GET',
      headers: headers,
    });
    let respJson = await response.json();
    return respJson;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getListofDistricts = async state_id => {
  try {
    const URL = BASE_URL + 'districts/' + state_id;
    const response = await fetch(URL, {
      method: 'GET',
      headers: headers,
    });
    let respJson = await response.json();
    return respJson;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const getListofColonies = async district_id => {
  try {
    const URL = BASE_URL + 'colonies/' + district_id;
    const response = await fetch(URL, {
      method: 'GET',
      headers: headers,
    });
    let respJson = await response.json();
    return respJson;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export {
  Login,
  getListofDistricts,
  getListofColonies,
  getListofStates,
  VerifyOTP,
};
