import { React, useEffect } from 'react';
import { useState } from 'react';
import '../App.css'
import '../MultiStepForm.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const RegistrationForm = () => {
    const [currentTab, setCurrentTab] = useState(1);
    const [currentStep, setCurrentStep] = useState(1);
    const [formRefNo, setFormRefNo] = useState('');
    const [formValues, setFormValues] = useState({
        surname: '',
        firstName: '',
        otherNames: '',
        title: '',
        gender: '',
        maritalStatus: '',
        nin: '',
        phoneNumber: '',
        emailAddress: '',
        dob: '',
        countryOfResidence: '',
        stateofOrigin: '',
        lgaOfOrigin: '',
        homeNumber: '',
        streetNumber: '',
        cityTown: '',
        NOKTitle: '',
        NOKFirstName: '',
        NOKLastName: '',
        NOKMiddlename: '',
        NOKGender: '',
        NOKRelationship: '',
        NOKMobile: '',
        NOKEmail: '',
        NOKCountryOfResidence: '',
        NOKStateOfResidence: '',
        NOKLGAOfResidence: '',
        NOKHouseNoOrName: '',
        NOKStreetName: '',
        NOKCityTownVillage: '',
        EmployerSector: '',
        EmployerCode: '',
        EmployerCountry: '',
        EmployerState: '',
        EmployerLGA: '',
        EmployerHouseNoOrName: '',
        EmployerStreetName: '',
        EmployerCityTownVillage: '',
        stateOfPosting: '',
        DateOfCurrentEmployment: '',
        DateOfFirstEmployment: '',
        passportImg: null,
        signatureImg: null,
        employmentLetterImg: null,
        meansOfIdImg: null,
        nationalIdImg: null,
        firstAppointmentLetterImg: null,
        password: '',
        AgentCode: ''
    });

    const [errorMsg, setErrorMsg] = useState("");

    const maxFileSize = 3 * 1024 * 1024; // 3MB in bytes

    let isPassportValid = false;
    let isSignatureValid = false;

    
    useEffect(() => {
        // Fetch form reference number when the component mounts
        fetch('/api/Enrollment/generateFormRefNo')
            .then(response => response.json())
            .then(data => setFormRefNo(data.formRefNo))
            .catch(error => console.error('Error fetching form reference number:', error));
    }, []); // Empty dependency array ensures the effect runs only once

    const handleSave = () => {
        //setStep(step + 1);
        //setCurrentTab(currentTab + 1);
    };

    const [passportImgSrc, setPassportImgSrc] = useState(null);
    const [signatureImgSrc, setSignatureImgSrc] = useState(null);
    const [passportImgByte, setPassportImgByte] = useState(null);
    const [signatureImgByte, setSignatureImgByte] = useState(null);

    const showPic = (input) => {
        if (input.files && input.files[0]) {
            const filerdr = new FileReader();
            filerdr.onload = function (e) {
                setPassportImgSrc(e.target.result);
                //setFormValues({ ...formValues, passportImg: input.files[0] });
                //e.target.files[0]
                //setFormValues({ ...formValues, passportImg: e.target.result });
                setFormValues({ ...formValues, passportImg: input.files[0] });

                // Convert file to byte array
                const arrayBuffer = e.target.result;
                const uint8Array = new Uint8Array(arrayBuffer);
                setPassportImgByte(uint8Array);
                // Display preview in the image element
                document.getElementById('passportImg').src = e.target.result;
                input.value = '';
            };
            //filerdr.readAsArrayBuffer(input.files[0]);
            filerdr.readAsDataURL(input.files[0]);
        }
    };

    const showSig = (input) => {
        if (input.files && input.files[0]) {
            const filerdr = new FileReader();
            filerdr.onload = function (e) {
                setSignatureImgSrc(e.target.result);
                //setFormValues({ ...formValues, signatureImg: input.files[0] });
                //setFormValues({ ...formValues, signatureImg: e.target.result });
                setFormValues({ ...formValues, signatureImg: input.files[0] });
                // Convert file to byte array
                const arrayBuffer = e.target.result;
                const uint8Array = new Uint8Array(arrayBuffer);
                setSignatureImgByte(uint8Array);
                // Display preview in the image element
                document.getElementById('signatureImg').src = e.target.result;
                input.value = '';
            };
            filerdr.readAsDataURL(input.files[0]);
        }
    };

    const handleEmploymentFileChange = (e) => {
        setFormValues({
            ...formValues,
            employmentLetterImg: e.target.files[0],
        });
    };
    const handleMeansOfIDFileChange = (e) => {
        setFormValues({
            ...formValues,
            meansOfIdImg: e.target.files[0],
        });
    };
    const handleNationalIDImageFileChange = (e) => {
        setFormValues({
            ...formValues,
            nationalIdImg: e.target.files[0],
        });
    };
    const handleFirstAppointmentFileChange = (e) => {
        setFormValues({
            ...formValues,
            firstAppointmentLetterImg: e.target.files[0],
        });
    };
    const handleChange = (event) => {
        const { name, value, type } = event.target;

        if (type === 'file') {
            // Handle file input separately
            const file = event.target.files[0];
            setFormValues({ ...formValues, [name]: file });
            // Optionally, you can also show a preview of the image here if needed
        }
        else if (type === 'radio') {
            // For radio buttons, set the value directly
            setFormValues({ ...formValues, [name]: value });
        } else if (type === 'date' ? value : value.trim()) {
            // For date input, get the selected date
            setFormValues({ ...formValues, [name]: value });
        } else {
            // For other input types, use the value directly
            setFormValues({ ...formValues, [name]: value });
        }
        console.log(formValues);
    };
 



    const handleNext = () => {
        if (validateStep()) {
            setCurrentStep(currentStep + 1);
            setCurrentTab(currentTab + 1);
        } else {
            showToast('Please fill in all the required fields.');
        }
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
        setCurrentTab(currentTab - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdataObj = new FormData();

        formdataObj.append('formRefNo', formRefNo);
        //// Loop through formValues and append each key-value pair to formdataObjObj
        //for (const [key, value] of Object.entries(formValues)) {
        //    // If the value is a File object, append it as a file; otherwise, append it as a string
        //    if (value instanceof File) {
        //        formdataObjObj.append(key, value, value.name);
        //    } else {
        //        formdataObjObj.append(key, value);
        //    }
        //}
        formdataObj.append('SchemeId', '1');
        formdataObj.append('Ssn', formValues.nin);
        formdataObj.append('Title', formValues.title);
        formdataObj.append('FirstName', formValues.firstName);
        formdataObj.append('Surname', formValues.surname);
        formdataObj.append('Gender', formValues.gender);
        formdataObj.append('MaritalStatusCode', formValues.maritalStatus);
        //formdataObj.append('PlaceOfBirth', formValues.)
        formdataObj.append('MobilePhone', formValues.phoneNumber);
        formdataObj.append('PermanentAddressLocation', 'N');
        formdataObj.append('NationalityCode', formValues.countryOfResidence);
        formdataObj.append('StateOfOrigin', formValues.stateofOrigin);
        formdataObj.append('LgaCode', formValues.lgaOfOrigin);
        formdataObj.append('PermCountry', formValues.countryOfResidence);
        formdataObj.append('PermState', formValues.StateOfPosting);
        formdataObj.append('PermLga', formValues.lgaOfOrigin);
        formdataObj.append('PermCity', formValues.cityTown);
        formdataObj.append('Othernames', formValues.otherNames);
        formdataObj.append('Email', formValues.emailAddress);
        formdataObj.append('PermanentAddress', formValues.homeNumber);
        formdataObj.append('PermanentAddress1', formValues.streetNumber);
        formdataObj.append('EmployerType', formValues.EmployerSector);
        formdataObj.append('EmployerRcno', formValues.EmployerCode);
        formdataObj.append('DateOfFirstAppointment', formValues.DateOfFirstEmployment);
        formdataObj.append('EmployerLocation', 'N');
        formdataObj.append('EmployerCountry', formValues.EmployerCountry);
        formdataObj.append('EmployerStateCode', formValues.EmployerState);
        formdataObj.append('EmployerLga', formValues.EmployerLGA);
        formdataObj.append('EmployerCity', formValues.EmployerCityTownVillage);
        //formdataObj.append('EmployerBusiness', formValues);
        formdataObj.append('EmployerAddress1', formValues.EmployerHouseNoOrName);
        formdataObj.append('EmployerAddress', formValues.EmployerStreetName);
        formdataObj.append('NokTitle', formValues.NOKTitle);
        formdataObj.append('NokName', formValues.NOKFirstName);
        formdataObj.append('NokSurname', formValues.NOKLastName);
        formdataObj.append('NokGender', formValues.NOKGender);
        formdataObj.append('NokRelationship', formValues.NOKRelationship);
        formdataObj.append('NokLocation', 'N');
        formdataObj.append('NokCountry', formValues.NOKCountryOfResidence);
        formdataObj.append('NokStatecode', formValues.NOKStateOfResidence);
        formdataObj.append('NokLga', formValues.NOKLGAOfResidence);
        formdataObj.append('NokCity', formValues.NOKCityTownVillage);
        formdataObj.append('NokOthername', formValues.NOKMiddlename);
        formdataObj.append('NokAddress1', formValues.NOKStreetName);
        formdataObj.append('NokAddress', formValues.NOKHouseNoOrName);
        formdataObj.append('NokEmailaddress', formValues.NOKEmail);
        formdataObj.append('NokMobilePhone', formValues.NOKMobile);
        formdataObj.append('PictureImage', passportImgByte);
        formdataObj.append('SignatureImage', signatureImgByte);
        formdataObj.append('StateOfPosting', formValues.StateOfPosting);
        formdataObj.append('AgentCode', formValues.Agent);
        formdataObj.append('Password', formValues.password);
        formdataObj.append('EmploymentLetter', formValues.employmentLetterImg);
        formdataObj.append('MeansOfId', formValues.meansOfIdImg);
        formdataObj.append('NationalIdCard', formValues.nationalIdImg);
        formdataObj.append('FirstAppointmentLetter', formValues.firstAppointmentLetterImg);


        try {
            const response = await fetch('/api/Enrollment', {
                method: 'POST',
                body: formdataObj,
            });

            if (response.ok) {
                // Handle successful submission
                console.log('Form submitted successfully!');
            } else {
                // Handle error
                console.error('Error submitting form.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const ElementReview = ({ label, value }) => (
        <div>
            <strong>{label}:</strong> {value}
        </div>
    );
    const ImagePreview = ({ label, src }) => (
        <tr>
            <td>{label}</td>
            <td>
                <img height="140" width="120" src={src} alt={`${label} Preview`} />
            </td>
        </tr>
    );
    const validateStep = () => {
        // Implement your validation logic here
        switch (currentStep) {
            case 1:
                return (
                    formValues.surname.trim() !== '' &&
                    formValues.firstName.trim() !== '' &&
                    formValues.otherNames.trim() !== '' &&
                    formValues.gender.trim() !== '' &&
                    formValues.maritalStatus.trim() !== '' &&
                    formValues.nin.trim() !== '' &&
                    formValues.phoneNumber.trim() !== '' &&
                    formValues.emailAddress.trim() !== '' &&
                    formValues.dob.trim() !== ''
                );
            case 2:
                return (
                    formValues.countryOfResidence !== null &&
                    formValues.stateofOrigin !== null &&
                    formValues.lgaOfOrigin !== null &&
                    formValues.homeNumber !== null &&
                    formValues.streetNumber !== null &&
                    formValues.cityTown !== null
                );
            case 3:
                return (
                    formValues.EmployerSector !== null &&
                    formValues.EmployerCode !== null &&
                    formValues.EmployerCountry !== null &&
                    formValues.EmployerState !== null &&
                    formValues.EmployerLGA !== null &&
                    formValues.EmployerHouseNoOrName !== null &&
                    formValues.EmployerStreetName !== null &&
                    formValues.EmployerCityTownVillage !== null &&
                    formValues.DateOfCurrentEmployment !== null &&
                    formValues.DateOfFirstEmployment !== null
                );
            case 4:
                return (
                    
                    formValues.NOKFirstName.trim() !== null &&
                    formValues.NOKLastName.trim() !== null &&
                    formValues.NOKMiddlename.trim() !== null &&
                    formValues.NOKGender.trim() !== '' &&
                    formValues.NOKRelationship.trim() !== null &&
                    formValues.NOKMobile.trim() !== null &&
                    formValues.NOKEmail.trim() !== null &&
                    formValues.NOKCountryOfResidence !== null &&
                    formValues.NOKStateOfResidence.trim() !== '' &&
                    formValues.NOKLGAOfResidence.trim() !== '' &&
                    formValues.NOKHouseNoOrName.trim() !== '' &&
                    formValues.NOKStreetName.trim() !== '' &&
                    formValues.NOKCityTownVillage.trim() !== ''
                );
                
            case 5:

                isPassportValid = formValues.passportImg instanceof File && formValues.passportImg.size <= maxFileSize;
//                    formValues.passportImg && formValues.passportImg.size <= maxFileSize;
                isSignatureValid = formValues.signatureImg instanceof File && formValues.signatureImg.size <= maxFileSize;
//                    formValues.signatureImg && formValues.signatureImg.size <= maxFileSize;

                console.log(maxFileSize);
                console.log(formValues.passportImg.size)
                console.log(isPassportValid)
                console.log(isSignatureValid)
                if (!isPassportValid || !isSignatureValid) {
                    // Display an error message
                    setErrorMsg("Maximum file size (3MB) exceeded for Passport or Signature Image.");
                } else {
                    // Reset the error message
                    setErrorMsg("");
                }
                return (
                    isPassportValid &&
                    isSignatureValid &&
                    formValues.passportImg !== null &&
                    formValues.signatureImg !== null &&
                    formValues.employmentLetterImg !== null &&
                    formValues.meansOfIdImg !== null &&
                    formValues.nationalIdImg !== null &&
                    formValues.firstAppointmentLetterImg !== null
                    
                );
            //case 6:
            //        return formValues.emailAddress.trim() !== '' &&
            //        formValues.firstName.trim() !== '' &&
            //        formValues.emailAddress.trim() !== ''; 
            case 7:
                return formValues.password.trim() !== '';
            default:
                return true; // Default to true for steps without validation
        }
    };

    useEffect(() => {
        console.log(formValues);
    }, [formValues]);

    const showToast = (message) => {
        toast.error(message, {
            position: toast.position,
        });
    };

    const renderStep = () => {
        switch (currentStep, currentTab) {
            case 1:
                return (
                    <div>
                        <div className={`tab-pane fade show ${currentTab === 1 ? 'active' : ''}`}>
                            <label>Form Reference Number:</label>
                            <input type="text" name="formRefNo" value={formRefNo} readOnly />

                            <div>
                                <label htmlFor="title">Title:</label>

                                <select
                                    name="title"
                                    id="title"
                                    value={formValues.title}
                                    onChange={handleChange}
                                >
                                    <option value="Mr">Mr</option>
                                    <option value="Miss">Miss</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="MS">MS</option>
                                </select>
                            </div>
                            <div>
                                <label className="form-input" htmlFor="surname">Surname </label>
                                <input
                                    type="input"
                                    id="surname"
                                    name="surname"
                                    placeholder="Enter your Surname"
                                    value={formValues.surname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="form-input" htmlFor="firstName">First Name</label>
                                <input
                                    type="input"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Enter your First Name"
                                    value={formValues.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="form-input" htmlFor="otherNames">Othernames</label>
                                <input
                                    type="input"
                                    id="otherNames"
                                    name="otherNames"
                                    placeholder="Enter your Middlename"
                                    value={formValues.otherNames}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <span>Gender:</span>
                                <input type="radio"
                                    id="male"
                                    name="gender"
                                    value="M"
                                    checked={formValues.gender === 'M'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="male">Male</label>
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="F"
                                    checked={formValues.gender === 'F'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="female">Female</label>
                            </div>
                            <div>
                                <label htmlFor="maritalStatus">Marital Status:</label>

                                <select
                                    name="maritalStatus"
                                    id="maritalStatus"
                                    value={formValues.maritalStatus}
                                    onChange={handleChange}
                                    >
                                    <option value="SG">Single</option>
                                    <option value="MD">Married</option>
                                    <option value="DV">Divorced</option>
                                    <option value="WD">Widowed</option>
                                    <option value="SP">Separated</option>
                                </select>
                            </div>
                            <div>
                                <label className="form-input" htmlFor="nin">National Identity Number </label>
                                <input
                                    type="input"
                                    id="nin"
                                    name="nin"
                                    placeholder="Enter your NIN here"
                                    value={formValues.nin}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="form-input" htmlFor="phoneNumber">Phone Number </label>
                                <input
                                    type="input"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="Enter your NIN here"
                                    value={formValues.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="form-input" htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="emailAddress"
                                    placeholder="Enter your Email here"
                                    value={formValues.emailAddress}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="form-input" htmlFor="dob">Date of Birth</label>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    value={formValues.dob}
                                    onChange={handleChange}
                                />
                            </div>
                            {/*<button onClick={handleSave}>Save</button>*/}
                            {/*<button onClick={handleNext}>Next</button>*/}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <div className={`tab-pane fade show ${currentTab === 2 ? 'active' : ''}`}>
                  <div>
                    <label htmlFor="CountryOfResidence">Country of Residence:</label>

                                <select
                                    name="countryOfResidence"
                                    id="CountryOfResidence"
                                    value={formValues.countryOfResidence}
                                    onChange={handleChange}
                                >
                            <option value="00">-- Select --</option>
                            <option value="AF">AFGHANISTAN</option>
                            <option value="AX">ALAND ISLANDS</option>
                            <option value="AL">ALBANIA</option>
                            <option value="AY">ALDERNEY</option>
                            <option value="DZ">ALGERIA (EL DJAZAIR)</option>
                            <option value="AS">AMERICAN SAMOA</option>
                            <option value="AD">ANDORRA</option>
                            <option value="AO">ANGOLA</option>
                            <option value="AI">ANGUILLA</option>
                            <option value="AQ">ANTARCTICA</option>
                            <option value="AG">ANTIGUA AND BARBUDA</option>
                            <option value="AR">ARGENTINA</option>
                            <option value="AM">ARMENIA</option>
                            <option value="AW">ARUBA</option>
                            <option value="AC">ASCENSION ISLAND</option>
                            <option value="AU">AUSTRALIA</option>
                            <option value="AT">AUSTRIA</option>
                            <option value="AZ">AZERBAIJAN</option>
                            <option value="BS">BAHAMAS</option>
                            <option value="BH">BAHRAIN</option>
                            <option value="BD">BANGLADESH</option>
                            <option value="BB">BARBADOS</option>
                            <option value="BY">BELARUS</option>
                            <option value="BE">BELGIUM</option>
                            <option value="BZ">BELIZE</option>
                            <option value="BJ">BENIN</option>
                            <option value="BM">BERMUDA</option>
                            <option value="BT">BHUTAN</option>
                            <option value="BO">BOLIVIA</option>
                            <option value="BQ">BONAIRE, ST. EUSTATIUS, AND SABA</option>
                            <option value="BA">BOSNIA AND HERZEGOVINA</option>
                            <option value="BW">BOTSWANA</option>
                            <option value="BV">BOUVET ISLAND</option>
                            <option value="BR">BRAZIL</option>
                            <option value="IO">BRITISH INDIAN OCEAN TERRITORY</option>
                            <option value="BN">BRUNEI DARUSSALAM</option>
                            <option value="BG">BULGARIA</option>
                            <option value="BF">BURKINA FASO</option>
                            <option value="BI">BURUNDI</option>
                            <option value="KH">CAMBODIA</option>
                            <option value="CM">CAMEROON</option>
                            <option value="CA">CANADA</option>
                            <option value="CV">CAPE VERDE</option>
                            <option value="KY">CAYMAN ISLANDS</option>
                            <option value="CF">CENTRAL AFRICAN REPUBLIC</option>
                            <option value="TD">CHAD (TCHAD)</option>
                            <option value="CS">CHANNEL ISLANDS</option>
                            <option value="CL">CHILE</option>
                            <option value="CN">CHINA</option>
                            <option value="CX">CHRISTMAS ISLAND</option>
                            <option value="CC">COCOS (KEELING) ISLANDS</option>
                            <option value="CO">COLOMBIA</option>
                            <option value="KM">COMOROS</option>
                            <option value="CG">CONGO</option>
                            <option value="CD">CONGO DR</option>
                            <option value="CK">COOK ISLANDS</option>
                            <option value="CR">COSTA RICA</option>
                            <option value="CI">COTE D&#39;IVOIRE</option>
                            <option value="HR">CROATIA (HRVATSKA)</option>
                            <option value="CU">CUBA</option>
                            <option value="CW">CURAAIAO</option>
                            <option value="CY">CYPRUS</option>
                            <option value="CZ">CZECH REPUBLIC</option>
                            <option value="DK">DENMARK</option>
                            <option value="DJ">DJIBOUTI</option>
                            <option value="DM">DOMINICA</option>
                            <option value="DO">DOMINICAN REPUBLIC</option>
                            <option value="EC">ECUADOR</option>
                            <option value="EG">EGYPT</option>
                            <option value="SV">EL SALVADOR</option>
                            <option value="GQ">EQUATORIAL GUINEA</option>
                            <option value="ER">ERITREA</option>
                            <option value="EE">ESTONIA</option>
                            <option value="ET">ETHIOPIA</option>
                            <option value="EU">EUROPEAN UNION</option>
                            <option value="FO">FAEROE ISLANDS</option>
                            <option value="FK">FALKLAND ISLANDS (MALVINAS)</option>
                            <option value="FJ">FIJI</option>
                            <option value="FI">FINLAND</option>
                            <option value="FR">FRANCE</option>
                            <option value="GF">FRENCH GUIANA</option>
                            <option value="PF">FRENCH POLYNESIA</option>
                            <option value="TF">FRENCH SOUTHERN TERRITORIES</option>
                            <option value="GA">GABON</option>
                            <option value="GM">GAMBIA, THE</option>
                            <option value="GE">GEORGIA</option>
                            <option value="DE">GERMANY (DEUTSCHLAND)</option>
                            <option value="GH">GHANA</option>
                            <option value="GI">GIBRALTAR</option>
                            <option value="GB">GREAT BRITAIN (UNITED KINGDOM)</option>
                            <option value="GR">GREECE</option>
                            <option value="GL">GREENLAND</option>
                            <option value="GD">GRENADA</option>
                            <option value="GP">GUADELOUPE</option>
                            <option value="GU">GUAM</option>
                            <option value="GT">GUATEMALA</option>
                            <option value="GG">GUERNSEY</option>
                            <option value="GN">GUINEA</option>
                            <option value="GW">GUINEA-BISSAU</option>
                            <option value="GY">GUYANA</option>
                            <option value="HT">HAITI</option>
                            <option value="HM">HEARD ISLAND AND MCDONALD ISLANDS</option>
                            <option value="HN">HONDURAS</option>
                            <option value="HK">HONG KONG</option>
                            <option value="HU">HUNGARY</option>
                            <option value="IS">ICELAND</option>
                            <option value="IN">INDIA</option>
                            <option value="ID">INDONESIA</option>
                            <option value="IR">IRAN</option>
                            <option value="IQ">IRAQ</option>
                            <option value="IE">IRELAND</option>
                            <option value="IM">ISLE OF MAN</option>
                            <option value="IL">ISRAEL</option>
                            <option value="IT">ITALY</option>
                            <option value="JM">JAMAICA</option>
                            <option value="JP">JAPAN</option>
                            <option value="JE">JERSEY</option>
                            <option value="JO">JORDAN</option>
                            <option value="KZ">KAZAKHSTAN</option>
                            <option value="KE">KENYA</option>
                            <option value="KI">KIRIBATI</option>
                            <option value="KP">KOREA (DEMOCRATIC PEOPLES REPUBLIC OF NORTH KOREA)</option>
                            <option value="KR">KOREA (REPUBLIC OF SOUTH KOREA)</option>
                            <option value="KW">KUWAIT</option>
                            <option value="KG">KYRGYZSTAN</option>
                            <option value="LA">LAO PEOPLE&#39;S DEMOCRATIC REPUBLIC</option>
                            <option value="LV">LATVIA</option>
                            <option value="LB">LEBANON</option>
                            <option value="LS">LESOTHO</option>
                            <option value="LR">LIBERIA</option>
                            <option value="LY">LIBYA</option>
                            <option value="LI">LIECHTENSTEIN</option>
                            <option value="LT">LITHUANIA</option>
                            <option value="LU">LUXEMBOURG</option>
                            <option value="MO">MACAO</option>
                            <option value="MK">MACEDONIA</option>
                            <option value="MG">MADAGASCAR</option>
                            <option value="MW">MALAWI</option>
                            <option value="MY">MALAYSIA</option>
                            <option value="MV">MALDIVES</option>
                            <option value="ML">MALI</option>
                            <option value="MT">MALTA</option>
                            <option value="MH">MARSHALL ISLANDS</option>
                            <option value="MQ">MARTINIQUE</option>
                            <option value="MR">MAURITANIA</option>
                            <option value="MU">MAURITIUS</option>
                            <option value="YT">MAYOTTE</option>
                            <option value="MX">MEXICO</option>
                            <option value="FM">MICRONESIA</option>
                            <option value="MD">MOLDOVA</option>
                            <option value="MC">MONACO</option>
                            <option value="MN">MONGOLIA</option>
                            <option value="ME">MONTENEGRO</option>
                            <option value="MS">MONTSERRAT</option>
                            <option value="MA">MOROCCO</option>
                            <option value="MZ">MOZAMBIQUE (MOCAMBIQUE)</option>
                            <option value="MM">MYANMAR (BURMA)</option>
                            <option value="NA">NAMIBIA</option>
                            <option value="NR">NAURU</option>
                            <option value="NP">NEPAL</option>
                            <option value="NL">NETHERLANDS</option>
                            <option value="AN">NETHERLANDS ANTILLES</option>
                            <option value="NC">NEW CALEDONIA</option>
                            <option value="NZ">NEW ZEALAND</option>
                            <option value="NI">NICARAGUA</option>
                            <option value="NE">NIGER</option>
                            <option defaultValue="selected" value="NG">NIGERIA</option>
                            <option value="NU">NIUE</option>
                            <option value="NF">NORFOLK ISLAND</option>
                            <option value="MP">NORTHERN MARIANA ISLANDS</option>
                            <option value="NO">NORWAY</option>
                            <option value="OM">OMAN</option>
                            <option value="PK">PAKISTAN</option>
                            <option value="PW">PALAU</option>
                            <option value="PS">PALESTINIAN TERRITORIES</option>
                            <option value="PA">PANAMA</option>
                            <option value="PG">PAPUA NEW GUINEA</option>
                            <option value="PY">PARAGUAY</option>
                            <option value="PE">PERU</option>
                            <option value="PH">PHILIPPINES</option>
                            <option value="PN">PITCAIRN</option>
                            <option value="PL">POLAND</option>
                            <option value="PT">PORTUGAL</option>
                            <option value="PR">PUERTO RICO</option>
                            <option value="QA">QATAR</option>
                            <option value="RE">REUNION</option>
                            <option value="RO">ROMANIA</option>
                            <option value="RU">RUSSIAN FEDERATION</option>
                            <option value="RW">RWANDA</option>
                            <option value="BL">SAINT BARTHELEMY</option>
                            <option value="SH">SAINT HELENA</option>
                            <option value="KN">SAINT KITTS AND NEVIS</option>
                            <option value="LC">SAINT LUCIA</option>
                            <option value="MF">SAINT MARTIN</option>
                            <option value="PM">SAINT PIERRE AND MIQUELON</option>
                            <option value="VC">SAINT VINCENT AND THE GRENADINES</option>
                            <option value="WS">SAMOA</option>
                            <option value="SM">SAN MARINO</option>
                            <option value="ST">SAO TOME AND PRINCIPE</option>
                            <option value="SA">SAUDI ARABIA</option>
                            <option value="SN">SENEGAL</option>
                            <option value="RS">SERBIA</option>
                            <option value="SC">SEYCHELLES</option>
                            <option value="SL">SIERRA LEONE</option>
                            <option value="SG">SINGAPORE</option>
                            <option value="SX">SINT MAARTEN</option>
                            <option value="SK">SLOVAKIA</option>
                            <option value="SI">SLOVENIA</option>
                            <option value="SB">SOLOMON ISLANDS</option>
                            <option value="SO">SOMALIA</option>
                            <option value="ZA">SOUTH AFRICA</option>
                            <option value="GS">SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS</option>
                            <option value="SS">SOUTH SUDAN</option>
                            <option value="SU">SOVIET UNION</option>
                            <option value="ES">SPAIN (ESPANA)</option>
                            <option value="LK">SRI LANKA (CEYLON)</option>
                            <option value="SD">SUDAN</option>
                            <option value="SR">SURINAME</option>
                            <option value="SJ">SVALBARD AND JAN MAYEN</option>
                            <option value="SZ">SWAZILAND</option>
                            <option value="SE">SWEDEN</option>
                            <option value="CH">SWITZERLAND</option>
                            <option value="SY">SYRIAN ARAB REPUBLIC</option>
                            <option value="TW">TAIWAN</option>
                            <option value="TJ">TAJIKISTAN</option>
                            <option value="TY">TANGANYIKA</option>
                            <option value="TZ">TANZANIA</option>
                            <option value="TH">THAILAND</option>
                            <option value="TL">TIMOR-LESTE (EAST TIMOR)</option>
                            <option value="TG">TOGO</option>
                            <option value="TK">TOKELAU</option>
                            <option value="TO">TONGA</option>
                            <option value="TT">TRINIDAD AND TOBAGO</option>
                            <option value="TN">TUNISIA</option>
                            <option value="TR">TURKEY</option>
                            <option value="TM">TURKMENISTAN</option>
                            <option value="TC">TURKS AND CAICOS ISLANDS</option>
                            <option value="TV">TUVALU</option>
                            <option value="UG">UGANDA</option>
                            <option value="UA">UKRAINE</option>
                            <option value="AE">UNITED ARAB EMIRATES</option>
                            <option value="GB">UNITED KINGDOM</option>
                            <option value="US">UNITED STATES</option>
                            <option value="UM">UNITED STATES MINOR OUTLYING ISLANDS</option>
                            <option value="UY">URUGUAY</option>
                            <option value="UZ">UZBEKISTAN</option>
                            <option value="VU">VANUATU</option>
                            <option value="VA">VATICAN CITY (HOLY SEE)</option>
                            <option value="VE">VENEZUELA</option>
                            <option value="VN">VIET NAM</option>
                            <option value="VG">VIRGIN ISLANDS, BRITISH</option>
                            <option value="VI">VIRGIN ISLANDS, U.S.</option>
                            <option value="YU">YUGOSLAVIA</option>
                            <option value="WF">WALLIS AND FUTUNA</option>
                            <option value="EH">WESTERN SAHARA</option>
                            <option value="YE">YEMEN</option>
                            <option value="ZM">ZAMBIA (NORTHERN RHODESIA)</option>
                            <option value="ZN">ZANZIBAR</option>
                            <option value="ZW">ZIMBABWE</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="control-label col-md-3" htmlFor="StateOfOrigin">StateOfOrigin</label>
                                <select
                                    className="form-control"
                                    id="StateOfOrigin"
                                    name="stateofOrigin"
                                    value={formValues.stateofOrigin}
                                    onChange={handleChange}
                                >
                            <option value="00">-- Select --</option>
                            <option value="AB">ABIA</option>
                            <option value="AD">ADAMAWA</option>
                            <option value="AK">AKWA-IBOM</option>
                            <option value="AN">ANAMBRA</option>
                            <option value="BA">BAUCHI</option>
                            <option value="BY">BAYELSA</option>
                            <option value="BE">BENUE</option>
                            <option value="BO">BORNO</option>
                            <option value="CR">CROSS RIVER</option>
                            <option value="DT">DELTA</option>
                            <option value="EB">EBONYI</option>
                            <option value="ED">EDO</option>
                            <option value="EK">EKITI</option>
                            <option value="EN">ENUGU</option>
                            <option value="FC">FCT</option>
                            <option value="GB">GOMBE</option>
                            <option value="IM">IMO</option>
                            <option value="JG">JIGAWA</option>
                            <option value="KD">KADUNA</option>
                            <option value="KN">KANO</option>
                            <option value="KT">KATSINA</option>
                            <option value="KB">KEBBI</option>
                            <option value="KG">KOGI</option>
                            <option value="KW">KWARA</option>
                            <option value="LA">LAGOS</option>
                            <option value="NR">NASSARAWA</option>
                            <option value="NG">NIGER</option>
                            <option value="OG">OGUN</option>
                            <option value="OD">ONDO</option>
                            <option value="OS">OSUN</option>
                            <option value="OY">OYO</option>
                            <option value="PL">PLATEAU</option>
                            <option value="RV">RIVERS</option>
                            <option value="SO">SOKOTO</option>
                            <option value="TB">TARABA</option>
                            <option value="YB">YOBE</option>
                            <option value="ZA">ZAMFARA</option>
                        </select>
                        <span className="field-validation-valid text-danger" data-valmsg-for="StateOfOrigin" data-valmsg-replace="true"></span>
                </div>
                <div className="form-group">
                    <label className="control-label col-md-3" htmlFor="LGAOfOrigin">LGAOfOrigin</label>
                    <div className="col-md-9">
                                    <select className="form-control"
                                        id="LGAOfOrigin"
                                        name="lgaOfOrigin"
                                        value={formValues.lgaOfOrigin}
                                        onChange={handleChange}
                                    ><option value="00">-- Select --</option>
                            <option value="EZA">ABA NORTH</option>
                            <option value="ABA">ABA SOUTH</option>
                            <option value="ACH">AROCHUKWU</option>
                            <option value="BND">BENDE</option>
                            <option value="KWU">IKWUANO</option>
                            <option value="KPU">ISIALA-NGWA NORTH</option>
                            <option value="MBA">ISIALA-NGWA SOUTH</option>
                            <option value="MBL">ISUIKWUATO</option>
                            <option value="NGK">OBIOMA NGWA</option>
                            <option value="HAF">OHAFIA</option>
                            <option value="SSM">OSISIOMA</option>
                            <option value="GWB">UGWUNAGBO</option>
                            <option value="KEK">UKWA EAST</option>
                            <option value="KKE">UKWA WEST</option>
                            <option value="UMA">UMUAHIA NORTH</option>
                            <option value="APR">UMUAHIA SOUTH</option>
                            <option value="UNC">UMUNNEOCHI</option>
                            <option value="DSA">DEMSA</option>
                            <option value="FUR">FUFORE</option>
                            <option value="GAN">GANYE</option>
                            <option value="GRE">GIREI</option>
                            <option value="GMB">GOMBI</option>
                            <option value="GUY">GUYUK</option>
                            <option value="HNG">HONG</option>
                            <option value="JAD">JADA</option>
                            <option value="JMT">JIMETA</option>
                            <option value="LMR">LAMURDE</option>
                            <option value="MDG">MADAGALI</option>
                            <option value="MAH">MAIHA</option>
                            <option value="MWA">MAYO-BELWA</option>
                            <option value="MCH">MICHIKA</option>
                            <option value="MUB">MUBI-NORTH</option>
                            <option value="GYL">MUBI-SOUTH</option>
                            <option value="NUM">NUMAN</option>
                            <option value="SHG">SHELLENG</option>
                            <option value="SNG">SONG</option>
                            <option value="TNG">TOUNGO</option>
                            <option value="YLA">YOLA</option>
                            <option value="ABK">ABAK</option>
                            <option value="KRT">EASTERN-OBOLO</option>
                            <option value="KET">EKET</option>
                            <option value="KST">ESIT EKET</option>
                            <option value="AFH">ESSIEN-UDIM</option>
                            <option value="AEE">ETIM-EKPO</option>
                            <option value="ETN">ETINAM</option>
                            <option value="PNG">IBENO</option>
                            <option value="NGD">IBESIKPO-ASUTAN</option>
                            <option value="BMT">IBIONO-IBOM</option>
                            <option value="NYA">IKA</option>
                            <option value="KKN">IKONO</option>
                            <option value="KTS">IKOT-ABASI</option>
                            <option value="KTE">IKOT-EKPENE</option>
                            <option value="DRK">INI</option>
                            <option value="TTU">ITU</option>
                            <option value="ENW">MBO</option>
                            <option value="MKP">MKPAT-ENIN</option>
                            <option value="TAI">NSIT-ATAI</option>
                            <option value="AFG">NSIT-IBOM</option>
                            <option value="KTD">NSIT-UBIUM</option>
                            <option value="NTE">OBOT-AKARA</option>
                            <option value="KPD">OKOBO</option>
                            <option value="ABT">ONNA</option>
                            <option value="RNN">ORON</option>
                            <option value="KTM">ORUK ANAM</option>
                            <option value="EYF">UDUNG-UKO</option>
                            <option value="KPK">UKANEFUN</option>
                            <option value="UFG">URU OFFONG ORUKO</option>
                            <option value="DUU">URUAN</option>
                            <option value="UYY">UYO</option>
                            <option value="AGU">AGUATA</option>
                            <option value="AAH">ANAMBRA</option>
                            <option value="NZM">ANAMBRA-WEST</option>
                            <option value="NEN">ANAOCHA</option>
                            <option value="ACA">AWKA-NORTH</option>
                            <option value="AWK">AWKA-SOUTH</option>
                            <option value="NKK">AYAMELUM</option>
                            <option value="KPP">DUNUKOFIA</option>
                            <option value="ZBL">EKWUSIGO</option>
                            <option value="GDD">IDEMILI-NORTH</option>
                            <option value="JJT">IDEMILI-SOUTH</option>
                            <option value="HAL">IHIALA</option>
                            <option value="ABN">NJIKOKA</option>
                            <option value="NNE">NNEWI-NORTH</option>
                            <option value="UKP">NNEWI-SOUTH</option>
                            <option value="ATN">OGBARU</option>
                            <option value="NSH">ONITSHA-NORTH</option>
                            <option value="FGG">ONITSHA-SOUTH</option>
                            <option value="AJL">ORUMBA-NORTH</option>
                            <option value="UMZ">ORUMBA-SOUTH</option>
                            <option value="HTE">OYI</option>
                            <option value="ALK">ALKALERI</option>
                            <option value="BAU">BAUCHI</option>
                            <option value="BGR">BOGORO</option>
                            <option value="DBM">DAMBAN</option>
                            <option value="DRZ">DARAZO</option>
                            <option value="DAS">DASS</option>
                            <option value="GAM">GAMAWA</option>
                            <option value="GJW">GANJUWA</option>
                            <option value="GYD">GIADE</option>
                            <option value="TSG">ITAS/GADAU</option>
                            <option value="JMA">JAMA ARE</option>
                            <option value="KTG">KATAGUM</option>
                            <option value="KRF">KIRFI</option>
                            <option value="MSA">MISAU</option>
                            <option value="NNG">NINGI</option>
                            <option value="SHR">SHIRA</option>
                            <option value="TFB">TAFAWA-BALEWA</option>
                            <option value="TRR">TORO</option>
                            <option value="WRJ">WARJI</option>
                            <option value="ZAK">ZAKI</option>
                            <option value="BRS">BRASS</option>
                            <option value="KMR">EKEREMOR</option>
                            <option value="KMK">KOLOKUMA/OPKUMA</option>
                            <option value="NEM">NEMBE</option>
                            <option value="GBB">OGBIA</option>
                            <option value="SAG">SAGBAMA</option>
                            <option value="SPR">SOUTHERN-IJAW</option>
                            <option value="YEN">YENEGOA</option>
                            <option value="GMU">ADO</option>
                            <option value="GTU">AGATU</option>
                            <option value="GKP">APA</option>
                            <option value="BKB">BURUKU</option>
                            <option value="GBK">GBOKO</option>
                            <option value="YGJ">GUMA</option>
                            <option value="ALD">GWER-EAST</option>
                            <option value="NAK">GWER-WEST</option>
                            <option value="KAL">KATSINA-ALA</option>
                            <option value="TSE">KONSHISHA</option>
                            <option value="WDP">KWANDE</option>
                            <option value="GBG">LOGO</option>
                            <option value="MKD">MAKURDI</option>
                            <option value="BRT">OBI</option>
                            <option value="BGT">OGBADIBO</option>
                            <option value="DKP">OHIMINI</option>
                            <option value="JUX">OJU</option>
                            <option value="PKG">OKPOKWU</option>
                            <option value="TKP">OTUKPO</option>
                            <option value="WNN">TARKA</option>
                            <option value="UKM">UKUM</option>
                            <option value="SEL">USHONGO</option>
                            <option value="VDY">VANDEIKYA</option>
                            <option value="ADM">ABADAM</option>
                            <option value="ASU">ASKIRA-UBA</option>
                            <option value="BAM">BAMA</option>
                            <option value="BAY">BAYO</option>
                            <option value="BBU">BIU</option>
                            <option value="CBK">CHIBOK</option>
                            <option value="DAM">DAMBOA</option>
                            <option value="DKW">DIKWA</option>
                            <option value="GUB">GUBIO</option>
                            <option value="GZM">GUZAMALA</option>
                            <option value="GZA">GWOZA</option>
                            <option value="HWL">HAWUL</option>
                            <option value="JRE">JERE</option>
                            <option value="KGG">KAGA</option>
                            <option value="KBG">KALA/BALGE</option>
                            <option value="KDG">KONDUGA</option>
                            <option value="KWA">KUKAWA</option>
                            <option value="KWY">KWAYA-KUSAR</option>
                            <option value="MAF">MAFA</option>
                            <option value="MGM">MAGUMERI</option>
                            <option value="MAG">MAIDUGURI</option>
                            <option value="MAR">MARTE</option>
                            <option value="MBR">MOBBAR</option>
                            <option value="MNG">MONGUNU</option>
                            <option value="NGL">NGALA</option>
                            <option value="NGZ">NGANZAI</option>
                            <option value="SHN">SHANI</option>
                            <option value="TGD">ABI</option>
                            <option value="KAM">AKAMKPA</option>
                            <option value="KTA">AKPABUYO</option>
                            <option value="BKS">BAKASSI</option>
                            <option value="ABE">BEKWARA</option>
                            <option value="AKP">BIASI</option>
                            <option value="BJE">BOKI</option>
                            <option value="CAL">CALABAR-MUNICIPAL</option>
                            <option value="ANA">CALABAR-SOUTH</option>
                            <option value="EFE">ETUNK</option>
                            <option value="KMM">IKOM</option>
                            <option value="BNS">OBANLIKU</option>
                            <option value="BRA">OBUBRA</option>
                            <option value="UDU">OBUDU</option>
                            <option value="DUK">ODUKPANI</option>
                            <option value="GGJ">OGOJA</option>
                            <option value="GEP">YAKURR</option>
                            <option value="CKK">YALA</option>
                            <option value="SLK">ANIOCHA-NORTH</option>
                            <option value="GWK">ANIOCHA-SOUTH</option>
                            <option value="BMA">BOMADI</option>
                            <option value="BUR">BURUTU</option>
                            <option value="SKL">ETHIOPE-EAST</option>
                            <option value="GRA">ETHIOPE-WEST</option>
                            <option value="AGB">IKA-NORTH</option>
                            <option value="AYB">IKA-SOUTH</option>
                            <option value="DSZ">ISOKO-NORTH</option>
                            <option value="LEH">ISOKO-SOUTH</option>
                            <option value="ABH">NDOKWA-EAST</option>
                            <option value="KWC">NDOKWA-WEST</option>
                            <option value="KPE">OKPE</option>
                            <option value="ASB">OSHIMILI</option>
                            <option value="AKU">OSHIMILI-NORTH</option>
                            <option value="PTN">PATANI</option>
                            <option value="SAP">SAPELE</option>
                            <option value="ALA">UDU</option>
                            <option value="UGH">UGHELLI-NORTH</option>
                            <option value="JRT">UGHELLI-SOUTH</option>
                            <option value="BKW">UKWUANI</option>
                            <option value="EFR">UVWIE</option>
                            <option value="GBJ">WARRI-CENTRAL</option>
                            <option value="KLK">WARRI-NORTH</option>
                            <option value="WWR">WARRI-SOUTH</option>
                            <option value="AKL">ABAKALIKI</option>
                            <option value="AFK">AFIKPO-NORTH</option>
                            <option value="EDA">AFIKPO-SOUTH</option>
                            <option value="UGB">EBONYI</option>
                            <option value="EBJ">EZZA-NORTH</option>
                            <option value="NKE">EZZA-SOUTH</option>
                            <option value="CHR">IKWO</option>
                            <option value="ZLL">ISHIELU</option>
                            <option value="SKA">IVO</option>
                            <option value="BKL">IZZI</option>
                            <option value="HKW">OHAKWU</option>
                            <option value="BZR">OHAOZARA</option>
                            <option value="NCA">ONICHA</option>
                            <option value="GAR">AKOKO-EDO</option>
                            <option value="USL">EGOR</option>
                            <option value="RRU">ESAN-CENTRAL</option>
                            <option value="URM">ESAN-NORTH-EAST</option>
                            <option value="UBJ">ESAN-SOUTH-EAST</option>
                            <option value="EKP">ESAN-WEST</option>
                            <option value="FUG">ETSAKO-CENTRAL</option>
                            <option value="AGD">ETSAKO-EAST</option>
                            <option value="AUC">ETSAKO-WEST</option>
                            <option value="GUE">IGUEBEN</option>
                            <option value="DGE">IKPOBA-OKHA</option>
                            <option value="BEN">OREDO</option>
                            <option value="ABD">ORHIONMWON</option>
                            <option value="AKA">OVIA-NORTH-EAST</option>
                            <option value="GBZ">OVIA-SOUTH-WEST</option>
                            <option value="AFZ">OWAN-EAST</option>
                            <option value="SGD">OWAN-WEST</option>
                            <option value="HER">UHUNMWONDE</option>
                            <option value="ADK">ADO-EKITI</option>
                            <option value="EFY">EFON</option>
                            <option value="MUE">EKITI-EAST</option>
                            <option value="LAW">EKITI-SOUTH-WEST</option>
                            <option value="AMK">EKITI-WEST</option>
                            <option value="EMR">EMURE</option>
                            <option value="DEA">GBONYIN</option>
                            <option value="DEK">IDO-OSI</option>
                            <option value="JER">IJERO</option>
                            <option value="KER">IKERE</option>
                            <option value="KLE">IKOLE</option>
                            <option value="YEK">ILEJEMEJE</option>
                            <option value="GED">IREPODUN/IFELODUN</option>
                            <option value="SSE">ISE-ORUN</option>
                            <option value="TUN">MOBA</option>
                            <option value="YEE">OYE</option>
                            <option value="DBR">ANINRI</option>
                            <option value="AWG">AWGU</option>
                            <option value="NKW">ENUGU-EAST</option>
                            <option value="ENU">ENUGU-NORTH</option>
                            <option value="UWN">ENUGU-SOUTH</option>
                            <option value="AGW">EZEAGU</option>
                            <option value="GBD">IGBO-ETITI</option>
                            <option value="ENZ">IGBO-EZE-NORTH</option>
                            <option value="BBG">IGBO-EZE-SOUTH</option>
                            <option value="KEM">ISI-UZO</option>
                            <option value="MGL">NKANU-EAST</option>
                            <option value="AGN">NKANU-WEST</option>
                            <option value="NSK">NSUKKA</option>
                            <option value="JRV">OJI-RIVER</option>
                            <option value="BLF">UDENU</option>
                            <option value="UDD">UDI</option>
                            <option value="UMU">UZO-UWANI</option>
                            <option value="ABJ">ABAJI AREA COUNCIL</option>
                            <option value="ABC">ABUJA MUNICIPAL AREA COUNCIL</option>
                            <option value="BWR">BWARI</option>
                            <option value="GWA">GWAGWALADA</option>
                            <option value="KUJ">KUJE AREA COUNCIL</option>
                            <option value="KWL">KWALI</option>
                            <option value="AKK">AKKO</option>
                            <option value="BLG">BALANGA</option>
                            <option value="BLR">BILLIRI</option>
                            <option value="DKU">DUKKU</option>
                            <option value="FKY">FUNAKAYE</option>
                            <option value="GME">GOMBE</option>
                            <option value="KLT">KALTUNGO</option>
                            <option value="KWM">KWAMI</option>
                            <option value="NFD">NAFADA/BAJOGA</option>
                            <option value="SHM">SHOMGOM</option>
                            <option value="YDB">YAMALTU/DEBA</option>
                            <option value="ABB">ABOH-MBAISE</option>
                            <option value="AFR">AHIAZU-MBAISE</option>
                            <option value="EHM">EHIME-MBANO</option>
                            <option value="ETU">EZINIHITTE</option>
                            <option value="URU">IDEATO-NORTH</option>
                            <option value="DFB">IDEATO-SOUTH</option>
                            <option value="EKE">IHITTE/UBOMA</option>
                            <option value="KED">IKEDURU</option>
                            <option value="UML">ISIALA-MBANO</option>
                            <option value="UMD">ISU</option>
                            <option value="NWA">MBAITOLI</option>
                            <option value="NGN">NGOR-OKPALA</option>
                            <option value="UMK">NJABA</option>
                            <option value="NKR">NKWERRE</option>
                            <option value="AMG">NWANGELE</option>
                            <option value="TTK">OBOWO</option>
                            <option value="GUA">OGUTA</option>
                            <option value="EBM">OHAJI-EGBEMA</option>
                            <option value="KGE">OKIGWE</option>
                            <option value="KWE">ONUIMO</option>
                            <option value="RLU">ORLU</option>
                            <option value="AWD">ORSU</option>
                            <option value="MMA">ORU-EAST</option>
                            <option value="NGB">ORU-WEST</option>
                            <option value="WER">OWERRI-MUNICIPAL</option>
                            <option value="RRT">OWERRI-NORTH</option>
                            <option value="UMG">OWERRI-WEST</option>
                            <option value="AUY">AUYO</option>
                            <option value="BBR">BABURA</option>
                            <option value="BNW">BIRINIWA</option>
                            <option value="BKD">BIRNIN-KUDU</option>
                            <option value="BUJ">BUJI</option>
                            <option value="DUT">DUTSE</option>
                            <option value="GGW">GAGARAWA</option>
                            <option value="GRK">GARKI</option>
                            <option value="GML">GUMEL</option>
                            <option value="GRR">GURI</option>
                            <option value="GRM">GWARAM</option>
                            <option value="GWW">GWIWA</option>
                            <option value="HJA">HADEJIA</option>
                            <option value="JHN">JAHUN</option>
                            <option value="KHS">KAFIN-HAUSA</option>
                            <option value="KGM">KAUGAMA</option>
                            <option value="KZR">KAZAURE</option>
                            <option value="KKM">KIRKASAMMA</option>
                            <option value="KYW">KIYAWA</option>
                            <option value="MGR">MAIGATARI</option>
                            <option value="MMR">MALAM-MADURI</option>
                            <option value="MGA">MIGA</option>
                            <option value="RNG">RINGIM</option>
                            <option value="RRN">RONI</option>
                            <option value="STK">SULE-TANKARKAR</option>
                            <option value="TAR">TAURA</option>
                            <option value="YKS">YANKWASHI</option>
                            <option value="BNG">BIRNIN-GWARI</option>
                            <option value="KJM">CHIKUN</option>
                            <option value="GKW">GIWA</option>
                            <option value="TRK">IGABI</option>
                            <option value="KAR">IKARA</option>
                            <option value="KWB">JABA</option>
                            <option value="KAF">JEMA A</option>
                            <option value="KCH">KACHIA</option>
                            <option value="DKA">KADUNA-NORTH</option>
                            <option value="MKA">KADUNA-SOUTH</option>
                            <option value="KGK">KAGARKO</option>
                            <option value="KJR">KAJURU</option>
                            <option value="KRA">KAURA</option>
                            <option value="KRU">KAURU</option>
                            <option value="ANC">KUBAH</option>
                            <option value="HKY">KUDAN</option>
                            <option value="SNK">LERE</option>
                            <option value="MKR">MAKARFI</option>
                            <option value="SBG">SABON-GARI</option>
                            <option value="GWT">SANGA</option>
                            <option value="MGN">SOBA</option>
                            <option value="ZKW">ZANGON-KATAF</option>
                            <option value="ZAR">ZARIA</option>
                            <option value="AJG">AJINGI</option>
                            <option value="ABS">ALBASU</option>
                            <option value="BGW">BAGWAI</option>
                            <option value="BBJ">BEBEJI</option>
                            <option value="BCH">BICHI</option>
                            <option value="BNK">BUNKURE</option>
                            <option value="DAL">DALA</option>
                            <option value="DBT">DANBATTA</option>
                            <option value="DKD">DAWAKIN-KUDU</option>
                            <option value="DTF">DAWAKIN-TOFA</option>
                            <option value="DGW">DOGUWA</option>
                            <option value="FGE">FAGGE</option>
                            <option value="DSW">GABASAWA</option>
                            <option value="GAK">GARKO</option>
                            <option value="GNM">GARUN-MALLAM</option>
                            <option value="GYA">GAYA</option>
                            <option value="GZW">GEZAWA</option>
                            <option value="GWL">GWALE</option>
                            <option value="GRZ">GWARZO</option>
                            <option value="KBK">KABO</option>
                            <option value="KMC">KANO-MUNICIPAL</option>
                            <option value="KRY">KARAYE</option>
                            <option value="KBY">KIBIYA</option>
                            <option value="KKU">KIRU</option>
                            <option value="KBT">KUMBOTSO</option>
                            <option value="KNC">KUNCHI</option>
                            <option value="KUR">KURA</option>
                            <option value="MDB">MADOBI</option>
                            <option value="MKK">MAKODA</option>
                            <option value="MJB">MINJIBIR</option>
                            <option value="NSR">NASSARAWA</option>
                            <option value="RAN">RANO</option>
                            <option value="RMG">RIMIN-GADO</option>
                            <option value="RGG">ROGO</option>
                            <option value="SNN">SHANONO</option>
                            <option value="SML">SUMAILA</option>
                            <option value="TAK">TAKAI</option>
                            <option value="TRN">TARAUNI</option>
                            <option value="TFA">TOFA</option>
                            <option value="TYW">TSANYAWA</option>
                            <option value="TWD">TUDUN-WADA</option>
                            <option value="UGG">UNGOGO</option>
                            <option value="WRA">WARAWA</option>
                            <option value="WDL">WUDIL</option>
                            <option value="BKR">BAKORI</option>
                            <option value="BAT">BATAGARAWA</option>
                            <option value="BTR">BATSARI</option>
                            <option value="BRE">BAURE</option>
                            <option value="BDW">BINDAWA</option>
                            <option value="CRC">CHARANCHI</option>
                            <option value="DDM">DANDUME</option>
                            <option value="DJA">DANJA</option>
                            <option value="DMS">DAN-MUSA</option>
                            <option value="DRA">DAURA</option>
                            <option value="DTS">DUTSI</option>
                            <option value="DTM">DUTSINMA</option>
                            <option value="FSK">FASKARI</option>
                            <option value="FTA">FUNTUA</option>
                            <option value="NGW">INGAWA</option>
                            <option value="JBY">JIBIA</option>
                            <option value="KFR">KAFUR</option>
                            <option value="KAT">KAITA</option>
                            <option value="KKR">KANKARA</option>
                            <option value="KNK">KANKIA</option>
                            <option value="KTN">KATSINA</option>
                            <option value="KUF">KURFI</option>
                            <option value="KSD">KUSADA</option>
                            <option value="MDW">MAI-ADUA</option>
                            <option value="MNF">MALUMFASHI</option>
                            <option value="MAN">MANI</option>
                            <option value="MSH">MASHI</option>
                            <option value="MTZ">MATAZU</option>
                            <option value="MSW">MUSAWA</option>
                            <option value="RMY">RIMI</option>
                            <option value="SBA">SABUWA</option>
                            <option value="SFN">SAFANA</option>
                            <option value="SDM">SANDAMU</option>
                            <option value="ZNG">ZANGO</option>
                            <option value="ALR">ALEIRO</option>
                            <option value="KGW">AREWA-DANDI</option>
                            <option value="ARG">ARGUNGU</option>
                            <option value="AUG">AUGIE</option>
                            <option value="BGD">BAGUDO</option>
                            <option value="BRK">BIRNIN-KEBBI</option>
                            <option value="BNZ">BUNZA</option>
                            <option value="KMB">DANDI</option>
                            <option value="MHT">FAKAI</option>
                            <option value="GWN">GWANDU</option>
                            <option value="JEG">JEGA</option>
                            <option value="KLG">KALGO</option>
                            <option value="BES">KOKO-BESSE</option>
                            <option value="MYM">MAIYAMA</option>
                            <option value="WRR">NGASKI</option>
                            <option value="DRD">SAKABA</option>
                            <option value="SNA">SHANGA</option>
                            <option value="DKG">SURU</option>
                            <option value="RBH">WASAGU</option>
                            <option value="YLW">YAURI</option>
                            <option value="ZUR">ZURU</option>
                            <option value="DAV">ADAVI</option>
                            <option value="AJA">AJAOKUTA</option>
                            <option value="KPA">ANKPA</option>
                            <option value="BAS">BASSA</option>
                            <option value="KNA">DEKINA</option>
                            <option value="NDG">IBAJI</option>
                            <option value="DAH">IDAH</option>
                            <option value="AJK">IGALAMELA-ODOLU</option>
                            <option value="JMU">IJUMU</option>
                            <option value="KAB">KABBA/BUNU</option>
                            <option value="KKF">KOGI</option>
                            <option value="LKJ">LOKOJA</option>
                            <option value="MPA">MOPA-MURO-MOPI</option>
                            <option value="KFU">OFU</option>
                            <option value="KPF">OGORI/MAGONGO</option>
                            <option value="KKH">OKEHI</option>
                            <option value="KNE">OKENE</option>
                            <option value="LAM">OLAMABORO</option>
                            <option value="BJK">OMALA</option>
                            <option value="ERE">YAGBA-EAST</option>
                            <option value="SAN">YAGBA-WEST</option>
                            <option value="AFN">ASA</option>
                            <option value="KSB">BARUTEN</option>
                            <option value="LAF">EDU</option>
                            <option value="ARP">EKITI</option>
                            <option value="SHA">IFELODUN</option>
                            <option value="KEY">ILORIN-EAST</option>
                            <option value="FUF">ILORIN-SOUTH</option>
                            <option value="LRN">ILORIN-WEST</option>
                            <option value="MUN">IREPODUN</option>
                            <option value="WSN">ISIN</option>
                            <option value="KMA">KAIAMA</option>
                            <option value="BDU">MORO</option>
                            <option value="FFA">OFFA</option>
                            <option value="LFF">OKE-ERO</option>
                            <option value="LEM">OYUN</option>
                            <option value="PTG">PATEGI</option>
                            <option value="GGE">AGEGE</option>
                            <option value="AGL">AJEROMI-IFELODUN</option>
                            <option value="KTU">ALIMOSHO</option>
                            <option value="FST">AMUWO-ODOFIN</option>
                            <option value="APP">APAPA</option>
                            <option value="BDG">BADAGRY</option>
                            <option value="EPE">EPE</option>
                            <option value="EKY">ETI-OSA</option>
                            <option value="AKD">IBEJU-LEKKI</option>
                            <option value="FKJ">IFAKO-IJAIYE</option>
                            <option value="KJA">IKEJA</option>
                            <option value="KRD">IKORODU</option>
                            <option value="KSF">KOSOFE</option>
                            <option value="AAA">LAGOS-ISLAND</option>
                            <option value="LND">LAGOS-MAINLAND</option>
                            <option value="MUS">MUSHIN</option>
                            <option value="JJJ">OJO</option>
                            <option value="LSD">OSHODI-ISOLO</option>
                            <option value="SMK">SOMOLU</option>
                            <option value="LSR">SURULERE</option>
                            <option value="AKW">AKWANGA</option>
                            <option value="AWE">AWE</option>
                            <option value="DMA">DOMA</option>
                            <option value="KRV">KARU</option>
                            <option value="KEN">KEANA</option>
                            <option value="KEF">KEFFI</option>
                            <option value="GRU">KOKONA</option>
                            <option value="LFA">LAFIA</option>
                            <option value="NSW">NASARAWA</option>
                            <option value="NEG">NASARAWA-EGGON</option>
                            <option value="NBB">OBI</option>
                            <option value="NTT">TOTO</option>
                            <option value="WAM">WAMBA</option>
                            <option value="AGA">AGAIE</option>
                            <option value="AGR">AGWARA</option>
                            <option value="BDA">BIDA</option>
                            <option value="NBS">BORGU</option>
                            <option value="MAK">BOSSO</option>
                            <option value="MNA">CHANCHAGA</option>
                            <option value="ENG">EDATI</option>
                            <option value="LMU">GBAKO</option>
                            <option value="GWU">GURARA</option>
                            <option value="KHA">KATCHA</option>
                            <option value="KNT">KONTAGORA</option>
                            <option value="LAP">LAPAI</option>
                            <option value="KUG">LAVUN</option>
                            <option value="NAS">MAGAMA</option>
                            <option value="BMG">MARIGA</option>
                            <option value="MSG">MASHEGU</option>
                            <option value="MKW">MOKWA</option>
                            <option value="SRP">MUYA</option>
                            <option value="PAK">PAIKORO</option>
                            <option value="KAG">RAFI</option>
                            <option value="RJA">RIJAU</option>
                            <option value="KUT">SHIRORO</option>
                            <option value="SUL">SULEJA</option>
                            <option value="WSE">TAFA</option>
                            <option value="WSH">WUSHISHI</option>
                            <option value="AKM">ABEOKUTA-NORTH</option>
                            <option value="AAB">ABEOKUTA-SOUTH</option>
                            <option value="OTA">ADO-ODO/OTA</option>
                            <option value="AYE">EGBADO-NORTH</option>
                            <option value="LAR">EGBADO-SOUTH</option>
                            <option value="TRE">EWEKORO</option>
                            <option value="FFF">IFO</option>
                            <option value="GBE">IJEBU-EAST</option>
                            <option value="JGB">IJEBU-NORTH</option>
                            <option value="JNE">IJEBU-NORTH-EAST</option>
                            <option value="JBD">IJEBU-ODE</option>
                            <option value="KNN">IKENNE</option>
                            <option value="MEK">IMEKO-AFON</option>
                            <option value="PKA">IPOKIA</option>
                            <option value="WDE">OBAFEMI-OWODE</option>
                            <option value="DED">ODEDAH</option>
                            <option value="DGB">ODOGBOLU</option>
                            <option value="ABG">OGUN-WATERSIDE</option>
                            <option value="JRM">REMO-NORTH</option>
                            <option value="SMG">SHAGAMU</option>
                            <option value="SUA">AKOKO SOUTH</option>
                            <option value="KAK">AKOKO-NORTH</option>
                            <option value="ANG">AKOKO-NORTH-WEST</option>
                            <option value="KAA">AKOKO-SOUTH-EAST</option>
                            <option value="AKR">AKURE-NORTH</option>
                            <option value="JTA">AKURE-SOUTH</option>
                            <option value="GKB">ESE-ODO</option>
                            <option value="WEN">IDANRE</option>
                            <option value="FGB">IFEDORE</option>
                            <option value="GBA">IJAYE</option>
                            <option value="LEL">ILE-OLUJI-OKEIGBO</option>
                            <option value="REL">IRELE</option>
                            <option value="REE">ODIGBO</option>
                            <option value="KTP">OKITI-PUPA</option>
                            <option value="NND">ONDO WEST</option>
                            <option value="BDR">ONDO-EAST</option>
                            <option value="FFN">OSE</option>
                            <option value="WWW">OWO</option>
                            <option value="SSU">ATAKUMOSA</option>
                            <option value="PRN">ATAKUMOSA EAST</option>
                            <option value="GBN">AYEDA-ADE</option>
                            <option value="LGB">AYEDIRE</option>
                            <option value="TAN">BOLUWADURO</option>
                            <option value="RGB">BORIPE</option>
                            <option value="EDE">EDE</option>
                            <option value="EDT">EDE NORTH</option>
                            <option value="AAW">EGBEDORE</option>
                            <option value="EJG">EJIGBO</option>
                            <option value="PMD">IFE NORTH</option>
                            <option value="FTD">IFE SOUTH</option>
                            <option value="FFE">IFE-CENTRAL</option>
                            <option value="FDY">IFEDAYO</option>
                            <option value="FEE">IFE-EAST</option>
                            <option value="KNR">IFELODUN</option>
                            <option value="LRG">ILA</option>
                            <option value="LES">ILESA-EAST</option>
                            <option value="LEW">ILESA-WEST</option>
                            <option value="RLG">IREPODUN</option>
                            <option value="KRE">IREWOLE</option>
                            <option value="APM">ISOKAN</option>
                            <option value="WWD">IWO</option>
                            <option value="BKN">OBOKUN</option>
                            <option value="DTN">ODO-OTIN</option>
                            <option value="BDS">OLA OLUWA</option>
                            <option value="GNN">OLORUNDA</option>
                            <option value="JJS">ORI-ADE</option>
                            <option value="FNN">OROLU</option>
                            <option value="SGB">OSOGBO</option>
                            <option value="JBL">AFIJIO</option>
                            <option value="MNY">AKINYELE</option>
                            <option value="FMT">ATIBA</option>
                            <option value="TDE">ATIGBO</option>
                            <option value="EGB">EGBEDA</option>
                            <option value="BDJ">IBADAN-NORTH</option>
                            <option value="AGG">IBADAN-NORTH-EAST</option>
                            <option value="NRK">IBADAN-NORTH-WEST</option>
                            <option value="MAP">IBADAN-SOUTH-EAST</option>
                            <option value="LUY">IBADAN-SOUTH-WEST</option>
                            <option value="RUW">IBARAPA-CENTRAL</option>
                            <option value="AYT">IBARAPA-EAST</option>
                            <option value="IRP">IBARAPA-NORTH</option>
                            <option value="DDA">IDO</option>
                            <option value="KSH">IREPO</option>
                            <option value="SEY">ISEYIN</option>
                            <option value="TUT">ITESIWAJU</option>
                            <option value="WEL">IWAJOWA</option>
                            <option value="KEH">KAJOLA</option>
                            <option value="YNF">LAGELU</option>
                            <option value="KNH">OGBOMOSO-NORTH</option>
                            <option value="AME">OGBOMOSO-SOUTH</option>
                            <option value="AJW">OGO-OLUWA</option>
                            <option value="GBY">OLORUNSOGO</option>
                            <option value="YRE">OLUYOLE</option>
                            <option value="AKN">ONA-ARA</option>
                            <option value="GBH">ORELOPE</option>
                            <option value="KKY">ORI-IRE</option>
                            <option value="JND">OYO</option>
                            <option value="YYY">OYO-EAST</option>
                            <option value="GMD">SAKI-EAST</option>
                            <option value="SHK">SAKI-WEST</option>
                            <option value="RSD">SURULERE</option>
                            <option value="BLD">BARKIN-LADI</option>
                            <option value="BSA">BASSA</option>
                            <option value="BKK">BOKKOS</option>
                            <option value="ANW">JOS-EAST</option>
                            <option value="JJN">JOS-NORTH</option>
                            <option value="BUU">JOS-SOUTH</option>
                            <option value="DNG">KANAM</option>
                            <option value="KWK">KANKE</option>
                            <option value="LGT">LANGTANG-NORTH</option>
                            <option value="MBD">LANGTANG-SOUTH</option>
                            <option value="MGU">MANGU</option>
                            <option value="TNK">MIKANG</option>
                            <option value="PKN">PANKSHIN</option>
                            <option value="QAP">QUAN ANPAN</option>
                            <option value="RYM">RIYOM</option>
                            <option value="SHD">SHENDAM</option>
                            <option value="WAS">WASE</option>
                            <option value="ABU">ABOA/ODUAL</option>
                            <option value="AHD">AHOADA-EAST</option>
                            <option value="KNM">AHOADA-WEST</option>
                            <option value="ABM">AKUKUTORU</option>
                            <option value="NDN">ANDONI</option>
                            <option value="BGM">ASARI-TORU</option>
                            <option value="BNY">BONNY</option>
                            <option value="DEG">DEGEMA</option>
                            <option value="NCH">ELEME</option>
                            <option value="MHA">EMUOHA</option>
                            <option value="KHE">ETCHE</option>
                            <option value="KPR">GOKANA</option>
                            <option value="SKP">IKWERRE</option>
                            <option value="BRR">KHANA</option>
                            <option value="RUM">OBIA/AKPOR</option>
                            <option value="RGM">OGBA-EGBEMA-NDONI</option>
                            <option value="GGU">OGU/BOLO</option>
                            <option value="KRK">OKIRIKA</option>
                            <option value="BER">OMUMA</option>
                            <option value="PBT">OPOBO/NKORO</option>
                            <option value="AFM">OYIGBO</option>
                            <option value="PHC">PORT-HARCOURT</option>
                            <option value="SKN">TAI</option>
                            <option value="BJN">BINJI</option>
                            <option value="DBN">BODINGA</option>
                            <option value="DGS">DANGE-SHUNI</option>
                            <option value="GAD">GADA</option>
                            <option value="GRY">GORONYO</option>
                            <option value="BLE">GUDU</option>
                            <option value="GWD">GWADABAWA</option>
                            <option value="LLA">ILLELA</option>
                            <option value="SAA">ISA</option>
                            <option value="KBE">KEBBE</option>
                            <option value="KWR">KWARE</option>
                            <option value="RBA">RABAH</option>
                            <option value="SBN">SABON-BIRNI</option>
                            <option value="SGR">SHAGARI</option>
                            <option value="SLM">SILAME</option>
                            <option value="SKK">SOKOTO-NORTH</option>
                            <option value="SRZ">SOKOTO-SOUTH</option>
                            <option value="TBW">TAMBAWAL</option>
                            <option value="TGZ">TANGAZA</option>
                            <option value="TRT">TURETA</option>
                            <option value="WMK">WAMAKKO</option>
                            <option value="WRN">WURNO</option>
                            <option value="YYB">YABO</option>
                            <option value="ARD">ARDO-KOLA</option>
                            <option value="BAL">BALI</option>
                            <option value="DGA">DONGA</option>
                            <option value="GKA">GASHAKA</option>
                            <option value="GAS">GASSOL</option>
                            <option value="BBB">IBI</option>
                            <option value="JAL">JALINGO</option>
                            <option value="KLD">KARIM-LAMIDO</option>
                            <option value="KRM">KURMI</option>
                            <option value="LAU">LAU</option>
                            <option value="SDA">SARDAUNA</option>
                            <option value="TTM">TAKUM</option>
                            <option value="USS">USSA</option>
                            <option value="WKR">WUKARI</option>
                            <option value="YRR">YORRO</option>
                            <option value="TZG">ZING</option>
                            <option value="GSH">BADE</option>
                            <option value="DPH">BOSARI</option>
                            <option value="DTR">DAMATURU</option>
                            <option value="FKA">FIKA</option>
                            <option value="FUN">FUNE</option>
                            <option value="GDM">GEIDAM</option>
                            <option value="GJB">GUJBA</option>
                            <option value="GLN">GULANI</option>
                            <option value="JAK">JAKUSKO</option>
                            <option value="KRS">KARASUWA</option>
                            <option value="MCN">MACHINA</option>
                            <option value="NNR">NANGERE</option>
                            <option value="NGU">NGURU</option>
                            <option value="PKM">POTISKUM</option>
                            <option value="TMW">TARMUA</option>
                            <option value="YUN">YUNUSARI</option>
                            <option value="YSF">YUSUFARI</option>
                            <option value="ANK">ANKA</option>
                            <option value="BKA">BAKURA</option>
                            <option value="BMJ">BIRNIN MAGAJI</option>
                            <option value="BKM">BUKKUYUM</option>
                            <option value="BUG">BUNGUDU</option>
                            <option value="GMM">GUMI</option>
                            <option value="GUS">GUSAU</option>
                            <option value="KRN">KAURA-NAMODA</option>
                            <option value="MRD">MARADUN</option>
                            <option value="MRR">MARU</option>
                            <option value="SKF">SHINKAFI</option>
                            <option value="TMA">TALATA-MAFARA</option>
                            <option value="TSF">TSAFE</option>
                            <option value="ZRM">ZURMI</option>
                        </select>
                        {/*<span className="field-validation-valid text-danger" data-valmsg-for="LGAOfOrigin" data-valmsg-replace="true"></span>*/}
                    </div>
                </div>

                <div>
                            <label className="form-input" htmlFor="homenumber">Home Number/Name </label>
                    <input
                        type="input"
                        id="homenumber"
                        name="homeNumber"
                        placeholder="Enter your House Number here"
                        value={formValues.homeNumber}
                        onChange={handleChange}
                    />
                </div>
                <div>
                            <label className="form-input" htmlFor="streetname">Street Name </label>
                    <input
                        type="input"
                        id="streetname"
                        name="streetNumber"
                        placeholder="Enter your Street here"
                        value={formValues.streetNumber}
                        onChange={handleChange}
                    />
                </div>
                <div>
                            <label className="form-input" htmlFor="city">City/Town</label>
                    <input
                        type="input"
                        id="city"
                        name="cityTown"
                        placeholder="Enter your City/Town here"
                        value={formValues.cityTown}
                        onChange={handleChange}
                    />
                            </div>
                </div>
              </div>

                );
            case 3:
                return (

                    <div>
                        <div className={`tab-pane fade show ${currentTab === 3 ? 'active' : ''}`}>
                            <div>
                                <br />
                                <h4>Employer Information</h4>
                                <hr />
                                <div className="form-horizontal">
                                    <div className="form-group">
                                        <label className="control-label col-md-3" htmlFor="EmployerSector">EmployerSector</label>
                                        <div className="col-md-9">
                                            <select
                                                className="form-control"
                                                id="EmployerSector"
                                                name="EmployerSector"
                                                value={formValues.EmployerSector}
                                                onChange={handleChange}
                                            ><option value="00">-- Select --</option>
                                                <option value="PU">Public Sector(Fed &amp; State MDAs)</option>
                                                <option value="PR">Private Sector</option>
                                                <option value="CB">Cross Border</option>
                                                <option value="MP">Micro Pensions</option>
                                            </select>
                                            <span className="field-validation-valid text-danger"
                                                data-valmsg-for="EmployerSector"
                                                data-valmsg-replace="true"></span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-md-3" htmlFor="EmployerCode">EmployerCode</label>
                                        <div className="col-md-9">
                                            <select
                                                className="form-control chosen-select"
                                                id="EmployerCode"
                                                name="EmployerCode"
                                                value={formValues.EmployerCode}
                                                onChange={handleChange}
                                            >
                                                <option value="00">-- Select --</option>
                                                <option value="PR0000052778">
                                                    A.A.M. BELLO GLOBAL CONCEPT LTD (PR0000052778)</option>
                                                <option value="PR0000052691">
                                                    RELIANCE MEDICAL &amp; SURGICAL EQUIPMENT LIMITED (PR0000052691)</option>
                                                <option value="PR0000054382">
                                                    KOROBOU INTERNATIONAL LTD (PR0000054382)</option>
                                                <option value="PR0000063391">
                                                    TEAMSOURCE TECHNOLOGIES LIMITED (PR0000063391)</option>
                                                <option value="PR0000745609">
                                                    U CONNECT INVESTMENT LIMITED (PR0000745609)</option>
                                                <option value="PR0000062091">  FUTIHEN INTERNATIONAL INVESTMENT LIMITED (PR0000062091)</option>
                                                <option value="PR0000053003"> ACCENT AND ROVER LIMITED (PR0000053003)</option>
                                                <option value="PR0000057315 "> AFEIDIA PROJECTI NIGERIA LIMITED (PR0000057315 )</option>
                                                <option value="PR0000321657"> AMMASCO INTERNATIONAL LIMITED (PR0000321657)</option>
                                                <option value="STKBLGA00021">ZURU LOCAL GOVERNMENT AREA (STKBLGA00021)</option>
                                            </select>
                                            <span className="field-validation-valid text-danger" data-valmsg-for="EmployerCode" data-valmsg-replace="true"></span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-md-3" htmlFor="EmployerCountry">EmployerCountry</label>
                                        <div className="col-md-9">
                                            <select className="form-control"
                                                id="EmployerCountry"
                                                name="EmployerCountry"
                                                value={formValues.EmployerCountry}
                                                onChange={handleChange}
                                            ><option value="00">-- Select --</option>
                                                <option value="AF">AFGHANISTAN</option>
                                                <option value="AX">ALAND ISLANDS</option>
                                                <option value="AL">ALBANIA</option>
                                                <option value="AY">ALDERNEY</option>
                                                <option value="DZ">ALGERIA (EL DJAZAIR)</option>
                                                <option value="AS">AMERICAN SAMOA</option>
                                                <option value="AD">ANDORRA</option>
                                                <option value="AO">ANGOLA</option>
                                            </select>
                                            <span className="field-validation-valid text-danger" data-valmsg-for="EmployerCountry" data-valmsg-replace="true"></span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-md-3" htmlFor="EmployerState">EmployerState</label>
                                        <div className="col-md-9">
                                            <select className="form-control"
                                                id="EmployerState"
                                                name="EmployerState"
                                                value={formValues.EmployerState}
                                                onChange={handleChange}
                                            ><option value="00">-- Select --</option>
                                                <option value="AB">ABIA</option>
                                                <option value="AD">ADAMAWA</option>
                                                <option value="AK">AKWA-IBOM</option>
                                                <option value="AN">ANAMBRA</option>
                                                <option value="BA">BAUCHI</option>
                                                <option value="BY">BAYELSA</option>
                                                <option value="BE">BENUE</option>
                                                <option value="BO">BORNO</option>
                                                <option value="CR">CROSS RIVER</option>
                                                <option value="DT">DELTA</option>
                                                <option value="EB">EBONYI</option>
                                                <option value="ED">EDO</option>
                                                <option value="EK">EKITI</option>
                                                <option value="EN">ENUGU</option>
                                                <option value="FC">FCT</option>
                                                <option value="GB">GOMBE</option>
                                                <option value="IM">IMO</option>
                                                <option value="JG">JIGAWA</option>
                                                <option value="KD">KADUNA</option>
                                                <option value="KN">KANO</option>
                                                <option value="KT">KATSINA</option>
                                                <option value="KB">KEBBI</option>
                                                <option value="KG">KOGI</option>
                                                <option value="KW">KWARA</option>
                                                <option value="LA">LAGOS</option>
                                                <option value="NR">NASSARAWA</option>
                                                <option value="NG">NIGER</option>
                                                <option value="OG">OGUN</option>
                                                <option value="OD">ONDO</option>
                                                <option value="OS">OSUN</option>
                                                <option value="OY">OYO</option>
                                                <option value="PL">PLATEAU</option>
                                                <option value="RV">RIVERS</option>
                                                <option value="SO">SOKOTO</option>
                                                <option value="TB">TARABA</option>
                                                <option value="YB">YOBE</option>
                                                <option value="ZA">ZAMFARA</option>
                                            </select>
                                            <span className="field-validation-valid text-danger" data-valmsg-for="EmployerState" data-valmsg-replace="true"></span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-md-3" htmlFor="StateofPostin">StateofPosting</label>
                                        <div className="col-md-9">
                                            <select className="form-control"
                                                id="StateOfPosting"
                                                name="StateOfPosting"
                                                value={formValues.StateOfPosting}
                                                onChange={handleChange}
                                            ><option value="00">-- Select --</option>
                                                <option value="AB">ABIA</option>
                                                <option value="AD">ADAMAWA</option>
                                                <option value="AK">AKWA-IBOM</option>
                                                <option value="AN">ANAMBRA</option>
                                                <option value="BA">BAUCHI</option>
                                                <option value="BY">BAYELSA</option>
                                                <option value="BE">BENUE</option>
                                                <option value="BO">BORNO</option>
                                                <option value="CR">CROSS RIVER</option>
                                                <option value="DT">DELTA</option>
                                                <option value="EB">EBONYI</option>
                                                <option value="ED">EDO</option>
                                                <option value="EK">EKITI</option>
                                                <option value="EN">ENUGU</option>
                                                <option value="FC">FCT</option>
                                                <option value="GB">GOMBE</option>
                                                <option value="IM">IMO</option>
                                                <option value="JG">JIGAWA</option>
                                                <option value="KD">KADUNA</option>
                                                <option value="KN">KANO</option>
                                                <option value="KT">KATSINA</option>
                                                <option value="KB">KEBBI</option>
                                                <option value="KG">KOGI</option>
                                                <option value="KW">KWARA</option>
                                                <option value="LA">LAGOS</option>
                                                <option value="NR">NASSARAWA</option>
                                                <option value="NG">NIGER</option>
                                                <option value="OG">OGUN</option>
                                                <option value="OD">ONDO</option>
                                                <option value="OS">OSUN</option>
                                                <option value="OY">OYO</option>
                                                <option value="PL">PLATEAU</option>
                                                <option value="RV">RIVERS</option>
                                                <option value="SO">SOKOTO</option>
                                                <option value="TB">TARABA</option>
                                                <option value="YB">YOBE</option>
                                                <option value="ZA">ZAMFARA</option>
                                            </select>
                                            <span className="field-validation-valid text-danger" data-valmsg-for="EmployerState" data-valmsg-replace="true"></span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-md-3" htmlFor="EmployerLGA">EmployerLGA</label>
                                        <div className="col-md-9">
                                            <select className="form-control"
                                                id="EmployerLGA"
                                                name="EmployerLGA"
                                                value={formValues.EmployerLGA}
                                                onChange={handleChange}
                                            ><option value="00">-- Select --</option>
                                                <option value="EZA">ABA NORTH</option>
                                                <option value="ABA">ABA SOUTH</option>
                                                <option value="ACH">AROCHUKWU</option>
                                                <option value="BND">BENDE</option>
                                                <option value="KWU">IKWUANO</option>
                                                <option value="KPU">ISIALA-NGWA NORTH</option>
                                                <option value="MBA">ISIALA-NGWA SOUTH</option>
                                                <option value="MBL">ISUIKWUATO</option>
                                                <option value="NGK">OBIOMA NGWA</option>
                                                <option value="HAF">OHAFIA</option>
                                                <option value="SSM">OSISIOMA</option>
                                                <option value="GWB">UGWUNAGBO</option>
                                                <option value="KEK">UKWA EAST</option>
                                                <option value="KKE">UKWA WEST</option>
                                                <option value="UMA">UMUAHIA NORTH</option>
                                                <option value="APR">UMUAHIA SOUTH</option>
                                                <option value="UNC">UMUNNEOCHI</option>
                                                <option value="DSA">DEMSA</option>
                                                <option value="FUR">FUFORE</option>
                                            </select>
                                            <span className="field-validation-valid text-danger" data-valmsg-for="EmployerLGA" data-valmsg-replace="true"></span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-md-3" htmlFor="EmployerHouseNoOrName">EmployerHouseNoOrName</label>
                                        <div
                                            className="col-md-9">
                                            <input className="form-control text-box single-line"
                                                data-val="true"
                                                data-val-maxlength="String too long"
                                                data-val-maxlength-max="40"
                                                id="EmployerHouseNoOrName"
                                                name="EmployerHouseNoOrName"
                                                style={{ textTransform: 'uppercase' }}
                                                type="text"
                                                value={formValues.EmployerHouseNoOrName}
                                                onChange={handleChange}
                                            />
                                            <span className="field-validation-valid text-danger" data-valmsg-for="EmployerHouseNoOrName" data-valmsg-replace="true"></span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-md-3" htmlFor="EmployerStreetName">EmployerStreetName</label>
                                        <div className="col-md-9">
                                            <input className="form-control text-box single-line"
                                                data-val="true"
                                                data-val-maxlength="String too long"
                                                data-val-maxlength-max="40"
                                                id="EmployerStreetName"
                                                name="EmployerStreetName"
                                                style={{ textTransform: 'uppercase' }}
                                                type="text"
                                                value={formValues.EmployerStreetName}
                                                onChange={handleChange}
                                            />
                                            <span className="field-validation-valid text-danger" data-valmsg-for="EmployerStreetName" data-valmsg-replace="true"></span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-md-3" htmlFor="EmployerCityTownVillage">City/Town</label>
                                        <div className="col-md-9">
                                            <input className="form-control text-box single-line"
                                                id="EmployerCityTownVillage"
                                                name="EmployerCityTownVillage"
                                                style={{ textTransform: 'uppercase' }}
                                                type="text"
                                                value={formValues.EmployerCityTownVillage}
                                                onChange={handleChange}
                                            />
                                            <span className="field-validation-valid text-danger" data-valmsg-for="EmployerCityTownVillage" data-valmsg-replace="true"></span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-md-3" htmlFor="DateOfCurrentEmployment">DateOfCurrentEmployment</label>
                                        <div className="col-md-9">
                                            <input className="form-control text-box single-line"
                                                data-val="true" data-val-date="The field DateOfCurrentEmployment must be a date."
                                                data-val-required="The DateOfCurrentEmployment field is required."
                                                id="DateOfCurrentEmployment" name="DateOfCurrentEmployment"
                                                type="date"
                                                value={formValues.DateOfCurrentEmployment}
                                                onChange={handleChange}
                                            />
                                            <span className="field-validation-valid text-danger" data-valmsg-for="DateOfCurrentEmployment" data-valmsg-replace="true"></span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label col-md-3" htmlFor="DateOfFirstEmployment">DateOfFirstEmployment</label>
                                        <div className="col-md-9">
                                            <input className="form-control text-box single-line"
                                                data-val="true"
                                                data-val-date="The field DateOfFirstEmployment must be a date."
                                                data-val-required="The DateOfFirstEmployment field is required."
                                                id="DateOfFirstEmployment" name="DateOfFirstEmployment"
                                                type="date"
                                                value={formValues.DateOfFirstEmployment}
                                                onChange={handleChange}
                                            />
                                            <span className="field-validation-valid text-danger" data-valmsg-for="DateOfFirstEmployment" data-valmsg-replace="true"></span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-offset-3 col-md-9">
                                            <input type="submit" value="Save" name="SaveEmployer" className="btn btn-primary btn-block" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case 4:
                return (

                    <div>
                        <div className={`tab-pane fade show ${currentTab === 4 ? 'active' : ''}`}>

                        <div>
                            <br />
                            <h4>Next of Kin (NOK)</h4>
                            <hr />
                                <div className="form-horizontal">
                                    <div>
                                        <label htmlFor="NOKTitle">NOK Title:</label>

                                        <select
                                            name="NOKTitle"
                                            id="NOKTitle"
                                            value={formValues.NOKTitle}
                                            onChange={handleChange}
                                        >
                                            <option value="Mr">Mr</option>
                                            <option value="Miss">Miss</option>
                                            <option value="Mrs">Mrs</option>
                                            <option value="MS">MS</option>
                                        </select>
                                    </div>
                                <div className="form-group">
                                    <label className="control-label col-md-3" htmlFor="NOKFirstName">NOK FirstName</label>
                                    <div className="col-md-9">
                                            <input className="form-control text-box single-line"
                                                id="NOKFirstName"
                                                name="NOKFirstName"
                                                style={{ textTransform: 'uppercase' }}
                                                type="text"
                                                value={formValues.NOKFirstName}  // Update to use state value
                                                onChange={handleChange}  // Add onChange handler
                                            />
                                        <span className="field-validation-valid text-danger" data-valmsg-for="NOKFirstName" data-valmsg-replace="true"></span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3" htmlFor="NOKLastName">NOK LastName</label>
                                    <div className="col-md-9">
                                        <input className="form-control text-box single-line" id="NOKLastName"
                                                name="NOKLastName"
                                                style={{ textTransform: 'uppercase' }}
                                                type="text"
                                                value={formValues.NOKLastName}  // Update to use state value
                                                onChange={handleChange}
                                            />
                                        <span className="field-validation-valid text-danger" data-valmsg-for="NOKLastName" data-valmsg-replace="true"></span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3" htmlFor="NOKMiddlename">NOK MiddleName</label>
                                    <div className="col-md-9">
                                        <input className="form-control text-box single-line"
                                            id="NOKMiddlename"
                                            name="NOKMiddlename"
                                            style={{ textTransform: 'uppercase' }}
                                            type="text"
                                                value={formValues.NOKMiddlename}  // Update to use state value
                                            onChange={handleChange}
                                        />
                                        <span className="field-validation-valid text-danger" data-valmsg-for="NOKMiddlename" data-valmsg-replace="true"></span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3" htmlFor="NOKGender">NOK Gender</label>
                                    <div className="col-md-9">
                                            <select className="form-control"
                                                id="NOKGender"
                                                name="NOKGender"
                                                value={formValues.NOKGender}
                                                onChange={handleChange}
                                            >

                                            <option value="00">-- Select --</option>
                                            <option value="M">Male (M)</option>
                                            <option value="F">Female (F)</option>
                                        </select>
                                        <span className="field-validation-valid text-danger" data-valmsg-for="NOKGender" data-valmsg-replace="true"></span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3" htmlFor="NOKRelationship">Relationship</label>
                                    <div className="col-md-9">
                                            <input className="form-control text-box single-line"
                                                id="NOKRelationship"
                                                name="NOKRelationship"
                                                style={{ textTransform: 'uppercase' }}
                                                type="text"
                                                value={formValues.NOKRelationship}
                                                onChange={handleChange}
                                           
                                        />
                                        <span className="field-validation-valid text-danger" data-valmsg-for="NOKRelationship" data-valmsg-replace="true"></span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3" htmlFor="NOKMobile">NOK Mobile</label>
                                    <div className="col-md-9">
                                        <input className="form-control text-box single-line"
                                            id="NOKMobile"
                                            name="NOKMobile"
                                            type="text"
                                            value={formValues.NOKMobile}
                                            onChange={handleChange}
                                        />
                                        <span className="field-validation-valid text-danger" data-valmsg-for="NOKMobile" data-valmsg-replace="true"></span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3" htmlFor="NOKEmail">NOK Email</label>
                                    <div className="col-md-9">
                                        <input className="form-control text-box single-line"
                                            id="NOKEmail"
                                            name="NOKEmail"
                                            type="text"
                                            value={formValues.NOKEmail}
                                            onChange={handleChange}
                                        />
                                        <span className="field-validation-valid text-danger" data-valmsg-for="NOKEmail" data-valmsg-replace="true"></span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3" htmlFor="NOKCountryOfResidence">NOK CountryOfResidence</label>
                                    <div className="col-md-9">
                                            <select className="form-control"
                                                id="NOKCountryOfResidence"
                                                name="NOKCountryOfResidence"
                                                value={formValues.NOKCountryOfResidence}
                                                onChange={handleChange}
                                            ><option value="00">-- Select --</option>
                                            <option value="AF">AFGHANISTAN</option>
                                            <option value="AX">ALAND ISLANDS</option>
                                            <option value="AL">ALBANIA</option>
                                            <option value="AY">ALDERNEY</option>
                                            <option value="DZ">ALGERIA (EL DJAZAIR)</option>
                                            <option value="AS">AMERICAN SAMOA</option>
                                            <option value="AD">ANDORRA</option>
                                            <option value="AO">ANGOLA</option>
                                            <option value="AI">ANGUILLA</option>
                                            <option value="AQ">ANTARCTICA</option>
                                            <option value="AG">ANTIGUA AND BARBUDA</option>
                                            <option value="AR">ARGENTINA</option>
                                            <option value="AM">ARMENIA</option>
                                            <option value="AW">ARUBA</option>
                                            <option value="AC">ASCENSION ISLAND</option>
                                            <option value="AU">AUSTRALIA</option>
                                            <option value="AT">AUSTRIA</option>
                                            <option value="AZ">AZERBAIJAN</option>
                                            <option value="BS">BAHAMAS</option>
                                            <option value="BH">BAHRAIN</option>
                                            <option value="BD">BANGLADESH</option>
                                            <option value="BB">BARBADOS</option>
                                            <option value="BY">BELARUS</option>
                                            <option value="BE">BELGIUM</option>
                                            <option value="BZ">BELIZE</option>
                                            <option value="BJ">BENIN</option>
                                            <option value="BM">BERMUDA</option>
                                            <option value="BT">BHUTAN</option>
                                            <option value="BO">BOLIVIA</option>
                                            <option value="BQ">BONAIRE, ST. EUSTATIUS, AND SABA</option>
                                            <option value="BA">BOSNIA AND HERZEGOVINA</option>
                                            <option value="BW">BOTSWANA</option>
                                            <option value="BV">BOUVET ISLAND</option>
                                            <option value="BR">BRAZIL</option>
                                            <option value="IO">BRITISH INDIAN OCEAN TERRITORY</option>
                                            <option value="BN">BRUNEI DARUSSALAM</option>
                                            <option value="BG">BULGARIA</option>
                                            <option value="BF">BURKINA FASO</option>
                                            <option value="BI">BURUNDI</option>
                                            <option value="KH">CAMBODIA</option>
                                            <option value="CM">CAMEROON</option>
                                            <option value="CA">CANADA</option>
                                            <option value="CV">CAPE VERDE</option>
                                            <option value="KY">CAYMAN ISLANDS</option>
                                            <option value="CF">CENTRAL AFRICAN REPUBLIC</option>
                                            <option value="TD">CHAD (TCHAD)</option>
                                            <option value="CS">CHANNEL ISLANDS</option>
                                            <option value="CL">CHILE</option>
                                            <option value="CN">CHINA</option>
                                            <option value="CX">CHRISTMAS ISLAND</option>
                                            <option value="CC">COCOS (KEELING) ISLANDS</option>
                                            <option value="CO">COLOMBIA</option>
                                            <option value="KM">COMOROS</option>
                                            <option value="CG">CONGO</option>
                                            <option value="CD">CONGO DR</option>
                                            <option value="CK">COOK ISLANDS</option>
                                            <option value="CR">COSTA RICA</option>
                                            <option value="CI">COTE D&#39;IVOIRE</option>
                                            <option value="HR">CROATIA (HRVATSKA)</option>
                                            <option value="CU">CUBA</option>
                                            <option value="CW">CURAAIAO</option>
                                            <option value="CY">CYPRUS</option>
                                            <option value="CZ">CZECH REPUBLIC</option>
                                            <option value="DK">DENMARK</option>
                                            <option value="DJ">DJIBOUTI</option>
                                            <option value="DM">DOMINICA</option>
                                            <option value="DO">DOMINICAN REPUBLIC</option>
                                            <option value="EC">ECUADOR</option>
                                            <option value="EG">EGYPT</option>
                                            <option value="SV">EL SALVADOR</option>
                                            <option value="GQ">EQUATORIAL GUINEA</option>
                                            <option value="ER">ERITREA</option>
                                            <option value="EE">ESTONIA</option>
                                            <option value="ET">ETHIOPIA</option>
                                            <option value="EU">EUROPEAN UNION</option>
                                            <option value="FO">FAEROE ISLANDS</option>
                                            <option value="FK">FALKLAND ISLANDS (MALVINAS)</option>
                                            <option value="FJ">FIJI</option>
                                            <option value="FI">FINLAND</option>
                                            <option value="FR">FRANCE</option>
                                            <option value="GF">FRENCH GUIANA</option>
                                            <option value="PF">FRENCH POLYNESIA</option>
                                            <option value="TF">FRENCH SOUTHERN TERRITORIES</option>
                                            <option value="GA">GABON</option>
                                            <option value="GM">GAMBIA, THE</option>
                                            <option value="GE">GEORGIA</option>
                                            <option value="DE">GERMANY (DEUTSCHLAND)</option>
                                            <option value="GH">GHANA</option>
                                            <option value="GI">GIBRALTAR</option>
                                            <option value="GB">GREAT BRITAIN (UNITED KINGDOM)</option>
                                            <option value="GR">GREECE</option>
                                            <option value="GL">GREENLAND</option>
                                            <option value="GD">GRENADA</option>
                                            <option value="GP">GUADELOUPE</option>
                                            <option value="GU">GUAM</option>
                                            <option value="GT">GUATEMALA</option>
                                            <option value="GG">GUERNSEY</option>
                                            <option value="GN">GUINEA</option>
                                            <option value="GW">GUINEA-BISSAU</option>
                                            <option value="GY">GUYANA</option>
                                            <option value="HT">HAITI</option>
                                            <option value="HM">HEARD ISLAND AND MCDONALD ISLANDS</option>
                                            <option value="HN">HONDURAS</option>
                                            <option value="HK">HONG KONG</option>
                                            <option value="HU">HUNGARY</option>
                                            <option value="IS">ICELAND</option>
                                            <option value="IN">INDIA</option>
                                            <option value="ID">INDONESIA</option>
                                            <option value="IR">IRAN</option>
                                            <option value="IQ">IRAQ</option>
                                            <option value="IE">IRELAND</option>
                                            <option value="IM">ISLE OF MAN</option>
                                            <option value="IL">ISRAEL</option>
                                            <option value="IT">ITALY</option>
                                            <option value="JM">JAMAICA</option>
                                            <option value="JP">JAPAN</option>
                                            <option value="JE">JERSEY</option>
                                            <option value="JO">JORDAN</option>
                                            <option value="KZ">KAZAKHSTAN</option>
                                            <option value="KE">KENYA</option>
                                            <option value="KI">KIRIBATI</option>
                                            <option value="KP">KOREA (DEMOCRATIC PEOPLES REPUBLIC OF NORTH KOREA)</option>
                                            <option value="KR">KOREA (REPUBLIC OF SOUTH KOREA)</option>
                                            <option value="KW">KUWAIT</option>
                                            <option value="KG">KYRGYZSTAN</option>
                                            <option value="LA">LAO PEOPLE&#39;S DEMOCRATIC REPUBLIC</option>
                                            <option value="LV">LATVIA</option>
                                            <option value="LB">LEBANON</option>
                                            <option value="LS">LESOTHO</option>
                                            <option value="LR">LIBERIA</option>
                                            <option value="LY">LIBYA</option>
                                            <option value="LI">LIECHTENSTEIN</option>
                                            <option value="LT">LITHUANIA</option>
                                            <option value="LU">LUXEMBOURG</option>
                                            <option value="MO">MACAO</option>
                                            <option value="MK">MACEDONIA</option>
                                            <option value="MG">MADAGASCAR</option>
                                            <option value="MW">MALAWI</option>
                                            <option value="MY">MALAYSIA</option>
                                            <option value="MV">MALDIVES</option>
                                            <option value="ML">MALI</option>
                                            <option value="MT">MALTA</option>
                                            <option value="MH">MARSHALL ISLANDS</option>
                                            <option value="MQ">MARTINIQUE</option>
                                            <option value="MR">MAURITANIA</option>
                                            <option value="MU">MAURITIUS</option>
                                            <option value="YT">MAYOTTE</option>
                                            <option value="MX">MEXICO</option>
                                            <option value="FM">MICRONESIA</option>
                                            <option value="MD">MOLDOVA</option>
                                            <option value="MC">MONACO</option>
                                            <option value="MN">MONGOLIA</option>
                                            <option value="ME">MONTENEGRO</option>
                                            <option value="MS">MONTSERRAT</option>
                                            <option value="MA">MOROCCO</option>
                                            <option value="MZ">MOZAMBIQUE (MOCAMBIQUE)</option>
                                            <option value="MM">MYANMAR (BURMA)</option>
                                            <option value="NA">NAMIBIA</option>
                                            <option value="NR">NAURU</option>
                                            <option value="NP">NEPAL</option>
                                            <option value="NL">NETHERLANDS</option>
                                            <option value="AN">NETHERLANDS ANTILLES</option>
                                            <option value="NC">NEW CALEDONIA</option>
                                            <option value="NZ">NEW ZEALAND</option>
                                            <option value="NI">NICARAGUA</option>
                                            <option value="NE">NIGER</option>
                                            <option defaultValue="selected" value="NG">NIGERIA</option>
                                            <option value="NU">NIUE</option>
                                            <option value="NF">NORFOLK ISLAND</option>
                                            <option value="MP">NORTHERN MARIANA ISLANDS</option>
                                            <option value="NO">NORWAY</option>
                                            <option value="OM">OMAN</option>
                                            <option value="PK">PAKISTAN</option>
                                            <option value="PW">PALAU</option>
                                            <option value="PS">PALESTINIAN TERRITORIES</option>
                                            <option value="PA">PANAMA</option>
                                            <option value="PG">PAPUA NEW GUINEA</option>
                                            <option value="PY">PARAGUAY</option>
                                            <option value="PE">PERU</option>
                                            <option value="PH">PHILIPPINES</option>
                                            <option value="PN">PITCAIRN</option>
                                            <option value="PL">POLAND</option>
                                            <option value="PT">PORTUGAL</option>
                                            <option value="PR">PUERTO RICO</option>
                                            <option value="QA">QATAR</option>
                                            <option value="RE">REUNION</option>
                                            <option value="RO">ROMANIA</option>
                                            <option value="RU">RUSSIAN FEDERATION</option>
                                            <option value="RW">RWANDA</option>
                                            <option value="BL">SAINT BARTHELEMY</option>
                                            <option value="SH">SAINT HELENA</option>
                                            <option value="KN">SAINT KITTS AND NEVIS</option>
                                            <option value="LC">SAINT LUCIA</option>
                                            <option value="MF">SAINT MARTIN</option>
                                            <option value="PM">SAINT PIERRE AND MIQUELON</option>
                                            <option value="VC">SAINT VINCENT AND THE GRENADINES</option>
                                            <option value="WS">SAMOA</option>
                                            <option value="SM">SAN MARINO</option>
                                            <option value="ST">SAO TOME AND PRINCIPE</option>
                                            <option value="SA">SAUDI ARABIA</option>
                                            <option value="SN">SENEGAL</option>
                                            <option value="RS">SERBIA</option>
                                            <option value="SC">SEYCHELLES</option>
                                            <option value="SL">SIERRA LEONE</option>
                                            <option value="SG">SINGAPORE</option>
                                            <option value="SX">SINT MAARTEN</option>
                                            <option value="SK">SLOVAKIA</option>
                                            <option value="SI">SLOVENIA</option>
                                            <option value="SB">SOLOMON ISLANDS</option>
                                            <option value="SO">SOMALIA</option>
                                            <option value="ZA">SOUTH AFRICA</option>
                                            <option value="GS">SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS</option>
                                            <option value="SS">SOUTH SUDAN</option>
                                            <option value="SU">SOVIET UNION</option>
                                            <option value="ES">SPAIN (ESPANA)</option>
                                            <option value="LK">SRI LANKA (CEYLON)</option>
                                            <option value="SD">SUDAN</option>
                                            <option value="SR">SURINAME</option>
                                            <option value="SJ">SVALBARD AND JAN MAYEN</option>
                                            <option value="SZ">SWAZILAND</option>
                                            <option value="SE">SWEDEN</option>
                                            <option value="CH">SWITZERLAND</option>
                                            <option value="SY">SYRIAN ARAB REPUBLIC</option>
                                            <option value="TW">TAIWAN</option>
                                            <option value="TJ">TAJIKISTAN</option>
                                            <option value="TY">TANGANYIKA</option>
                                            <option value="TZ">TANZANIA</option>
                                            <option value="TH">THAILAND</option>
                                            <option value="TL">TIMOR-LESTE (EAST TIMOR)</option>
                                            <option value="TG">TOGO</option>
                                            <option value="TK">TOKELAU</option>
                                            <option value="TO">TONGA</option>
                                            <option value="TT">TRINIDAD AND TOBAGO</option>
                                            <option value="TN">TUNISIA</option>
                                            <option value="TR">TURKEY</option>
                                            <option value="TM">TURKMENISTAN</option>
                                            <option value="TC">TURKS AND CAICOS ISLANDS</option>
                                            <option value="TV">TUVALU</option>
                                            <option value="UG">UGANDA</option>
                                            <option value="UA">UKRAINE</option>
                                            <option value="AE">UNITED ARAB EMIRATES</option>
                                            <option value="GB">UNITED KINGDOM</option>
                                            <option value="US">UNITED STATES</option>
                                            <option value="UM">UNITED STATES MINOR OUTLYING ISLANDS</option>
                                            <option value="UY">URUGUAY</option>
                                            <option value="UZ">UZBEKISTAN</option>
                                            <option value="VU">VANUATU</option>
                                            <option value="VA">VATICAN CITY (HOLY SEE)</option>
                                            <option value="VE">VENEZUELA</option>
                                            <option value="VN">VIET NAM</option>
                                            <option value="VG">VIRGIN ISLANDS, BRITISH</option>
                                            <option value="VI">VIRGIN ISLANDS, U.S.</option>
                                            <option value="YU">YUGOSLAVIA</option>
                                            <option value="WF">WALLIS AND FUTUNA</option>
                                            <option value="EH">WESTERN SAHARA</option>
                                            <option value="YE">YEMEN</option>
                                            <option value="ZM">ZAMBIA (NORTHERN RHODESIA)</option>
                                            <option value="ZN">ZANZIBAR</option>
                                            <option value="ZW">ZIMBABWE</option>
                                        </select>
                                        <span className="field-validation-valid text-danger" data-valmsg-for="NOKCountryOfResidence" data-valmsg-replace="true"></span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-md-3" htmlFor="NOKStateOfResidence">NOK StateOfResidence</label>
                                    <div className="col-md-9">
                                            <select
                                                className="form-control"
                                                id="NOKStateOfResidence"
                                                name="NOKStateOfResidence"
                                                value={formValues.NOKStateOfResidence}
                                                onChange={handleChange}>
                                            <option value="00">-- Select --</option>
                                            <option value="AB">ABIA</option>
                                            <option value="AD">ADAMAWA</option>
                                            <option value="AK">AKWA-IBOM</option>
                                            <option value="AN">ANAMBRA</option>
                                            <option value="BA">BAUCHI</option>
                                            <option value="BY">BAYELSA</option>
                                            <option value="BE">BENUE</option>
                                            <option value="BO">BORNO</option>
                                            <option value="CR">CROSS RIVER</option>
                                            <option value="DT">DELTA</option>
                                            <option value="EB">EBONYI</option>
                                            <option value="ED">EDO</option>
                                            <option value="EK">EKITI</option>
                                            <option value="EN">ENUGU</option>
                                            <option value="FC">FCT</option>
                                            <option value="GB">GOMBE</option>
                                            <option value="IM">IMO</option>
                                            <option value="JG">JIGAWA</option>
                                            <option value="KD">KADUNA</option>
                                            <option value="KN">KANO</option>
                                            <option value="KT">KATSINA</option>
                                            <option value="KB">KEBBI</option>
                                            <option value="KG">KOGI</option>
                                            <option value="KW">KWARA</option>
                                            <option value="LA">LAGOS</option>
                                            <option value="NR">NASSARAWA</option>
                                            <option value="NG">NIGER</option>
                                            <option value="OG">OGUN</option>
                                            <option value="OD">ONDO</option>
                                            <option value="OS">OSUN</option>
                                            <option value="OY">OYO</option>
                                            <option value="PL">PLATEAU</option>
                                            <option value="RV">RIVERS</option>
                                            <option value="SO">SOKOTO</option>
                                            <option value="TB">TARABA</option>
                                            <option value="YB">YOBE</option>
                                            <option value="ZA">ZAMFARA</option>
                                        </select>
                                        <span className="field-validation-valid text-danger" data-valmsg-for="NOKStateOfResidence" data-valmsg-replace="true"></span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-md-3" htmlFor="NOKLGAOfResidence" >NOK LGAOfResidence</label>
                                    <div className="col-md-9">
                                            <select
                                                className="form-control"
                                                id="NOKLGAOfResidence"
                                                name="NOKLGAOfResidence"
                                                value={formValues.NOKLGAOfResidence}
                                                onChange={handleChange}
                                            >
                                            <option value="00">-- Select --</option>
                                            <option value="EZA">ABA NORTH</option>
                                            <option value="ABA">ABA SOUTH</option>
                                            <option value="ACH">AROCHUKWU</option>
                                            <option value="BND">BENDE</option>
                                            <option value="KWU">IKWUANO</option>
                                            <option value="KPU">ISIALA-NGWA NORTH</option>
                                            <option value="MBA">ISIALA-NGWA SOUTH</option>
                                            <option value="MBL">ISUIKWUATO</option>
                                            <option value="NGK">OBIOMA NGWA</option>
                                            <option value="HAF">OHAFIA</option>
                                            <option value="SSM">OSISIOMA</option>
                                            <option value="GWB">UGWUNAGBO</option>
                                            <option value="KEK">UKWA EAST</option>
                                            <option value="KKE">UKWA WEST</option>
                                            <option value="UMA">UMUAHIA NORTH</option>
                                            <option value="APR">UMUAHIA SOUTH</option>
                                            <option value="UNC">UMUNNEOCHI</option>
                                            <option value="DSA">DEMSA</option>
                                            <option value="FUR">FUFORE</option>
                                            <option value="GAN">GANYE</option>
                                            <option value="GRE">GIREI</option>
                                            <option value="GMB">GOMBI</option>
                                            <option value="GUY">GUYUK</option>
                                            <option value="HNG">HONG</option>
                                            <option value="JAD">JADA</option>
                                            <option value="JMT">JIMETA</option>
                                            <option value="LMR">LAMURDE</option>
                                            <option value="MDG">MADAGALI</option>
                                            <option value="MAH">MAIHA</option>
                                            <option value="MWA">MAYO-BELWA</option>
                                            <option value="MCH">MICHIKA</option>
                                            <option value="MUB">MUBI-NORTH</option>
                                            <option value="GYL">MUBI-SOUTH</option>
                                            <option value="NUM">NUMAN</option>
                                            <option value="SHG">SHELLENG</option>
                                            <option value="SNG">SONG</option>
                                            <option value="TNG">TOUNGO</option>
                                            <option value="YLA">YOLA</option>
                                            <option value="ABK">ABAK</option>
                                            <option value="KRT">EASTERN-OBOLO</option>
                                            <option value="KET">EKET</option>
                                            <option value="KST">ESIT EKET</option>
                                            <option value="AFH">ESSIEN-UDIM</option>
                                            <option value="AEE">ETIM-EKPO</option>
                                            <option value="ETN">ETINAM</option>
                                            <option value="PNG">IBENO</option>
                                            <option value="NGD">IBESIKPO-ASUTAN</option>
                                            <option value="BMT">IBIONO-IBOM</option>
                                            <option value="NYA">IKA</option>
                                            <option value="KKN">IKONO</option>
                                            <option value="KTS">IKOT-ABASI</option>
                                            <option value="KTE">IKOT-EKPENE</option>
                                            <option value="DRK">INI</option>
                                            <option value="TTU">ITU</option>
                                            <option value="ENW">MBO</option>
                                            <option value="MKP">MKPAT-ENIN</option>
                                            <option value="TAI">NSIT-ATAI</option>
                                            <option value="AFG">NSIT-IBOM</option>
                                            <option value="KTD">NSIT-UBIUM</option>
                                            <option value="NTE">OBOT-AKARA</option>
                                            <option value="KPD">OKOBO</option>
                                            <option value="ABT">ONNA</option>
                                            <option value="RNN">ORON</option>
                                            <option value="KTM">ORUK ANAM</option>
                                            <option value="EYF">UDUNG-UKO</option>
                                            <option value="KPK">UKANEFUN</option>
                                            <option value="UFG">URU OFFONG ORUKO</option>
                                            <option value="DUU">URUAN</option>
                                            <option value="UYY">UYO</option>
                                            <option value="AGU">AGUATA</option>
                                            <option value="AAH">ANAMBRA</option>
                                            <option value="NZM">ANAMBRA-WEST</option>
                                            <option value="NEN">ANAOCHA</option>
                                            <option value="ACA">AWKA-NORTH</option>
                                            <option value="AWK">AWKA-SOUTH</option>
                                            <option value="NKK">AYAMELUM</option>
                                            <option value="KPP">DUNUKOFIA</option>
                                            <option value="ZBL">EKWUSIGO</option>
                                            <option value="GDD">IDEMILI-NORTH</option>
                                            <option value="JJT">IDEMILI-SOUTH</option>
                                            <option value="HAL">IHIALA</option>
                                            <option value="ABN">NJIKOKA</option>
                                            <option value="NNE">NNEWI-NORTH</option>
                                            <option value="UKP">NNEWI-SOUTH</option>
                                            <option value="ATN">OGBARU</option>
                                            <option value="NSH">ONITSHA-NORTH</option>
                                            <option value="FGG">ONITSHA-SOUTH</option>
                                            <option value="AJL">ORUMBA-NORTH</option>
                                            <option value="UMZ">ORUMBA-SOUTH</option>
                                            <option value="HTE">OYI</option>
                                            <option value="ALK">ALKALERI</option>
                                            <option value="BAU">BAUCHI</option>
                                            <option value="BGR">BOGORO</option>
                                            <option value="DBM">DAMBAN</option>
                                            <option value="DRZ">DARAZO</option>
                                            <option value="DAS">DASS</option>
                                            <option value="GAM">GAMAWA</option>
                                            <option value="GJW">GANJUWA</option>
                                            <option value="GYD">GIADE</option>
                                            <option value="TSG">ITAS/GADAU</option>
                                            <option value="JMA">JAMA ARE</option>
                                            <option value="KTG">KATAGUM</option>
                                            <option value="KRF">KIRFI</option>
                                            <option value="MSA">MISAU</option>
                                            <option value="NNG">NINGI</option>
                                            <option value="SHR">SHIRA</option>
                                            <option value="TFB">TAFAWA-BALEWA</option>
                                            <option value="TRR">TORO</option>
                                            <option value="WRJ">WARJI</option>
                                            <option value="ZAK">ZAKI</option>
                                            <option value="BRS">BRASS</option>
                                            <option value="KMR">EKEREMOR</option>
                                            <option value="KMK">KOLOKUMA/OPKUMA</option>
                                            <option value="NEM">NEMBE</option>
                                            <option value="GBB">OGBIA</option>
                                            <option value="SAG">SAGBAMA</option>
                                            <option value="SPR">SOUTHERN-IJAW</option>
                                            <option value="YEN">YENEGOA</option>
                                            <option value="GMU">ADO</option>
                                            <option value="GTU">AGATU</option>
                                            <option value="GKP">APA</option>
                                            <option value="BKB">BURUKU</option>
                                            <option value="GBK">GBOKO</option>
                                            <option value="YGJ">GUMA</option>
                                            <option value="ALD">GWER-EAST</option>
                                            <option value="NAK">GWER-WEST</option>
                                            <option value="KAL">KATSINA-ALA</option>
                                            <option value="TSE">KONSHISHA</option>
                                            <option value="WDP">KWANDE</option>
                                            <option value="GBG">LOGO</option>
                                            <option value="MKD">MAKURDI</option>
                                            <option value="BRT">OBI</option>
                                            <option value="BGT">OGBADIBO</option>
                                            <option value="DKP">OHIMINI</option>
                                            <option value="JUX">OJU</option>
                                            <option value="PKG">OKPOKWU</option>
                                            <option value="TKP">OTUKPO</option>
                                            <option value="WNN">TARKA</option>
                                            <option value="UKM">UKUM</option>
                                            <option value="SEL">USHONGO</option>
                                            <option value="VDY">VANDEIKYA</option>
                                            <option value="ADM">ABADAM</option>
                                            <option value="ASU">ASKIRA-UBA</option>
                                            <option value="BAM">BAMA</option>
                                            <option value="BAY">BAYO</option>
                                            <option value="BBU">BIU</option>
                                            <option value="CBK">CHIBOK</option>
                                            <option value="DAM">DAMBOA</option>
                                            <option value="DKW">DIKWA</option>
                                            <option value="GUB">GUBIO</option>
                                            <option value="GZM">GUZAMALA</option>
                                            <option value="GZA">GWOZA</option>
                                            <option value="HWL">HAWUL</option>
                                            <option value="JRE">JERE</option>
                                            <option value="KGG">KAGA</option>
                                            <option value="KBG">KALA/BALGE</option>
                                            <option value="KDG">KONDUGA</option>
                                            <option value="KWA">KUKAWA</option>
                                            <option value="KWY">KWAYA-KUSAR</option>
                                            <option value="MAF">MAFA</option>
                                            <option value="MGM">MAGUMERI</option>
                                            <option value="MAG">MAIDUGURI</option>
                                            <option value="MAR">MARTE</option>
                                            <option value="MBR">MOBBAR</option>
                                            <option value="MNG">MONGUNU</option>
                                            <option value="NGL">NGALA</option>
                                            <option value="NGZ">NGANZAI</option>
                                            <option value="SHN">SHANI</option>
                                            <option value="TGD">ABI</option>
                                            <option value="KAM">AKAMKPA</option>
                                            <option value="KTA">AKPABUYO</option>
                                            <option value="BKS">BAKASSI</option>
                                            <option value="ABE">BEKWARA</option>
                                            <option value="AKP">BIASI</option>
                                            <option value="BJE">BOKI</option>
                                            <option value="CAL">CALABAR-MUNICIPAL</option>
                                            <option value="ANA">CALABAR-SOUTH</option>
                                            <option value="EFE">ETUNK</option>
                                            <option value="KMM">IKOM</option>
                                            <option value="BNS">OBANLIKU</option>
                                            <option value="BRA">OBUBRA</option>
                                            <option value="UDU">OBUDU</option>
                                            <option value="DUK">ODUKPANI</option>
                                            <option value="GGJ">OGOJA</option>
                                            <option value="GEP">YAKURR</option>
                                            <option value="CKK">YALA</option>
                                            <option value="SLK">ANIOCHA-NORTH</option>
                                            <option value="GWK">ANIOCHA-SOUTH</option>
                                            <option value="BMA">BOMADI</option>
                                            <option value="BUR">BURUTU</option>
                                            <option value="SKL">ETHIOPE-EAST</option>
                                            <option value="GRA">ETHIOPE-WEST</option>
                                            <option value="AGB">IKA-NORTH</option>
                                            <option value="AYB">IKA-SOUTH</option>
                                            <option value="DSZ">ISOKO-NORTH</option>
                                            <option value="LEH">ISOKO-SOUTH</option>
                                            <option value="ABH">NDOKWA-EAST</option>
                                            <option value="KWC">NDOKWA-WEST</option>
                                            <option value="KPE">OKPE</option>
                                            <option value="ASB">OSHIMILI</option>
                                            <option value="AKU">OSHIMILI-NORTH</option>
                                            <option value="PTN">PATANI</option>
                                            <option value="SAP">SAPELE</option>
                                            <option value="ALA">UDU</option>
                                            <option value="UGH">UGHELLI-NORTH</option>
                                            <option value="JRT">UGHELLI-SOUTH</option>
                                            <option value="BKW">UKWUANI</option>
                                            <option value="EFR">UVWIE</option>
                                            <option value="GBJ">WARRI-CENTRAL</option>
                                            <option value="KLK">WARRI-NORTH</option>
                                            <option value="WWR">WARRI-SOUTH</option>
                                            <option value="AKL">ABAKALIKI</option>
                                            <option value="AFK">AFIKPO-NORTH</option>
                                            <option value="EDA">AFIKPO-SOUTH</option>
                                            <option value="UGB">EBONYI</option>
                                            <option value="EBJ">EZZA-NORTH</option>
                                            <option value="NKE">EZZA-SOUTH</option>
                                            <option value="CHR">IKWO</option>
                                            <option value="ZLL">ISHIELU</option>
                                            <option value="SKA">IVO</option>
                                            <option value="BKL">IZZI</option>
                                            <option value="HKW">OHAKWU</option>
                                            <option value="BZR">OHAOZARA</option>
                                            <option value="NCA">ONICHA</option>
                                            <option value="GAR">AKOKO-EDO</option>
                                            <option value="USL">EGOR</option>
                                            <option value="RRU">ESAN-CENTRAL</option>
                                            <option value="URM">ESAN-NORTH-EAST</option>
                                            <option value="UBJ">ESAN-SOUTH-EAST</option>
                                            <option value="EKP">ESAN-WEST</option>
                                            <option value="FUG">ETSAKO-CENTRAL</option>
                                            <option value="AGD">ETSAKO-EAST</option>
                                            <option value="AUC">ETSAKO-WEST</option>
                                            <option value="GUE">IGUEBEN</option>
                                            <option value="DGE">IKPOBA-OKHA</option>
                                            <option value="BEN">OREDO</option>
                                            <option value="ABD">ORHIONMWON</option>
                                            <option value="AKA">OVIA-NORTH-EAST</option>
                                            <option value="GBZ">OVIA-SOUTH-WEST</option>
                                            <option value="AFZ">OWAN-EAST</option>
                                            <option value="SGD">OWAN-WEST</option>
                                            <option value="HER">UHUNMWONDE</option>
                                            <option value="ADK">ADO-EKITI</option>
                                            <option value="EFY">EFON</option>
                                            <option value="MUE">EKITI-EAST</option>
                                            <option value="LAW">EKITI-SOUTH-WEST</option>
                                            <option value="AMK">EKITI-WEST</option>
                                            <option value="EMR">EMURE</option>
                                            <option value="DEA">GBONYIN</option>
                                            <option value="DEK">IDO-OSI</option>
                                            <option value="JER">IJERO</option>
                                            <option value="KER">IKERE</option>
                                            <option value="KLE">IKOLE</option>
                                            <option value="YEK">ILEJEMEJE</option>
                                            <option value="GED">IREPODUN/IFELODUN</option>
                                            <option value="SSE">ISE-ORUN</option>
                                            <option value="TUN">MOBA</option>
                                            <option value="YEE">OYE</option>
                                            <option value="DBR">ANINRI</option>
                                            <option value="AWG">AWGU</option>
                                            <option value="NKW">ENUGU-EAST</option>
                                            <option value="ENU">ENUGU-NORTH</option>
                                            <option value="UWN">ENUGU-SOUTH</option>
                                            <option value="AGW">EZEAGU</option>
                                            <option value="GBD">IGBO-ETITI</option>
                                            <option value="ENZ">IGBO-EZE-NORTH</option>
                                            <option value="BBG">IGBO-EZE-SOUTH</option>
                                            <option value="KEM">ISI-UZO</option>
                                            <option value="MGL">NKANU-EAST</option>
                                            <option value="AGN">NKANU-WEST</option>
                                            <option value="NSK">NSUKKA</option>
                                            <option value="JRV">OJI-RIVER</option>
                                            <option value="BLF">UDENU</option>
                                            <option value="UDD">UDI</option>
                                            <option value="UMU">UZO-UWANI</option>
                                            <option value="ABJ">ABAJI AREA COUNCIL</option>
                                            <option value="ABC">ABUJA MUNICIPAL AREA COUNCIL</option>
                                            <option value="BWR">BWARI</option>
                                            <option value="GWA">GWAGWALADA</option>
                                            <option value="KUJ">KUJE AREA COUNCIL</option>
                                            <option value="KWL">KWALI</option>
                                            <option value="AKK">AKKO</option>
                                            <option value="BLG">BALANGA</option>
                                            <option value="BLR">BILLIRI</option>
                                            <option value="DKU">DUKKU</option>
                                            <option value="FKY">FUNAKAYE</option>
                                            <option value="GME">GOMBE</option>
                                            <option value="KLT">KALTUNGO</option>
                                            <option value="KWM">KWAMI</option>
                                            <option value="NFD">NAFADA/BAJOGA</option>
                                            <option value="SHM">SHOMGOM</option>
                                            <option value="YDB">YAMALTU/DEBA</option>
                                            <option value="ABB">ABOH-MBAISE</option>
                                            <option value="AFR">AHIAZU-MBAISE</option>
                                            <option value="EHM">EHIME-MBANO</option>
                                            <option value="ETU">EZINIHITTE</option>
                                            <option value="URU">IDEATO-NORTH</option>
                                            <option value="DFB">IDEATO-SOUTH</option>
                                            <option value="EKE">IHITTE/UBOMA</option>
                                            <option value="KED">IKEDURU</option>
                                            <option value="UML">ISIALA-MBANO</option>
                                            <option value="UMD">ISU</option>
                                            <option value="NWA">MBAITOLI</option>
                                            <option value="NGN">NGOR-OKPALA</option>
                                            <option value="UMK">NJABA</option>
                                            <option value="NKR">NKWERRE</option>
                                            <option value="AMG">NWANGELE</option>
                                            <option value="TTK">OBOWO</option>
                                            <option value="GUA">OGUTA</option>
                                            <option value="EBM">OHAJI-EGBEMA</option>
                                            <option value="KGE">OKIGWE</option>
                                            <option value="KWE">ONUIMO</option>
                                            <option value="RLU">ORLU</option>
                                            <option value="AWD">ORSU</option>
                                            <option value="MMA">ORU-EAST</option>
                                            <option value="NGB">ORU-WEST</option>
                                            <option value="WER">OWERRI-MUNICIPAL</option>
                                            <option value="RRT">OWERRI-NORTH</option>
                                            <option value="UMG">OWERRI-WEST</option>
                                            <option value="AUY">AUYO</option>
                                            <option value="BBR">BABURA</option>
                                            <option value="BNW">BIRINIWA</option>
                                            <option value="BKD">BIRNIN-KUDU</option>
                                            <option value="BUJ">BUJI</option>
                                            <option value="DUT">DUTSE</option>
                                            <option value="GGW">GAGARAWA</option>
                                            <option value="GRK">GARKI</option>
                                            <option value="GML">GUMEL</option>
                                            <option value="GRR">GURI</option>
                                            <option value="GRM">GWARAM</option>
                                            <option value="GWW">GWIWA</option>
                                            <option value="HJA">HADEJIA</option>
                                            <option value="JHN">JAHUN</option>
                                            <option value="KHS">KAFIN-HAUSA</option>
                                            <option value="KGM">KAUGAMA</option>
                                            <option value="KZR">KAZAURE</option>
                                            <option value="KKM">KIRKASAMMA</option>
                                            <option value="KYW">KIYAWA</option>
                                            <option value="MGR">MAIGATARI</option>
                                            <option value="MMR">MALAM-MADURI</option>
                                            <option value="MGA">MIGA</option>
                                            <option value="RNG">RINGIM</option>
                                            <option value="RRN">RONI</option>
                                            <option value="STK">SULE-TANKARKAR</option>
                                            <option value="TAR">TAURA</option>
                                            <option value="YKS">YANKWASHI</option>
                                            <option value="BNG">BIRNIN-GWARI</option>
                                            <option value="KJM">CHIKUN</option>
                                            <option value="GKW">GIWA</option>
                                            <option value="TRK">IGABI</option>
                                            <option value="KAR">IKARA</option>
                                            <option value="KWB">JABA</option>
                                            <option value="KAF">JEMA A</option>
                                            <option value="KCH">KACHIA</option>
                                            <option value="DKA">KADUNA-NORTH</option>
                                            <option value="MKA">KADUNA-SOUTH</option>
                                            <option value="KGK">KAGARKO</option>
                                            <option value="KJR">KAJURU</option>
                                            <option value="KRA">KAURA</option>
                                            <option value="KRU">KAURU</option>
                                            <option value="ANC">KUBAH</option>
                                            <option value="HKY">KUDAN</option>
                                            <option value="SNK">LERE</option>
                                            <option value="MKR">MAKARFI</option>
                                            <option value="SBG">SABON-GARI</option>
                                            <option value="GWT">SANGA</option>
                                            <option value="MGN">SOBA</option>
                                            <option value="ZKW">ZANGON-KATAF</option>
                                            <option value="ZAR">ZARIA</option>
                                            <option value="AJG">AJINGI</option>
                                            <option value="ABS">ALBASU</option>
                                            <option value="BGW">BAGWAI</option>
                                            <option value="BBJ">BEBEJI</option>
                                            <option value="BCH">BICHI</option>
                                            <option value="BNK">BUNKURE</option>
                                            <option value="DAL">DALA</option>
                                            <option value="DBT">DANBATTA</option>
                                            <option value="DKD">DAWAKIN-KUDU</option>
                                            <option value="DTF">DAWAKIN-TOFA</option>
                                            <option value="DGW">DOGUWA</option>
                                            <option value="FGE">FAGGE</option>
                                            <option value="DSW">GABASAWA</option>
                                            <option value="GAK">GARKO</option>
                                            <option value="GNM">GARUN-MALLAM</option>
                                            <option value="GYA">GAYA</option>
                                            <option value="GZW">GEZAWA</option>
                                            <option value="GWL">GWALE</option>
                                            <option value="GRZ">GWARZO</option>
                                            <option value="KBK">KABO</option>
                                            <option value="KMC">KANO-MUNICIPAL</option>
                                            <option value="KRY">KARAYE</option>
                                            <option value="KBY">KIBIYA</option>
                                            <option value="KKU">KIRU</option>
                                            <option value="KBT">KUMBOTSO</option>
                                            <option value="KNC">KUNCHI</option>
                                            <option value="KUR">KURA</option>
                                            <option value="MDB">MADOBI</option>
                                            <option value="MKK">MAKODA</option>
                                            <option value="MJB">MINJIBIR</option>
                                            <option value="NSR">NASSARAWA</option>
                                            <option value="RAN">RANO</option>
                                            <option value="RMG">RIMIN-GADO</option>
                                            <option value="RGG">ROGO</option>
                                            <option value="SNN">SHANONO</option>
                                            <option value="SML">SUMAILA</option>
                                            <option value="TAK">TAKAI</option>
                                            <option value="TRN">TARAUNI</option>
                                            <option value="TFA">TOFA</option>
                                            <option value="TYW">TSANYAWA</option>
                                            <option value="TWD">TUDUN-WADA</option>
                                            <option value="UGG">UNGOGO</option>
                                            <option value="WRA">WARAWA</option>
                                            <option value="WDL">WUDIL</option>
                                            <option value="BKR">BAKORI</option>
                                            <option value="BAT">BATAGARAWA</option>
                                            <option value="BTR">BATSARI</option>
                                            <option value="BRE">BAURE</option>
                                            <option value="BDW">BINDAWA</option>
                                            <option value="CRC">CHARANCHI</option>
                                            <option value="DDM">DANDUME</option>
                                            <option value="DJA">DANJA</option>
                                            <option value="DMS">DAN-MUSA</option>
                                            <option value="DRA">DAURA</option>
                                            <option value="DTS">DUTSI</option>
                                            <option value="DTM">DUTSINMA</option>
                                            <option value="FSK">FASKARI</option>
                                            <option value="FTA">FUNTUA</option>
                                            <option value="NGW">INGAWA</option>
                                            <option value="JBY">JIBIA</option>
                                            <option value="KFR">KAFUR</option>
                                            <option value="KAT">KAITA</option>
                                            <option value="KKR">KANKARA</option>
                                            <option value="KNK">KANKIA</option>
                                            <option value="KTN">KATSINA</option>
                                            <option value="KUF">KURFI</option>
                                            <option value="KSD">KUSADA</option>
                                            <option value="MDW">MAI-ADUA</option>
                                            <option value="MNF">MALUMFASHI</option>
                                            <option value="MAN">MANI</option>
                                            <option value="MSH">MASHI</option>
                                            <option value="MTZ">MATAZU</option>
                                            <option value="MSW">MUSAWA</option>
                                            <option value="RMY">RIMI</option>
                                            <option value="SBA">SABUWA</option>
                                            <option value="SFN">SAFANA</option>
                                            <option value="SDM">SANDAMU</option>
                                            <option value="ZNG">ZANGO</option>
                                            <option value="ALR">ALEIRO</option>
                                            <option value="KGW">AREWA-DANDI</option>
                                            <option value="ARG">ARGUNGU</option>
                                            <option value="AUG">AUGIE</option>
                                            <option value="BGD">BAGUDO</option>
                                            <option value="BRK">BIRNIN-KEBBI</option>
                                            <option value="BNZ">BUNZA</option>
                                            <option value="KMB">DANDI</option>
                                            <option value="MHT">FAKAI</option>
                                            <option value="GWN">GWANDU</option>
                                            <option value="JEG">JEGA</option>
                                            <option value="KLG">KALGO</option>
                                            <option value="BES">KOKO-BESSE</option>
                                            <option value="MYM">MAIYAMA</option>
                                            <option value="WRR">NGASKI</option>
                                            <option value="DRD">SAKABA</option>
                                            <option value="SNA">SHANGA</option>
                                            <option value="DKG">SURU</option>
                                            <option value="RBH">WASAGU</option>
                                            <option value="YLW">YAURI</option>
                                            <option value="ZUR">ZURU</option>
                                            <option value="DAV">ADAVI</option>
                                            <option value="AJA">AJAOKUTA</option>
                                            <option value="KPA">ANKPA</option>
                                            <option value="BAS">BASSA</option>
                                            <option value="KNA">DEKINA</option>
                                            <option value="NDG">IBAJI</option>
                                            <option value="DAH">IDAH</option>
                                            <option value="AJK">IGALAMELA-ODOLU</option>
                                            <option value="JMU">IJUMU</option>
                                            <option value="KAB">KABBA/BUNU</option>
                                            <option value="KKF">KOGI</option>
                                            <option value="LKJ">LOKOJA</option>
                                            <option value="MPA">MOPA-MURO-MOPI</option>
                                            <option value="KFU">OFU</option>
                                            <option value="KPF">OGORI/MAGONGO</option>
                                            <option value="KKH">OKEHI</option>
                                            <option value="KNE">OKENE</option>
                                            <option value="LAM">OLAMABORO</option>
                                            <option value="BJK">OMALA</option>
                                            <option value="ERE">YAGBA-EAST</option>
                                            <option value="SAN">YAGBA-WEST</option>
                                            <option value="AFN">ASA</option>
                                            <option value="KSB">BARUTEN</option>
                                            <option value="LAF">EDU</option>
                                            <option value="ARP">EKITI</option>
                                            <option value="SHA">IFELODUN</option>
                                            <option value="KEY">ILORIN-EAST</option>
                                            <option value="FUF">ILORIN-SOUTH</option>
                                            <option value="LRN">ILORIN-WEST</option>
                                            <option value="MUN">IREPODUN</option>
                                            <option value="WSN">ISIN</option>
                                            <option value="KMA">KAIAMA</option>
                                            <option value="BDU">MORO</option>
                                            <option value="FFA">OFFA</option>
                                            <option value="LFF">OKE-ERO</option>
                                            <option value="LEM">OYUN</option>
                                            <option value="PTG">PATEGI</option>
                                            <option value="GGE">AGEGE</option>
                                            <option value="AGL">AJEROMI-IFELODUN</option>
                                            <option value="KTU">ALIMOSHO</option>
                                            <option value="FST">AMUWO-ODOFIN</option>
                                            <option value="APP">APAPA</option>
                                            <option value="BDG">BADAGRY</option>
                                            <option value="EPE">EPE</option>
                                            <option value="EKY">ETI-OSA</option>
                                            <option value="AKD">IBEJU-LEKKI</option>
                                            <option value="FKJ">IFAKO-IJAIYE</option>
                                            <option value="KJA">IKEJA</option>
                                            <option value="KRD">IKORODU</option>
                                            <option value="KSF">KOSOFE</option>
                                            <option value="AAA">LAGOS-ISLAND</option>
                                            <option value="LND">LAGOS-MAINLAND</option>
                                            <option value="MUS">MUSHIN</option>
                                            <option value="JJJ">OJO</option>
                                            <option value="LSD">OSHODI-ISOLO</option>
                                            <option value="SMK">SOMOLU</option>
                                            <option value="LSR">SURULERE</option>
                                            <option value="AKW">AKWANGA</option>
                                            <option value="AWE">AWE</option>
                                            <option value="DMA">DOMA</option>
                                            <option value="KRV">KARU</option>
                                            <option value="KEN">KEANA</option>
                                            <option value="KEF">KEFFI</option>
                                            <option value="GRU">KOKONA</option>
                                            <option value="LFA">LAFIA</option>
                                            <option value="NSW">NASARAWA</option>
                                            <option value="NEG">NASARAWA-EGGON</option>
                                            <option value="NBB">OBI</option>
                                            <option value="NTT">TOTO</option>
                                            <option value="WAM">WAMBA</option>
                                            <option value="AGA">AGAIE</option>
                                            <option value="AGR">AGWARA</option>
                                            <option value="BDA">BIDA</option>
                                            <option value="NBS">BORGU</option>
                                            <option value="MAK">BOSSO</option>
                                            <option value="MNA">CHANCHAGA</option>
                                            <option value="ENG">EDATI</option>
                                            <option value="LMU">GBAKO</option>
                                            <option value="GWU">GURARA</option>
                                            <option value="KHA">KATCHA</option>
                                            <option value="KNT">KONTAGORA</option>
                                            <option value="LAP">LAPAI</option>
                                            <option value="KUG">LAVUN</option>
                                            <option value="NAS">MAGAMA</option>
                                            <option value="BMG">MARIGA</option>
                                            <option value="MSG">MASHEGU</option>
                                            <option value="MKW">MOKWA</option>
                                            <option value="SRP">MUYA</option>
                                            <option value="PAK">PAIKORO</option>
                                            <option value="KAG">RAFI</option>
                                            <option value="RJA">RIJAU</option>
                                            <option value="KUT">SHIRORO</option>
                                            <option value="SUL">SULEJA</option>
                                            <option value="WSE">TAFA</option>
                                            <option value="WSH">WUSHISHI</option>
                                            <option value="AKM">ABEOKUTA-NORTH</option>
                                            <option value="AAB">ABEOKUTA-SOUTH</option>
                                            <option value="OTA">ADO-ODO/OTA</option>
                                            <option value="AYE">EGBADO-NORTH</option>
                                            <option value="LAR">EGBADO-SOUTH</option>
                                            <option value="TRE">EWEKORO</option>
                                            <option value="FFF">IFO</option>
                                            <option value="GBE">IJEBU-EAST</option>
                                            <option value="JGB">IJEBU-NORTH</option>
                                            <option value="JNE">IJEBU-NORTH-EAST</option>
                                            <option value="JBD">IJEBU-ODE</option>
                                            <option value="KNN">IKENNE</option>
                                            <option value="MEK">IMEKO-AFON</option>
                                            <option value="PKA">IPOKIA</option>
                                            <option value="WDE">OBAFEMI-OWODE</option>
                                            <option value="DED">ODEDAH</option>
                                            <option value="DGB">ODOGBOLU</option>
                                            <option value="ABG">OGUN-WATERSIDE</option>
                                            <option value="JRM">REMO-NORTH</option>
                                            <option value="SMG">SHAGAMU</option>
                                            <option value="SUA">AKOKO SOUTH</option>
                                            <option value="KAK">AKOKO-NORTH</option>
                                            <option value="ANG">AKOKO-NORTH-WEST</option>
                                            <option value="KAA">AKOKO-SOUTH-EAST</option>
                                            <option value="AKR">AKURE-NORTH</option>
                                            <option value="JTA">AKURE-SOUTH</option>
                                            <option value="GKB">ESE-ODO</option>
                                            <option value="WEN">IDANRE</option>
                                            <option value="FGB">IFEDORE</option>
                                            <option value="GBA">IJAYE</option>
                                            <option value="LEL">ILE-OLUJI-OKEIGBO</option>
                                            <option value="REL">IRELE</option>
                                            <option value="REE">ODIGBO</option>
                                            <option value="KTP">OKITI-PUPA</option>
                                            <option value="NND">ONDO WEST</option>
                                            <option value="BDR">ONDO-EAST</option>
                                            <option value="FFN">OSE</option>
                                            <option value="WWW">OWO</option>
                                            <option value="SSU">ATAKUMOSA</option>
                                            <option value="PRN">ATAKUMOSA EAST</option>
                                            <option value="GBN">AYEDA-ADE</option>
                                            <option value="LGB">AYEDIRE</option>
                                            <option value="TAN">BOLUWADURO</option>
                                            <option value="RGB">BORIPE</option>
                                            <option value="EDE">EDE</option>
                                            <option value="EDT">EDE NORTH</option>
                                            <option value="AAW">EGBEDORE</option>
                                            <option value="EJG">EJIGBO</option>
                                            <option value="PMD">IFE NORTH</option>
                                            <option value="FTD">IFE SOUTH</option>
                                            <option value="FFE">IFE-CENTRAL</option>
                                            <option value="FDY">IFEDAYO</option>
                                            <option value="FEE">IFE-EAST</option>
                                            <option value="KNR">IFELODUN</option>
                                            <option value="LRG">ILA</option>
                                            <option value="LES">ILESA-EAST</option>
                                            <option value="LEW">ILESA-WEST</option>
                                            <option value="RLG">IREPODUN</option>
                                            <option value="KRE">IREWOLE</option>
                                            <option value="APM">ISOKAN</option>
                                            <option value="WWD">IWO</option>
                                            <option value="BKN">OBOKUN</option>
                                            <option value="DTN">ODO-OTIN</option>
                                            <option value="BDS">OLA OLUWA</option>
                                            <option value="GNN">OLORUNDA</option>
                                            <option value="JJS">ORI-ADE</option>
                                            <option value="FNN">OROLU</option>
                                            <option value="SGB">OSOGBO</option>
                                            <option value="JBL">AFIJIO</option>
                                            <option value="MNY">AKINYELE</option>
                                            <option value="FMT">ATIBA</option>
                                            <option value="TDE">ATIGBO</option>
                                            <option value="EGB">EGBEDA</option>
                                            <option value="BDJ">IBADAN-NORTH</option>
                                            <option value="AGG">IBADAN-NORTH-EAST</option>
                                            <option value="NRK">IBADAN-NORTH-WEST</option>
                                            <option value="MAP">IBADAN-SOUTH-EAST</option>
                                            <option value="LUY">IBADAN-SOUTH-WEST</option>
                                            <option value="RUW">IBARAPA-CENTRAL</option>
                                            <option value="AYT">IBARAPA-EAST</option>
                                            <option value="IRP">IBARAPA-NORTH</option>
                                            <option value="DDA">IDO</option>
                                            <option value="KSH">IREPO</option>
                                            <option value="SEY">ISEYIN</option>
                                            <option value="TUT">ITESIWAJU</option>
                                            <option value="WEL">IWAJOWA</option>
                                            <option value="KEH">KAJOLA</option>
                                            <option value="YNF">LAGELU</option>
                                            <option value="KNH">OGBOMOSO-NORTH</option>
                                            <option value="AME">OGBOMOSO-SOUTH</option>
                                            <option value="AJW">OGO-OLUWA</option>
                                            <option value="GBY">OLORUNSOGO</option>
                                            <option value="YRE">OLUYOLE</option>
                                            <option value="AKN">ONA-ARA</option>
                                            <option value="GBH">ORELOPE</option>
                                            <option value="KKY">ORI-IRE</option>
                                            <option value="JND">OYO</option>
                                            <option value="YYY">OYO-EAST</option>
                                            <option value="GMD">SAKI-EAST</option>
                                            <option value="SHK">SAKI-WEST</option>
                                            <option value="RSD">SURULERE</option>
                                            <option value="BLD">BARKIN-LADI</option>
                                            <option value="BSA">BASSA</option>
                                            <option value="BKK">BOKKOS</option>
                                            <option value="ANW">JOS-EAST</option>
                                            <option value="JJN">JOS-NORTH</option>
                                            <option value="BUU">JOS-SOUTH</option>
                                            <option value="DNG">KANAM</option>
                                            <option value="KWK">KANKE</option>
                                            <option value="LGT">LANGTANG-NORTH</option>
                                            <option value="MBD">LANGTANG-SOUTH</option>
                                            <option value="MGU">MANGU</option>
                                            <option value="TNK">MIKANG</option>
                                            <option value="PKN">PANKSHIN</option>
                                            <option value="QAP">QUAN ANPAN</option>
                                            <option value="RYM">RIYOM</option>
                                            <option value="SHD">SHENDAM</option>
                                            <option value="WAS">WASE</option>
                                            <option value="ABU">ABOA/ODUAL</option>
                                            <option value="AHD">AHOADA-EAST</option>
                                            <option value="KNM">AHOADA-WEST</option>
                                            <option value="ABM">AKUKUTORU</option>
                                            <option value="NDN">ANDONI</option>
                                            <option value="BGM">ASARI-TORU</option>
                                            <option value="BNY">BONNY</option>
                                            <option value="DEG">DEGEMA</option>
                                            <option value="NCH">ELEME</option>
                                            <option value="MHA">EMUOHA</option>
                                            <option value="KHE">ETCHE</option>
                                            <option value="KPR">GOKANA</option>
                                            <option value="SKP">IKWERRE</option>
                                            <option value="BRR">KHANA</option>
                                            <option value="RUM">OBIA/AKPOR</option>
                                            <option value="RGM">OGBA-EGBEMA-NDONI</option>
                                            <option value="GGU">OGU/BOLO</option>
                                            <option value="KRK">OKIRIKA</option>
                                            <option value="BER">OMUMA</option>
                                            <option value="PBT">OPOBO/NKORO</option>
                                            <option value="AFM">OYIGBO</option>
                                            <option value="PHC">PORT-HARCOURT</option>
                                            <option value="SKN">TAI</option>
                                            <option value="BJN">BINJI</option>
                                            <option value="DBN">BODINGA</option>
                                            <option value="DGS">DANGE-SHUNI</option>
                                            <option value="GAD">GADA</option>
                                            <option value="GRY">GORONYO</option>
                                            <option value="BLE">GUDU</option>
                                            <option value="GWD">GWADABAWA</option>
                                            <option value="LLA">ILLELA</option>
                                            <option value="SAA">ISA</option>
                                            <option value="KBE">KEBBE</option>
                                            <option value="KWR">KWARE</option>
                                            <option value="RBA">RABAH</option>
                                            <option value="SBN">SABON-BIRNI</option>
                                            <option value="SGR">SHAGARI</option>
                                            <option value="SLM">SILAME</option>
                                            <option value="SKK">SOKOTO-NORTH</option>
                                            <option value="SRZ">SOKOTO-SOUTH</option>
                                            <option value="TBW">TAMBAWAL</option>
                                            <option value="TGZ">TANGAZA</option>
                                            <option value="TRT">TURETA</option>
                                            <option value="WMK">WAMAKKO</option>
                                            <option value="WRN">WURNO</option>
                                            <option value="YYB">YABO</option>
                                            <option value="ARD">ARDO-KOLA</option>
                                            <option value="BAL">BALI</option>
                                            <option value="DGA">DONGA</option>
                                            <option value="GKA">GASHAKA</option>
                                            <option value="GAS">GASSOL</option>
                                            <option value="BBB">IBI</option>
                                            <option value="JAL">JALINGO</option>
                                            <option value="KLD">KARIM-LAMIDO</option>
                                            <option value="KRM">KURMI</option>
                                            <option value="LAU">LAU</option>
                                            <option value="SDA">SARDAUNA</option>
                                            <option value="TTM">TAKUM</option>
                                            <option value="USS">USSA</option>
                                            <option value="WKR">WUKARI</option>
                                            <option value="YRR">YORRO</option>
                                            <option value="TZG">ZING</option>
                                            <option value="GSH">BADE</option>
                                            <option value="DPH">BOSARI</option>
                                            <option value="DTR">DAMATURU</option>
                                            <option value="FKA">FIKA</option>
                                            <option value="FUN">FUNE</option>
                                            <option value="GDM">GEIDAM</option>
                                            <option value="GJB">GUJBA</option>
                                            <option value="GLN">GULANI</option>
                                            <option value="JAK">JAKUSKO</option>
                                            <option value="KRS">KARASUWA</option>
                                            <option value="MCN">MACHINA</option>
                                            <option value="NNR">NANGERE</option>
                                            <option value="NGU">NGURU</option>
                                            <option value="PKM">POTISKUM</option>
                                            <option value="TMW">TARMUA</option>
                                            <option value="YUN">YUNUSARI</option>
                                            <option value="YSF">YUSUFARI</option>
                                            <option value="ANK">ANKA</option>
                                            <option value="BKA">BAKURA</option>
                                            <option value="BMJ">BIRNIN MAGAJI</option>
                                            <option value="BKM">BUKKUYUM</option>
                                            <option value="BUG">BUNGUDU</option>
                                            <option value="GMM">GUMI</option>
                                            <option value="GUS">GUSAU</option>
                                            <option value="KRN">KAURA-NAMODA</option>
                                            <option value="MRD">MARADUN</option>
                                            <option value="MRR">MARU</option>
                                            <option value="SKF">SHINKAFI</option>
                                            <option value="TMA">TALATA-MAFARA</option>
                                            <option value="TSF">TSAFE</option>
                                            <option value="ZRM">ZURMI</option>
                                        </select>
                                        <span className="field-validation-valid text-danger" data-valmsg-for="NOKLGAOfResidence" data-valmsg-replace="true"></span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3" htmlFor="NOKHouseNoOrName">NOK HouseNoOrName</label>
                                    <div className="col-md-9">
                                            <input
                                                className="form-control text-box single-line"
                                                data-val="true"
                                                data-val-maxlength="String too long"
                                                data-val-maxlength-max="40"
                                                id="NOKHouseNoOrName"
                                                name="NOKHouseNoOrName"
                                                style={{ textTransform: 'uppercase' }}
                                                type="text"
                                                value={formValues.NOKHouseNoOrName}
                                                onChange={handleChange}
                                            />
                                        <span className="field-validation-valid text-danger" data-valmsg-for="NOKHouseNoOrName" data-valmsg-replace="true"></span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3" htmlFor="NOKStreetName">NOK StreetName</label>
                                    <div className="col-md-9">
                                            <input
                                                className="form-control text-box single-line"
                                                data-val="true"
                                                data-val-maxlength="String too long"
                                                data-val-maxlength-max="40"
                                                id="NOKStreetName"
                                                name="NOKStreetName"
                                                style={{ textTransform: 'uppercase' }}
                                                type="text"
                                                value={formValues.NOKStreetName}
                                                onChange={handleChange}
                                            />
                                        <span className="field-validation-valid text-danger" data-valmsg-for="NOKStreetName" data-valmsg-replace="true"></span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-3" htmlFor="NOKCityTownVillage">NOK City/Town</label>
                                    <div className="col-md-9">
                                            <input
                                                className="form-control text-box single-line"
                                                id="NOKCityTownVillage"
                                                name="NOKCityTownVillage"
                                                style={{ textTransform: 'uppercase' }}
                                                type="text"
                                                value={formValues.NOKCityTownVillage}
                                                onChange={handleChange}
                                            />
                                        <span className="field-validation-valid text-danger" data-valmsg-for="NOKCityTownVillage" data-valmsg-replace="true"></span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-offset-3 col-md-9">
                                            {/*<input type="submit"*/}
                                            {/*    value="Save"*/}
                                            {/*    name="SaveNOK"*/}
                                            {/*    className="btn btn-primary btn-block" />*/}
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                )
           
            case 5:
                return (
                    
                    <div>
                        <div className={`tab-pane fade show ${currentTab === 5 ? 'active' : ''}`}>
                            <div id="DocumentTab">
                                <br />
                                <h4>Document and Passport Upload</h4>
                                <div className="col-md-12 well">
                                    <h4 className="text-primary">Note</h4>
                                    <ul>
                                        <li>Passport and Signature should be in JPEG, JPG format</li>
                                        <li>Other documents can be PDF, JPG, PNG, JPEG or MS Office Doc</li>
                                        <li>Passport should also be on white background</li>
                                        <li>Means of ID can be any of Drivers License, Voters Card, International Passport or Staff ID)</li>
                                        <li>Letter of First Appointment or Attestation Letter applies only to employees of the Public Sector Treasury-Funded Agencies and Police Personnel</li>
                                        <li>While the documents are all required, you can upload some and continue with the remainder at a later time</li>
                                    </ul>

                                </div>
                                <table className="table table-responsive">
                                    <tbody>
                                        <tr className="form-group">
                                            <td className="col-md-4 control-label">
                                                <label className="control-label col-md-4" htmlFor="PassportImagePath">Passport</label>
                                            </td>
                                            <td className="form-control col-md-7">
                                                <input type="file"
                                                    //value={formValues.passportImg }
                                                    onChange={(e) => showPic(e.target)} />
                                            </td>
                                            <td className="col-md-1">

                                                <img id="passportImg" height="140" width="120"
                                                    src={passportImgSrc} alt="Passport Preview"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="col-md-4">
                                                <label className="control-label col-md-4" htmlFor="SignatureImagePath">Signature</label>
                                            </td>
                                            <td className="form-control col-md-7">
                                                <input type="file"
                                                    //value={formValues.signatureImg}
                                                    onChange={(e) => showSig(e.target)} />
                                            </td>
                                            <td className="col-md-1">

                                                <img id="signatureImg" height="140" width="120"
                                                    src={signatureImgSrc} alt="Signature Preview"

                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="col-md-4 control-label">
                                                <label className="control-label col-md-4" htmlFor="EmploymentLetterImagePath">EmploymentLetter</label>
                                            </td>
                                            <td className="form-control col-md-7">
                                                <input type="file"
                                                    name="EmploymentLetterImageFile"
                                                    onChange={handleEmploymentFileChange}
                                                //value={formValues.employmentLetterImg}
                                                />
                                            </td>
                                            <td className="col-md-1">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="col-md-4">
                                                <label className="control-label col-md-4" htmlFor="MeansOfIDImagePath">MeansOfID</label>
                                            </td>
                                            <td className="form-control col-md-1">
                                                <input type="file"
                                                    name="MeansOfIDImageFile"
                                                    onChange={handleMeansOfIDFileChange}
                                                //value={formValues.meansOfIdImg}
                                                />
                                            </td>
                                            <td className="col-md-1">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="col-md-4">
                                                <label className="control-label col-md-4" htmlFor="NationalIDImagePath">NationalID/EnrolmentSlip</label>
                                            </td>
                                            <td className="col-md-7 form-control">
                                                <input type="file"
                                                    name="NationalIDImageFile"
                                                    onChange={handleNationalIDImageFileChange}
                                                //value={formValues.nationalIdImg }
                                                />
                                            </td>
                                            <td className="col-md-1">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="col-md-4">
                                                <label className="control-label col-md-4" htmlFor="FirstAppointmentLetterImagePath">FirstAppointmentLetter</label>
                                            </td>
                                            <td className="form-control col-md-8">
                                                <input type="file"
                                                    name="FirstAppointmentLetterImageFile"
                                                    onChange={handleFirstAppointmentFileChange}
                                                //value={formValues.firstAppointmentLetterImg}
                                                />
                                            </td>
                                            <td className="col-md-1">
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>
                                <div className="form-group">
                                    <div className="col-md-offset-3 col-md-9">
                                        <input type="submit" value="Save" name="SaveDocuments" className="btn btn-primary btn-block" />
                                    </div>
                                </div>
                            </div>

                            {/*<button onClick={handlePrev}>Previous</button>*/}
                            {/*<button onClick={handleNext}>Next</button>*/}
                            </div>
                        </div>
                );
            case 6:
                return (
                    
                    //    <div>
                    //        <div className={`tab-pane fade show ${currentTab === 6 ? 'active' : ''}`}>

                    //                <h2>Final Review</h2>

                    //                {/* Add more blocks as needed */}
                    //                <div>
                    //                    <h3>Personal Information</h3>
                    //                    <ElementReview label="Surname" value={formValues.surname} />
                    //                    <ElementReview label="First Name" value={formValues.firstName} />
                    //                    {/* Add more personal information fields here */}
                    //                </div>

                    //                <div>
                    //                    <h3>Contact Information</h3>
                    //                    <ElementReview label="Email Address" value={formValues.emailAddress} />
                    //                    <ElementReview label="Phone Number" value={formValues.phoneNumber} />
                    //                    {/* Add more contact information fields here */}
                    //                </div>

                    //                <div>
                    //                    <h3>Address Information</h3>
                    //                    <ElementReview label="Country of Residence" value={formValues.countryOfResidence} />
                    //                    <ElementReview label="City/Town" value={formValues.cityTown} />
                    //                    {/* Add more address information fields here */}
                    //                </div>

                    //                <div>
                    //                    <h3>Next of Kin Information</h3>
                    //                    <ElementReview label="NOK First Name" value={formValues.NOKFirstName} />
                    //                    <ElementReview label="NOK Last Name" value={formValues.NOKLastName} />
                    //                    {/* Add more next of kin information fields here */}
                    //                </div>


                    //                    <h3>Attachments</h3>
                    //                    <ElementReview label="Passport Image" value={formValues.passportImg} />
                    //                    <ElementReview label="Signature Image" value={formValues.signatureImg} />
                    //                    {/* Add more attachment fields here */}


                    //        <div>

                    //            <table className="table table-responsive">
                    //                <tbody>
                    //                    <tr className="form-group">

                    //                        <td className="col-md-1">

                    //                            <img id="passportImg" height="140" width="120"
                    //                                src={passportImgSrc} alt="Passport Preview"
                    //                            />
                    //                        </td>
                    //                    </tr>
                    //                    <tr>
                    //                        <td className="col-md-1">

                    //                            <img id="signatureImg" height="140" width="120"
                    //                                src={signatureImgSrc} alt="Signature Preview"

                    //                            />
                    //                        </td>
                    //                    </tr>
                    //                </tbody>
                    //            </table>
                    //        </div>

                    //                {/* Print Button */}
                    //                <button onClick={() => window.print()}>Print Form</button>


                    //    </div>
                    //</div>
                   
                            <div>
                                <h2>Final Review</h2>

                                <table className="table table-responsive">
                                    <tbody>
                                        {/* Personal Information */}
                                        <ElementReview label="Surname" value={formValues.surname} />
                                        <ElementReview label="First Name" value={formValues.firstName} />
                                        {/* Add more personal information fields here */}

                                        {/* Contact Information */}
                                        <ElementReview label="Email Address" value={formValues.emailAddress} />
                                        <ElementReview label="Phone Number" value={formValues.phoneNumber} />
                                        {/* Add more contact information fields here */}

                                        {/* Address Information */}
                                        <ElementReview label="Country of Residence" value={formValues.countryOfResidence} />
                                        <ElementReview label="City/Town" value={formValues.cityTown} />
                                        {/* Add more address information fields here */}

                                        {/* Next of Kin Information */}
                                        <ElementReview label="NOK First Name" value={formValues.NOKFirstName} />
                                        <ElementReview label="NOK Last Name" value={formValues.NOKLastName} />
                                        {/* Add more next of kin information fields here */}

                                        {/* Attachments */}
                                        <ImagePreview label="Passport Image" src={passportImgSrc} />
                                        <ImagePreview label="Signature Image" src={signatureImgSrc} />
                                        {/* Add more attachment fields here */}
                                    </tbody>
                                </table>

                                {/* Print Button */}
                                <button onClick={() => window.print()}>Print Form</button>
                            </div>
                        );
                  
            case 7:
                return (
                    <div>
                        <div className={`tab-pane fade show ${currentTab === 7 ? 'active' : ''}`}>
                           <div>
                            <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter an 8 digit password"
                            value={formValues.password}
                            onChange={handleChange}

                                />
                            </div>
                            <div className="form-group">
                                <label className="control-label col-md-3" htmlFor="AgentCode">Agent</label>
                                <div className="col-md-9">
                                    <select
                                        className="form-control"
                                        id="AgentCode"
                                        name="AgentCode"
                                        value={formValues.AgentCode}
                                        onChange={handleChange}
                                    ><option value="00">-- Select --</option>
                                        <option value="100">Othuke Hercules Odoko</option>
                                        <option value="200">Rosemary Achibogu</option>
                                        <option value="300">Victoria Ijeoma</option>
                                        <option value="400">Taiwo Owolabi</option>
                                        <option value="500">Uche Nnadi</option>
                                    </select>
                                    <span className="field-validation-valid text-danger"
                                        data-valmsg-for="AgentCode"
                                        data-valmsg-replace="true"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const handleTabClick = () => {
        showToast('Please use the "Next" or "Previous" button to proceed.');
    };

    const renderTabs = () => {
        const tabs = ['Personal Information', 'Residential', 'Employer', 'NOK Details', 'Documents' ,'Final Review','Login'];
        return tabs.map((tab, index) => (
            <li className="nav-item" key={index}>
                <span
                    className={`nav-link ${currentTab === index + 1 ? 'active' : ''}`}
                    onClick={handleTabClick}
                >
                    {tab} {currentStep > index + 1 ? '✔' : ''}
                </span>
            </li>
        ));
    };

    return (
        <div className="container mt-4">
            <ToastContainer position="top-center" /> {/* Specify the position here */}
            {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}

            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <ul className="nav nav-tabs">{renderTabs()}</ul>
                {renderStep()}

                <div className="button-container">
                    {currentStep > 1 && <button type="button" onClick={handlePrev}>Previous</button>}
                    {currentStep < 7 && <button type="button" onClick={handleNext}>Next</button>}
                    {currentStep === 7 && (
                        <>
                            <button type="button" onClick={handlePrev}>Previous</button>
                            <button type="submit">Submit</button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

//    const renderTabs = () => {
//        const tabs = ['Personal Information', 'Documents', 'Final Review'];
//        return tabs.map((tab, index) => (
//            <li className="nav-item" key={index}>
//                <span
//                    className={`nav-link ${currentTab === index + 1 ? 'active' : ''}`}
//                    onClick={() => handleTabClick(index + 1)}
//                >
//                    {tab}
//                </span>
//            </li>
//        ));
//    };

//    return (
//        <div className="container">
//            <form encType="multipart/form-data" onSubmit={handleSubmit}>
//                <ul className="nav nav-tabs">{renderTabs()}</ul>
//                {renderStep()}
//            </form>
//        </div>
//    );
//};

export default RegistrationForm;