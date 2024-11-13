import React from 'react'

export default function WeatherSkelton() {
  return (
    <div className={`weather-wrapper loading`}>
      <div className="location-current-date">
        <div className="date skelton"></div>
        <div className="select-city skelton"></div>
      </div>
      <div className="weather-state">
        <div className="weather-today skelton">
          
        </div>
        <div className="tides">
          <div className="line"></div>
          {[1,2,3,4].map(
            (index) => {
              return (
                <>
                  <div
                    className={`tide skelton`}
                    key={index}
                  ></div>

                  {index <3  && (
                    <div className="line"></div>
                  )}
                </>
              );
            }
          )}
        </div>
      </div>
    </div>
  )
}
