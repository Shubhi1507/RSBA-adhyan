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
    formdata.append('state_id', '1');
    formdata.append('name', '');

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

const getListofDistricts = async () => {
  try {
    const URL = BASE_URL + 'districts';
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
  console.log('district_id', district_id);

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

export {Login, getListofDistricts, getListofColonies};
