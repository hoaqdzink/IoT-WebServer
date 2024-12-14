import React from 'react';
import Temperature from "../components/TemperatureChart";
import SoilHumidity from "../components/SoilHumidityChart";
import HumidityChart from '../components/HumidityChart';

const Data = () => {
    return (
        <main>
            <div>
                <Temperature/>
            </div>
                <SoilHumidity/>
            <div>
                <HumidityChart />
            </div>
        </main>
    );
}

export default Data;