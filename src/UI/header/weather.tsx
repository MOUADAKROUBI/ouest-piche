import React, { useEffect, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { Position } from "@/lib/difinations";
import Cities from "../../../public/moroccanCities.json";
import WeatherSkelton from "./weatherSkelton";

export default function Weather({ screen }: { screen: string }) {
  const [resError, setResError] = useState<string | null>(null);
  const [cityCoords, setCityCoords] = useState<Position>({
    latitude: 30.4333,
    longitude: -9.6,
  });
  const [alert, setAlert] = useState<number | null>(null);
  const fetcher = (...args: [RequestInfo, RequestInit?]) =>
    fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_WEATHER_API}?key=${process.env.NEXT_PUBLIC_WEATHER_KEY}
    &q=${cityCoords.latitude},${cityCoords.longitude}
    &lang=fr`,
    fetcher
  );

  const handleClickGetCoordsAuth = () => {
    if (!navigator.geolocation) {
      setResError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCityCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        setResError("Error getting location: " + err.message);
      }
    );
  };

  useEffect(() => {
    if (data && data.forecast && data.forecast.forecastday) {
      const checkTideAlert = () => {
        const forecast = data.forecast.forecastday[0].day;
        const currentTime = new Date();
        const twoHoursInMillis = 2 * 60 * 60 * 1000;

        let closestTideIndex = null;
        let closestTimeDifference = Infinity;

        forecast.tides[0].tide.forEach((tide: any, index: number) => {
          const tideTime = new Date(tide.tide_time);
          const timeDifference = tideTime.getTime() - currentTime.getTime();

          if (
            timeDifference <= twoHoursInMillis &&
            timeDifference > 0 &&
            timeDifference < closestTimeDifference
          ) {
            closestTimeDifference = timeDifference;
            closestTideIndex = index;
          }
        });

        if (closestTideIndex !== null) {
          setAlert(closestTideIndex);
        } else {
          setAlert(null); // Clear alert if no tides are within 2 hours
        }
      };

      const intervalId = setInterval(checkTideAlert, 60000); // Check every minute
      return () => clearInterval(intervalId);
    }
  }, [data, cityCoords]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertX, setAlertX] = useState(0);
  const [alertY, setAlertY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowAlert(true);
    setAlertX(e.clientX);
    setAlertY(e.clientY);
  };

  if (error) return <h2>someting went wrong</h2>;

  const formatDate = (dateString: string, isTides: boolean): string => {
    // Create a Date object from the input date string
    const date = new Date(dateString);

    // Specify options for date formatting
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long", // full weekday name (e.g., "lundi")
      day: "numeric", // day of the month
      month: "long", // full month name
      year: "numeric", // four-digit year
      hour: "2-digit", // 12-hour or 24-hour time format (based on locale)
      minute: "2-digit", // minutes
    };

    // Format the date using French locale
    if (isTides)
      return new Intl.DateTimeFormat("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    else return new Intl.DateTimeFormat("fr-FR", options).format(date);
  };

  return (
    <div className={`weather-wrapper ${screen}`}>
      {isLoading ? (
        <WeatherSkelton />
      ) : (
        <>
          <div className="location-current-date">
            <span className="date">
              {data.location.name + "/Maroc"},{" "}
              {formatDate(data.location.localtime, false)}
            </span>
            <div className="select-city">
              <label htmlFor="city">choisissez votre ville:</label>
              <select
                name="city"
                id="city"
                onChange={(e) =>
                  setCityCoords({
                    latitude: Number(e.target.value.split(",")[0]),
                    longitude: Number(e.target.value.split(",")[1]),
                  })
                }
              >
                {Cities.map((city, index) => (
                  <option
                    key={index}
                    value={`${city.lat},${city.lng}`}
                    selected={`${city.lat},${city.lng}` === `${cityCoords.latitude},${cityCoords.longitude}`}
                  >
                    {city.city}
                  </option>
                ))}
              </select>
              <div className="get-coord-auto">
                <button
                  onClick={handleClickGetCoordsAuth}
                  className="location-btn"
                  title="obtenir votre position authomatiqment"
                  aria-label="obtenir votre position authomatiqment"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    width={34}
                    height={34}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M19 12C19 15.866 15.866 19 12 19M19 12C19 8.13401 15.866 5 12 5M19 12H21M12 19C8.13401 19 5 15.866 5 12M12 19V21M5 12C5 8.13401 8.13401 5 12 5M5 12H3M12 5V3M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                        stroke="#333"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="weather-state">
            <div className="weather-today">
              <div className="icon-weather-today-avg-temp">
                <Image
                  src={`https:${data.forecast.forecastday[0].day.condition.icon}`}
                  alt={`${data.forecast.forecastday[0].day.condition.text}`}
                  width={75}
                  height={75}
                />
                <div className="avg-temp">
                  {data.forecast.forecastday[0].day.avgtemp_c} °C
                </div>
                <div className="min-max-temp">
                  <div className="max-temp">
                    <h4>{data.forecast.forecastday[0].day.maxtemp_c} °C</h4>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      width={20}
                      height={20}
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#333"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z"
                          fill="#333"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                  <div className="min-temp">
                    <h4>{data.forecast.forecastday[0].day.mintemp_c} °C</h4>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      width={20}
                      height={20}
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#333"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 3C12.5523 3 13 3.44772 13 4V17.5858L18.2929 12.2929C18.6834 11.9024 19.3166 11.9024 19.7071 12.2929C20.0976 12.6834 20.0976 13.3166 19.7071 13.7071L12.7071 20.7071C12.3166 21.0976 11.6834 21.0976 11.2929 20.7071L4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929C4.68342 11.9024 5.31658 11.9024 5.70711 12.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3Z"
                          fill="#333"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="condition-text">
                  {data.forecast.forecastday[0].day.condition.text}
                </h4>
                <div className="wind-humidity">
                  <h4 className="wind">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      width={20}
                      height={20}
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#333"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M13 1H11V3H13C13.5523 3 14 3.44772 14 4C14 4.55228 13.5523 5 13 5H2V7H13C14.6569 7 16 5.65685 16 4C16 2.34315 14.6569 1 13 1Z"
                          fill="#333"
                        ></path>{" "}
                        <path
                          d="M0 11H11C11.5523 11 12 11.4477 12 12C12 12.5523 11.5523 13 11 13H9V15H11C12.6569 15 14 13.6569 14 12C14 10.3431 12.6569 9 11 9H0V11Z"
                          fill="#333"
                        ></path>{" "}
                      </g>
                    </svg>{" "}
                    Vitesse du vent:{" "}
                    {data.forecast.forecastday[0].day.maxwind_kph}
                    kph
                  </h4>
                  <h4 className="humidity">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      width={20}
                      height={20}
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#333"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M15.0066 3.25608C16.8483 2.85737 19.1331 2.8773 22.2423 3.65268C22.7781 3.78629 23.1038 4.32791 22.9699 4.86241C22.836 5.39691 22.2931 5.7219 21.7573 5.58829C18.8666 4.86742 16.9015 4.88747 15.4308 5.20587C13.9555 5.52524 12.895 6.15867 11.7715 6.84363L11.6874 6.89494C10.6044 7.55565 9.40515 8.28729 7.82073 8.55069C6.17734 8.82388 4.23602 8.58235 1.62883 7.54187C1.11607 7.33724 0.866674 6.75667 1.0718 6.24513C1.27692 5.73359 1.85889 5.48479 2.37165 5.68943C4.76435 6.6443 6.32295 6.77699 7.492 6.58265C8.67888 6.38535 9.58373 5.83916 10.7286 5.14119C11.855 4.45445 13.1694 3.6538 15.0066 3.25608Z"
                          fill="#333"
                        ></path>{" "}
                        <path
                          d="M22.2423 7.64302C19.1331 6.86765 16.8483 6.84772 15.0066 7.24642C13.1694 7.64415 11.855 8.44479 10.7286 9.13153C9.58373 9.8295 8.67888 10.3757 7.492 10.573C6.32295 10.7673 4.76435 10.6346 2.37165 9.67977C1.85889 9.47514 1.27692 9.72393 1.0718 10.2355C0.866674 10.747 1.11607 11.3276 1.62883 11.5322C4.23602 12.5727 6.17734 12.8142 7.82073 12.541C9.40515 12.2776 10.6044 11.546 11.6874 10.8853L11.7715 10.834C12.895 10.149 13.9555 9.51558 15.4308 9.19621C16.9015 8.87781 18.8666 8.85777 21.7573 9.57863C22.2931 9.71224 22.836 9.38726 22.9699 8.85275C23.1038 8.31825 22.7781 7.77663 22.2423 7.64302Z"
                          fill="#333"
                        ></path>{" "}
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.9998 10.0266C18.6526 10.0266 18.3633 10.2059 18.1614 10.4772C18.0905 10.573 17.9266 10.7972 17.7089 11.111C17.4193 11.5283 17.0317 12.1082 16.6424 12.7555C16.255 13.3996 15.8553 14.128 15.5495 14.8397C15.2567 15.5213 14.9989 16.2614 14.9999 17.0117C15.0006 17.2223 15.0258 17.4339 15.0604 17.6412C15.1182 17.9872 15.2356 18.4636 15.4804 18.9521C15.7272 19.4446 16.1131 19.9674 16.7107 20.3648C17.3146 20.7664 18.0748 21 18.9998 21C19.9248 21 20.685 20.7664 21.2888 20.3648C21.8864 19.9674 22.2724 19.4446 22.5192 18.9522C22.764 18.4636 22.8815 17.9872 22.9393 17.6413C22.974 17.4337 22.9995 17.2215 22.9998 17.0107C23.0001 16.2604 22.743 15.5214 22.4501 14.8397C22.1444 14.128 21.7447 13.3996 21.3573 12.7555C20.968 12.1082 20.5803 11.5283 20.2907 11.111C20.073 10.7972 19.909 10.573 19.8382 10.4772C19.6363 10.2059 19.3469 10.0266 18.9998 10.0266ZM20.6119 15.6257C20.3552 15.0281 20.0049 14.3848 19.6423 13.782C19.4218 13.4154 19.2007 13.0702 18.9998 12.7674C18.7989 13.0702 18.5778 13.4154 18.3573 13.782C17.9948 14.3848 17.6445 15.0281 17.3878 15.6257L17.3732 15.6595C17.1965 16.0704 16.9877 16.5562 17.0001 17.0101C17.0121 17.3691 17.1088 17.7397 17.2693 18.0599C17.3974 18.3157 17.574 18.5411 17.8201 18.7048C18.06 18.8643 18.4248 19.0048 18.9998 19.0048C19.5748 19.0048 19.9396 18.8643 20.1795 18.7048C20.4256 18.5411 20.6022 18.3156 20.7304 18.0599C20.8909 17.7397 20.9876 17.3691 20.9996 17.01C21.0121 16.5563 20.8032 16.0705 20.6265 15.6597L20.6119 15.6257Z"
                          fill="#333"
                        ></path>{" "}
                        <path
                          d="M14.1296 11.5308C14.8899 11.2847 15.4728 12.076 15.1153 12.7892C14.952 13.1151 14.7683 13.3924 14.4031 13.5214C13.426 13.8666 12.6166 14.3527 11.7715 14.8679L11.6874 14.9192C10.6044 15.5799 9.40516 16.3115 7.82074 16.5749C6.17735 16.8481 4.23604 16.6066 1.62884 15.5661C1.11608 15.3615 0.866688 14.7809 1.07181 14.2694C1.27694 13.7578 1.8589 13.509 2.37167 13.7137C4.76436 14.6685 6.32297 14.8012 7.49201 14.6069C8.67889 14.4096 9.58374 13.8634 10.7286 13.1654C11.8166 12.5021 12.9363 11.9171 14.1296 11.5308Z"
                          fill="#333"
                        ></path>{" "}
                      </g>
                    </svg>{" "}
                    humidité: {data.forecast.forecastday[0].day.avghumidity}%
                  </h4>
                </div>
              </div>
            </div>
            <div className="tides">
              <div className="line"></div>
              {data.forecast.forecastday[0].day.tides[0].tide.map(
                (tide: any, index: number) => {
                  return (
                    <>
                      <div
                        className={`tide ${alert === index ? "alert" : ""}`}
                        key={index}
                        onMouseMove={(e) => handleMouseMove(e)}
                        onMouseLeave={() => setShowAlert(false)}
                      >
                        <div className="tide-time">
                          {formatDate(tide.tide_time, true)}
                        </div>
                        <div className="tide-icon-type">
                          {tide.tide_type === "HIGH" ? (
                            <>
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                width={30}
                                height={30}
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#333"
                              >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  {" "}
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z"
                                    fill="#333"
                                  ></path>{" "}
                                </g>
                              </svg>
                              <h4 className="tide-type">marée haute</h4>
                            </>
                          ) : (
                            <>
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                width={30}
                                height={30}
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#333"
                              >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  {" "}
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 3C12.5523 3 13 3.44772 13 4V17.5858L18.2929 12.2929C18.6834 11.9024 19.3166 11.9024 19.7071 12.2929C20.0976 12.6834 20.0976 13.3166 19.7071 13.7071L12.7071 20.7071C12.3166 21.0976 11.6834 21.0976 11.2929 20.7071L4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929C4.68342 11.9024 5.31658 11.9024 5.70711 12.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3Z"
                                    fill="#333"
                                  ></path>{" "}
                                </g>
                              </svg>
                              <h4 className="tide-type">marée basse</h4>
                            </>
                          )}
                        </div>
                        <div className="tide-height">
                          hauteur de la marée:{" "}
                          <span style={{ textDecoration: "underline" }}>
                            {tide.tide_height_mt}
                          </span>
                        </div>

                        {/* Conditional Alert Notification */}
                        {showAlert && alert == index && (
                          <div
                            className="alert-ntf"
                            style={{
                              top: `${alertY - 80}px`,
                              left: `${alertX - 100}px`,
                            }}
                          >
                            <span>
                              Attention! la prochaine marée est dans moins de 2
                              heures
                            </span>
                          </div>
                        )}
                      </div>

                      {index <
                        data.forecast.forecastday[0].day.tides[0].tide.length -
                          1 && <div className="line"></div>}
                    </>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
