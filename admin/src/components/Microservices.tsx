import React, { useCallback, useEffect, useState } from "react";
import "./styles/microservices.css";
import { Card } from "./small-components/CardComponent";
import * as MicroservicesService from "./../services/microservices.service";

//MC means microservices
interface MCCardProps {
  services: any[];
  onChangeState: (id: number, state: boolean) => void;
}
// Adding cards and names and descriptions for them
function MCCard({ services, onChangeState }: MCCardProps) {
  return (
    <>
      {services &&
        services.map((service, index) => {
          return (
            <Card
              key={index}
              name={service.name}
              state={(service.status as string).toUpperCase().includes("OK")}
              description={"Service started: " + service.started}
              index={service.index}
              onChange={onChangeState}
            />
          );
        })}
    </>
  );
}

// MCs page component
const Microservices: React.FC = () => {
  const [listOfServices, setListOfServices] = useState<any[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    if (!loaded) {
      const microservices = MicroservicesService.listServices().then(
        (response) => {
          setListOfServices(response.data);
          setLoaded(true);
          return response.data;
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          //setLoading(false);
          //setMessage(resMessage);
        }
      );
    }
  }, [listOfServices]);
  /*const onButtonPressed = useCallback(() => {
    const response = MicroservicesService.getServiceState(1).then(
      (response) => {
        console.warn(response);
        console.warn(response.data);
        return response.data;
      }
    );
  }, []);*/

  const onChangeServiceState = useCallback((id: number, state: boolean) => {
    if (!state) {
      const response = MicroservicesService.startService(id).then(
        (response) => {
          return response.data;
        }
      );
    } else {
      const response = MicroservicesService.stopService(id).then((response) => {
        return response.data;
      });
    }
  }, []);

  return (
    <>
      <h1>Here are microservices</h1>
      {/*<button onClick={onButtonPressed}>Button</button>*/}
      <MCCard onChangeState={onChangeServiceState} services={listOfServices} />
    </>
  );
};

export default Microservices;
