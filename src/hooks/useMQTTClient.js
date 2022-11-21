import React, { useState, useContext, createContext } from "react";
// importar Paho
// import MyMqtt from "mqtt";
import Paho from "paho.mqtt.js";

const Context = createContext();

export function ProviderMQTT({ children }) {
  const mqtt = useProviderMQTT();
  return <Context.Provider value={mqtt}>{children}</Context.Provider>;
}

export const useMQTT = () => {
  return useContext(Context);
};

function useProviderMQTT() {
  const [client, setClient] = useState(null);
  const [broker, setBroker] = useState(null);
  const [port, setPort] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState({});
  const [error, setError] = useState(null);

  const connect = (host, port, clientId) => {
    const client = new Paho.Client(host, port, clientId);
    client.connect({
      onSuccess: () => {
        console.log("Conectado");
        setConnected(true);
        setClient(client);
        setBroker(host);
        setPort(port);
        setClientId(clientId);
      },
      onFailure: (error) => {
        console.log("Error al conectar", error);
        setError(error);
      },
    });

    client.onConnectionLost = (error) => {
      setError(error);
    };

    // ---------------------------------------------

    // const client = MyMqtt.connect(`ws://${host}:${port}`, {
    //   clientId,
    // });

    // console.log("Hola");

    // client.on("connect", () => {
    //   console.log("Conectado");
    //   setConnected(true);
    //   setClient(client);
    //   setClientId(clientId);
    // });

    // client.on("error", (error) => {
    //   console.log("Error al conectar", error);
    //   setError(error);
    // });

    // client.on("close", (error) => {
    //   setError(error);
    // });
  }

  const subscribe = (topic) => {
    if (client) {
      client.subscribe(topic);
      client.onMessageArrived = (message) => {
        setMessage({ message: message.payloadString, topic: message.destinationName });
      };
    }else {
      setError('Cliente no connectado');
    }
  };

  const publish = (topic, payload) => {
    if (client) {
      console.log("Publicando");
      const message = new Paho.Message(payload);
      message.destinationName = topic;
      client.send(message);
    }else {
      setError('Cliente no connectado');
    }
  };

  const disconnect = () => {
    if (client) {
      client.disconnect();
      setConnected(false);
      setClient(null);
    }
  };


  return {
    connected,
    connect,
    subscribe,
    publish,
    message,
    error,
    clientId,
    broker,
    port,
    disconnect,
  }

}