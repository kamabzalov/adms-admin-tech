import React, { useEffect, useState } from "react";
import "./styles/microservices.css";
import { Card } from "./small-components/CardComponent";
import * as MicroservicesService from "./../services/microservices.service";

//MC means microservices
interface MCCardProps {
  services: any[];
}
// Adding cards and names and descriptions for them
function MCCard({ services }: MCCardProps) {
  return (
    <>
      {services &&
        services.map((service, index) => {
          return (
            <Card
              key={index}
              name={service.name}
              state={service.state}
              description="Description of first microservice"
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

  return (
    <>
      <h1>Here are microservices</h1>
      <MCCard services={listOfServices} />
    </>
  );
};

export default Microservices;
