import React, { useState } from 'react';
import axios from 'axios';
import './Utilization.css';
import { useNavigate } from 'react-router-dom';

const Utilization = () => {
    const [days, setDays] = useState([
        { day: 'Monday', selected: false, startTime: '', endTime: '', occupancy: '' },
        { day: 'Tuesday', selected: false, startTime: '', endTime: '', occupancy: '' },
        { day: 'Wednesday', selected: false, startTime: '', endTime: '', occupancy: '' },
        { day: 'Thursday', selected: false, startTime: '', endTime: '', occupancy: '' },
        { day: 'Friday', selected: false, startTime: '', endTime: '', occupancy: '' },
        { day: 'Saturday', selected: false, startTime: '', endTime: '', occupancy: '' },
        { day: 'Sunday', selected: false, startTime: '', endTime: '', occupancy: '' }
    ]);

    const navigate = useNavigate();

    const handleDayChange = (index) => {
        const updatedDays = [...days];
        updatedDays[index].selected = !updatedDays[index].selected;
        if (!updatedDays[index].selected) {
            updatedDays[index].startTime = '';
            updatedDays[index].endTime = '';
            updatedDays[index].occupancy = '';
        }
        setDays(updatedDays);
    };

    const handleInputChange = (index, field, value) => {
        const updatedDays = [...days];
        updatedDays[index][field] = value;
        setDays(updatedDays);
    };

    const convertTo24Hour = (time) => {
        const [hours, minutes] = time.split(':');
        return (parseInt(hours) < 10 ? `0${hours}` : hours) + ':' + minutes;
    };

    const calculateTimeDifference = (startTime, endTime) => {
        const start = new Date(`1970-01-01T${convertTo24Hour(startTime)}:00Z`);
        const end = new Date(`1970-01-01T${convertTo24Hour(endTime)}:00Z`);
        const differenceInMinutes = (end - start) / 60000;
        const hours = Math.floor(differenceInMinutes / 60);
        const minutes = differenceInMinutes % 60;
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const selectedDays = days.filter(day => day.selected).map(day => {
            const timeDifference = calculateTimeDifference(day.startTime, day.endTime);
            return {
                day: day.day,
                time: timeDifference,
                occupancy: day.occupancy
            };
        });

        axios.post('http://localhost:8081/utilization', selectedDays)
            .then(response => {
                console.log(response.data);
                navigate('/equipment');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="form-container p-4 border border-dark rounded bg-light">
                <h2 className="form-title mb-4">Utilization</h2>
                <div className="header-row mb-3">
                    <h4>Select Day(s)</h4>
                    <h4>Start Time</h4>
                    <h4>End Time</h4>
                    <h4>Number Of People</h4>
                </div>
                {days.map((day, index) => (
                    <div key={index} className={`day-row mb-3 ${day.selected ? 'selected' : ''}`}>
                        <div className="form-group">
                            <input
                                type="checkbox"
                                checked={day.selected}
                                onChange={() => handleDayChange(index)}
                            />
                            <span>{day.day}</span>
                        </div>
                        <div className="form-group">
                            <input
                                type="time"
                                value={day.startTime}
                                onChange={(e) => handleInputChange(index, 'startTime', e.target.value)}
                                disabled={!day.selected}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="time"
                                value={day.endTime}
                                onChange={(e) => handleInputChange(index, 'endTime', e.target.value)}
                                disabled={!day.selected}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="number"
                                value={day.occupancy}
                                onChange={(e) => handleInputChange(index, 'occupancy', e.target.value)}
                                disabled={!day.selected}
                                className="form-control"
                            />
                        </div>
                    </div>
                ))}
                <button type="submit" className="btn btn-primary mt-3 w-100">Submit</button>
            </form>
        </div>
    );
};

export default Utilization;
