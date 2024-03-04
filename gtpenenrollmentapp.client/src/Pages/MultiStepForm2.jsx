import React from 'react';
import { useState } from 'react';
import '../App.css'

const MultiStepForm2 = () => {
    const [currentTab, setCurrentTab] = useState(1);
    const [currentStep, setCurrentStep] = useState(1);
    const [formValues, setFormValues] = useState({
        surname: '',
        firstName: '',
        otherNames: '',
        gender: '',
        maritalStatus: '',
        nin: '',
        phoneNumber: '',
        emailAddress: '',
        dob: '',
        passportImg: null,
        signatureImg: null,
        employmentLetterImg: null,
        meansOfIdImg: null,
        nationalIdImg: null,
        firstAppointmentLetterImg: null,
    });

    const handleSave = () => {
        //setStep(step + 1);
        //setCurrentTab(currentTab + 1);
    };

    const [passportImgSrc, setPassportImgSrc] = useState('');
    const [signatureImgSrc, setSignatureImgSrc] = useState('');

    const showPic = (input) => {
        if (input.files && input.files[0]) {
            const filerdr = new FileReader();
            filerdr.onload = function (e) {
                setPassportImgSrc(e.target.result);
            };
            filerdr.readAsDataURL(input.files[0]);
        }
    };

    const showSig = (input) => {
        if (input.files && input.files[0]) {
            const filerdr = new FileReader();
            filerdr.onload = function (e) {
                setSignatureImgSrc(e.target.result);
            };
            filerdr.readAsDataURL(input.files[0]);
        }
    };


    const handleChange = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value, });
    };

    const handleFileChange = (field, file) => {
        setFormValues({ ...formValues, [field]: file });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Your form submission logic here
        console.log('Form submitted:', formValues);
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
        setCurrentTab(currentTab - 1);
    };

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
        setCurrentTab(currentTab + 1);
    };

    const renderStep = () => {
        switch (currentStep, currentTab) {
            case 1:
                return (
                    <div>
                        <div className={`tab-pane fade show ${currentTab === 1 ? 'active' : ''}`}>
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
                            <input type="radio" id="male" name="fav_language" value="Male" />
                            <label htmlFor="male">Male</label>
                            <input type="radio" id="female" name="fav_language" value="Female" />
                            <label htmlFor="female">Female</label>
                        </div>
                        <div>
                            <label htmlFor="marriedstatus">Marital Status:</label>

                            <select name="marriedstatus" id="marriedstatus">
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                                <option value="separated">Separated</option>
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
                            <label className="form-input" htmlFor="Title">Phone Number </label>
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
                            <label className="form-input" htmlFor="Title">Email Address</label>
                            <input
                                type="email"
                                id="Nin"
                                name="Nin"
                                placeholder="Enter your Email here"
                                value={formValues.emailAddress}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="form-input" htmlFor="Title">Date of Birth</label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={formValues.dob}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" onClick={handleSave}>Save</button>
                        <button type="submit" onClick={handleNext}>Next</button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <div className={`tab-pane fade show ${currentTab === 2 ? 'active' : ''}`}>
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
                                            <input type="file" onChange={(e) => showPic(e.target)} />
                                        </td>
                                        <td className="col-md-1">

                                            <img id="passportImg" height="140" width="120"

                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="col-md-4">
                                            <label className="control-label col-md-4" htmlFor="SignatureImagePath">Signature</label>
                                        </td>
                                        <td className="form-control col-md-7">
                                            <input type="file" onChange={(e) => showSig(e.target)} />
                                        </td>
                                        <td className="col-md-1">

                                            <img id="signatureImg" height="140" width="120"

                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="col-md-4 control-label">
                                            <label className="control-label col-md-4" htmlFor="EmploymentLetterImagePath">EmploymentLetter</label>
                                        </td>
                                        <td className="form-control col-md-7">
                                            <input type="file" name="EmploymentLetterImageFile" />
                                        </td>
                                        <td className="col-md-1">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="col-md-4">
                                            <label className="control-label col-md-4" htmlFor="MeansOfIDImagePath">MeansOfID</label>
                                        </td>
                                        <td className="form-control col-md-1">
                                            <input type="file" name="MeansOfIDImageFile" />
                                        </td>
                                        <td className="col-md-1">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="col-md-4">
                                            <label className="control-label col-md-4" htmlFor="NationalIDImagePath">NationalID/EnrolmentSlip</label>
                                        </td>
                                        <td className="col-md-7 form-control">
                                            <input type="file" name="NationalIDImageFile" />
                                        </td>
                                        <td className="col-md-1">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="col-md-4">
                                            <label className="control-label col-md-4" htmlFor="FirstAppointmentLetterImagePath">FirstAppointmentLetter</label>
                                        </td>
                                        <td className="form-control col-md-8">
                                            <input type="file" name="FirstAppointmentLetterImageFile" />
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

                        <button type="submit" onClick={handlePrev}>Previous</button>
                        <button type="submit" onClick={handleNext}>Next</button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <div>
                            <div className={`tab-pane fade show ${currentTab === 3 ? 'active' : ''}`}>
                            <h2>Final Review</h2>
                            <p>Email: {formValues.emailAddress}</p>
                            <p>Full Name: {formValues.firstName}</p>
                            <p>Contact Address: {formValues.emailAddress}</p>
                            <button onClick={handlePrev}>Previous</button>
                            <button onClick={handleSubmit}>Submit</button>
                            </div>
                            </div>
                    </div>
                );
            case 4:
                return (
                    <div>
                        {/* Step 4 content */}
                        {/* ... */}
                    </div>
                );
            default:
                return null;
        }
    };
    const handleTabClick = (tab) => {
        setCurrentTab(tab);
    };

    const renderTabs = () => {
        const tabs = ['Personal Information', 'Documents', 'Final Review'];
        return tabs.map((tab, index) => (
            <li className="nav-item" key={index}>
                <span
                    className={`nav-link ${currentTab === index + 1 ? 'active' : ''}`}
                    onClick={() => handleTabClick(index + 1)}
                >
                    {tab}
                </span>
            </li>
        ));
    };

    return (
        <div className="container mt-4">
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <ul className="nav nav-tabs">{renderTabs()}</ul> 
                {renderStep()}

                {/*<div className="button-container">*/}
                {/*    {currentStep > 1 && <button type="button" onClick={handlePrev}>Previous</button>}*/}
                {/*    {currentStep < 4 && <button type="button" onClick={handleNext}>Next</button>}*/}
                {/*    {currentStep === 4 && (*/}
                {/*        <>*/}
                {/*            <button type="button" onClick={handlePrev}>Previous</button>*/}
                {/*            <button type="submit">Submit</button>*/}
                {/*        </>*/}
                {/*    )}*/}
                {/*</div>*/}
            </form>
        </div>
    );
};

export default MultiStepForm2;