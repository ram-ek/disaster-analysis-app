import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchClimateChangeById, fetchAllClimateChanges } from '../services/api.js';
import "../styles/ClimateChangeDetails.css";

const ClimateChangeDetails = () => {
  const { id } = useParams();
  const [climateChange, setClimateChange] = useState(null);
  const [risingSeaLevelId, setRisingSeaLevelId] = useState(null);
  const [extremeWeatherEventsId, setExtremeWeatherEventsId] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    const getClimateChange = async () => {
      try {
        const result = await fetchClimateChangeById(id);
        setClimateChange(result.data);
      } catch (error) {
        console.error('Error fetching climate change:', error);
      }
    };

    const getRelatedClimateChangeIds = async () => {
      try {
        const allClimateChanges = await fetchAllClimateChanges();
        const risingSeaLevel = allClimateChanges.data.find(change => change.name === 'Rising Sea Levels');
        const extremeWeatherEvents = allClimateChanges.data.find(change => change.name === 'Extreme Weather Events');

        if (risingSeaLevel) setRisingSeaLevelId(risingSeaLevel._id);
        if (extremeWeatherEvents) setExtremeWeatherEventsId(extremeWeatherEvents._id);
      } catch (error) {
        console.error('Error fetching related climate changes:', error);
      }
    };

    getClimateChange();
    getRelatedClimateChangeIds();
  }, [id]);

  if (!climateChange) return <p className="loading">Loading...</p>;

  return (
    <div className="climate-change-details">
      <div className="climate-header">
        <img
          src={`${climateChange.images}`}
          alt={climateChange.name}
          className="climate-image"
        />
        <div className="climate-summary">
          <h2>{climateChange.name}</h2>
          <p className="climate-description">{climateChange.description}</p>
        </div>
      </div>

      <section className="climate-causes">
        <h3>Causes of {climateChange.name}</h3>
        <ul>
          {climateChange.causes.map((cause, index) => (
            <li key={index} className="cause-item">
              <h3>{cause.name}</h3>
              <h4>{cause.description}</h4>
            </li>
          ))}
          {/* {climateChange.name === 'Global Warming' && (
            <li className="cause-item">
              <iframe
                src="https://ourworldindata.org/grapher/total-ghg-emissions?tab=chart&country=~IDN"
                loading="lazy"
                style={{ width: '100%', height: '600px', border: '0px none' }}
                title="Greenhouse gas emissions"
              ></iframe>
              {Add other iframes for Global Warming}
            {</li>
          )}} */}
          {climateChange.name === 'Volcanic Erruptions' && (
            <li className="cause-item">
              <iframe
                src="https://ourworldindata.org/grapher/significant-volcanic-eruptions?tab=chart&country=~IDN"
                loading="lazy"
                style={{ width: '100%', height: '600px', border: '0px none' }}
                title="Significant Volcanic Eruptions"
              ></iframe>
            </li>
          )}
        </ul>
      </section>

      <section className="climate-disasters">
        <h3>Outcome of {climateChange.name}</h3>
        <ul>
          {/* {climateChange.name === 'Global Warming' ? (
            <>
              {risingSeaLevelId && (
                <li className="disaster-item">
                  <Link to={`/climate-change/${risingSeaLevelId}`}>Rising Sea Level</Link>
                </li>
              )}
              {extremeWeatherEventsId && (
                <li className="disaster-item">
                  <Link to={`/climate-change/${extremeWeatherEventsId}`}>Extreme Weather Events</Link>
                </li>
              )}
            </>
          ) : ( */
            climateChange.disasters && climateChange.disasters.map((disaster) => (
              <li key={disaster._id} className="disaster-item">
                <Link to={`/disaster/${disaster._id}`}>{disaster.name}</Link>
              </li>
            ))
          }
        </ul>
      </section>

      {/* static mitigation strategies for earthquakes */}
      {climateChange.name === 'Earthquakes' && (
        <section className="disaster-mitigation">
          <h3>Mitigation strategies for {climateChange.name}</h3>
          <ul>
            <li><strong>Stronger Building Codes:</strong> Enforce and update building codes to ensure all new construction is earthquake-resistant, especially in high-risk areas. This includes the use of materials and techniques that can withstand seismic forces.</li>
            <li><strong>Retrofitting Existing Structures:</strong> Many older buildings in Indonesia may not meet modern seismic safety standards. Retrofitting these buildings, especially critical infrastructure like hospitals, schools, and bridges, is essential.</li>
            <li><strong>Detailed Seismic Hazard Maps:</strong> Prepare comprehensive seismic hazard maps that identify earthquake-prone areas. These maps should be used for urban planning, construction, and disaster preparedness.</li>
            <li><strong>Implement Earthquake Early Warning Systems:</strong> These systems will provide more time for evacuation and response. Alerts should be sent to the public through SMS, radio, and TV broadcasts.</li>
          </ul>
        </section>
      )}

      {/* static mitigation strategies for volcanic erruptions */}
      {climateChange.name === 'Volcanic Erruptions' && (
        <section className="disaster-mitigation">
          <h3>Mitigation strategies for {climateChange.name}</h3>
          <ul>
            <li><strong>Advanced Monitoring Networks:</strong> Strengthen and expand the monitoring of active volcanoes using modern technologies such as seismometers, GPS, thermal imaging, and gas detectors. This will help detect signs of volcanic activity such as earthquakes, ground deformation, gas emissions, and increased temperature.</li>
            <li><strong>Volcano Preparedness Training:</strong> Provide ongoing training and drills for communities, especially those living in volcanic risk areas, to understand the risks and proper responses to volcanic hazards. This includes evacuation routes, shelters, and emergency protocols.</li>
            <li><strong>Volcanic Hazard Mapping:</strong> Produce and regularly update comprehensive volcanic hazard maps that identify the potential impact zones of lava flows, pyroclastic flows, ash fall, and lahars. These maps should inform urban planning and be made available to the public.</li>
            <li><strong>Volcano-Resilient Infrastructure:</strong> Ensure that critical infrastructure such as hospitals, schools, and bridges are designed to withstand volcanic events. For example, structures should be built to handle ashfall accumulation and lava flow barriers should be considered.</li>
          </ul>
        </section>
      )}

      {/* static mitigation strategies for forest fires */}
      {climateChange.name === 'Forest Fires' && (
        <section className="disaster-mitigation">
          <h3>Mitigation strategies for {climateChange.name}</h3>
          <ul>
            <li><strong>Stronger Enforcement of Regulations:</strong> Strengthen the enforcement of laws related to illegal land clearing and logging. This includes better monitoring of land-use activities, especially in forested areas and peatlands, and ensuring compliance with regulations that prohibit land clearing by fire.</li>
            <li><strong>Satellite Monitoring and Surveillance:</strong> Use satellite imagery and drone technology to monitor large swathes of forest and peatland to detect early signs of illegal land clearing and fire outbreaks. Indonesia's National Forest Monitoring System (NFMS) can be expanded for this purpose.</li>
            <li><strong>Promote Agroforestry and Sustainable Land Management:</strong> Encourage farmers to adopt sustainable agricultural practices that reduce the need for burning, such as agroforestry (growing crops alongside trees) and using mulching or composting instead of fire to clear land.</li>
            <li><strong>Develop Early Warning Systems:</strong> Implement advanced fire monitoring systems that can predict potential fire outbreaks based on climate conditions (e.g., temperature, humidity, wind speed), drought indicators, and land use. Use technologies like remote sensing, satellite imagery, and IoT sensors to detect fires in the early stages.</li>
          </ul>
        </section>
      )}

      {climateChange.name === 'Earthquakes' && (
        <section className="climate-analysis">
          <h3>Analysis of {climateChange.name}</h3>
          <div style={{ marginTop: '20px', marginBottom: '10px' }}>
            <a href="/earthquake-heatmap" className="heatmap-link">
              View Earthquake Heatmap
            </a>
          </div>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <a href="/earthquake-filter" className="filter-link">
              View Earthquake Data
            </a>
          </div>

          <button onClick={() => window.open("https://www.kaggle.com/code/ronakredkar123/indonesia-earthquake-analysis", "_blank")}>
          View Analysis
          </button>

        </section>
      )}

      {climateChange.name === 'Volcanic Erruptions' && (
        <section className="climate-analysis">
          <h3>Analysis of {climateChange.name}</h3>
          {/* <div style={{ marginTop: '20px', marginBottom: '10px' }}>
            <a href="/volcano-type-heatmap" className="heatmap-link">
              View Volcano Type Heatmap
            </a>
          </div>
          <div style={{ marginTop: '20px', marginBottom: '10px' }}>
            <a href="/volcano-density-heatmap" className="heatmap-link">
              View Volcano Density Heatmap
            </a>
          </div> */}
          <button onClick={() => window.open("https://www.kaggle.com/code/ronakredkar123/volcano-analysis-indonesia", "_blank")}>
          View Analysis
          </button>
        </section>
      )}

      {climateChange.name === 'Rising Sea Levels' && (
        <section className="climate-analysis">
          <h3>Analysis of {climateChange.name}</h3>
          <button onClick={() => window.open("https://www.kaggle.com/code/ronakredkar123/indonesia-flood-analysis-and-prediction", "_blank")}>
          View Analysis
          </button>
        </section>
      )}
    </div>

  );
};

export default ClimateChangeDetails;
