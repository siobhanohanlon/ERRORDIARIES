import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PatientList = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3306/patients')
            .then(response => setPatients(response.data))
            .catch(error => console.error('There was an error fetching the patients!', error));
    }, []);

    return (
        <div>
            <h1>PatientList</h1>
            <ul>
                {patients.map(patient => (
                    <li key={patient.id}>
                        {patient.firstName} {patient.lastName} - {patient.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientList;
