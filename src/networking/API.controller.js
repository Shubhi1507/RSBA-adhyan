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
    const response = await fetch(URL, {
      method: 'POST',
      headers: headers,
      body: formdata,
    });
    let respJson = await response.json();
    console.log('res- >', respJson);
    return respJson;
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
    console.log('v. res- >', respJson);

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

const submitSurveyAPI = async data => {
  const URL = BASE_URL + 'center/survey';
  console.log('data', data);
  const formdata = new FormData();
  formdata.append('centre_id', data.centre_id);
  formdata.append('audience_id', data.audience_id);
  formdata.append('survey_data', data.survey_data);
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: headers,
      body: formdata,
    });
    console.log('res- >', await response.json());
    if (response.status === 200) {
      let respJson = await response.json();
      return respJson;
    }
  } catch (e) {
    console.log(error);
    return error;
  }
};

const LatestVolunteerData = async data => {
  console.log('payload', data);
  try {
    const URL = BASE_URL + 'volunteer/latestassignedcenter';
    const formdata = new FormData();
    formdata.append('mobile', data.mobile);
    formdata.append('otp', data.otp);

    const response = await fetch(URL, {
      method: 'POST',
      headers: headers,
      body: formdata,
    });
    let respJson = await response.json();
    console.log('v. res- >', respJson);
    return respJson;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createSubmitSurveyData = async data => {
  try {
    const URL = BASE_URL + 'center';
    const formdata = new FormData();
    formdata.append('volunteer_id', data.volunteer_id);
    formdata.append('state_id', data.state_id);
    formdata.append('district_id', data.district_id);
    formdata.append('address', data.address);
    formdata.append('type', data.head_name);
    formdata.append('contact_details', data.contact_details);
    formdata.append('is_operational', data.is_operational);
    formdata.append('reason_not_operational', data.reason_not_operational);
    formdata.append('survey_device_location', data.survey_device_location);
    formdata.append('partially_filled', data.partially_filled);
    formdata.append('survey_form_id', data.survey_form_id);
    const response = await fetch(URL, {
      method: 'POST',
      headers: headers,
      body: formdata,
    });
    let respJson = await response.json();
    console.log('create submit survey res- >', respJson);
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
  submitSurveyAPI,
  LatestVolunteerData,
  createSubmitSurveyData,
};
