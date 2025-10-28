import axios from 'axios';
import './AllDesign.css';
import PatientInformation from './PatientInformation';
import { useEffect, useState } from 'react';
import { PatientProps } from './interface';
import { Link, useParams } from 'react-router-dom';
import SidebarLogin from './SidebarLogin';
import Health from './Health';

export default function BedDetails() {
    const [user, setUser] = useState<PatientProps | null>(null);
    const { patientID } = useParams();
    const storedInfo = sessionStorage.getItem("info");
    const info = storedInfo ? JSON.parse(storedInfo) : null;
    const patientByIdUrl = `http://localhost:3000/patients/${patientID}`;

    useEffect(() => {
        axios.get(patientByIdUrl)
            .then(response => setUser(response.data))
            .catch(error => console.error('Error fetching user:', error));
    }, [patientByIdUrl]);
    return (
        <div className="container-fluid pt-5 mt-5">
            {/* --- Patient Info --- */}
            <div className="row">
                <div className="col-lg-9 order-2 order-lg-1">
                    <div className="row align-items-stretch">
                        {/* Left column */}
                        <div className="col-lg-6 col-sm-12 d-flex">
                            <div className="w-100 d-flex flex-column border whiteBg marginBottom dropShadow p-3">
                                {user && (
                                    <PatientInformation
                                        image={user.image}
                                        fullName={user.fullName}
                                        gender={user.gender == "1" ? 'Male' : 'Female'}
                                        dob={user.dob?.split('T')[0]}
                                        phone={user.phone}
                                        patientID={user.patientID}
                                        address={user.address}
                                        email={user.email}
                                        BHYT={user.BHYT}
                                        admissionDate={user.admissionDate?.split('T')[0]}
                                        relativeName={user.relativeName}
                                        relativeNumber={user.relativeNumber}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Right column */}
                        <div className="col-lg-6 col-sm-12 d-flex">
                            <div className="w-100 d-flex flex-column border whiteBg marginBottom dropShadow p-3">
                                <h5 className="blueText">Diagnose</h5>

                                <p className="blueText">Hospitalization diagnosis:</p>
                                {user?.hospitalizationsDiagnosis ? (
                                    <p>{user.hospitalizationsDiagnosis}</p>
                                ) : (
                                    <p className="placeholder-glow">
                                        <span className="placeholder col-8"></span>
                                    </p>
                                )}

                                <p className="blueText">Summary of disease process:</p>
                                {user?.summaryCondition ? (
                                    <p>{user.summaryCondition}</p>
                                ) : (
                                    <p className="placeholder-glow">
                                        <span className="placeholder col-10"></span>
                                    </p>
                                )}

                                <p className="blueText">Discharge diagnosis:</p>
                                {user?.dischargeDiagnosis ? (
                                    <p>{user.dischargeDiagnosis}</p>
                                ) : (
                                    <p className="placeholder-glow">
                                        <span className="placeholder col-6"></span>
                                    </p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Sidebar */}
                <div className="col-lg-3 order-1 order-lg-2">
                    <div className="leftBody border whiteBg marginBottom dropShadow">
                        <SidebarLogin phone={info?.phone || ""} fullName={info?.fullName || ""} />
                    </div>
                    <div className="leftBody border whiteBg dropShadow marginBottom">
                        <h6 className="whiteText blueBg featureHead">Feature</h6>
                        <ul className="list-unstyled p-2">
                            <li><Link to="/home/shift-change" className="text-decoration-none"><i className="fa fa-caret-right" /> Shift change registration</Link></li>
                            <li><Link to="/home/daily-checking" className="text-decoration-none"><i className="fa fa-caret-right" /> Daily checking health</Link></li>
                            <li><Link to="/home/schedule" className="text-decoration-none"><i className="fa fa-caret-right" /> Schedule</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* --- Health Records --- */}
            <Health />
        </div>
    );
}
