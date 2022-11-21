import React, {useEffect, useRef} from 'react'
import IoTImage from "@images/iot.webp";
import { useMQTT } from '@hooks/useMQTTClient';
import * as yup from 'yup';


const FormConnect = () => {

  const { connect, connected, disconnect, clientId, broker, port } = useMQTT();


  const clientIdOp = `ws-${Math.random().toString(36).substr(2, 9)}`;
  const [errors, setErrors] = React.useState(null);
  const form = useRef(null);
  const handleClick = (e) => {
    e.preventDefault();
    if (!connected) {
      let formData = new FormData(form.current);

      let schema = yup.object().shape({
        broker: yup.string().required("La IP es requerida"),
        port: yup.number("Debe ser un numero").required("El puerto es requerido"),
        clientId: yup.string().required("Ingrese un ID de cliente"),
      });

      schema.validate({
        broker: formData.get('broker'),
        port: formData.get('port'),
        clientId: formData.get('clientId'),
      }).then((value) => {
        console.log(value);
        connect(value.broker, value.port, value.clientId);
      }).catch((err) => {
        setErrors(err.errors);
      });
    }else {
      disconnect();
    }
  }

  useEffect(() => {
    if (errors) {
      setTimeout(() => {
        setErrors(null);
      }, 3000);
    }
  }, [errors]);
  return (
    // style={{maxWidth: 540}}
    <div>
      { errors && errors && <div className="alert alert-danger ml-4 mr-4 mt-1" role="alert">{errors}</div> }
      <div className="card m-4">
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title text-primary fs-2 font-weight-bold">Conectar con el broker</h5>
              <p className="card-text">Ingrese los datos del broker MQTT del cual recibirá la información.</p>
              <form ref={form}>
                <div className='row'>
                  <div className="mb-3 col-md-8">
                    <label htmlFor="broker" className="form-label">Direccion IP broker</label>
                    <input type="text" className="form-control" id="broker" name='broker' value={broker} />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                  </div>
                  <div className="mb-3 col-md-3">
                    <label htmlFor="port" className="form-label">Puerto</label>
                    <input type="number" className="form-control" name='port' id='port' value={port}/>
                  </div>
                </div>
                <div className='row'>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="clientId" className="form-label">ID cliente</label>
                    <input type="text" name='clientId' id='clientId' className="form-control" value={(clientId)?clientId:clientIdOp}/>
                  </div>
                </div>
                <button className={`btn btn-${(connected)?"danger":"primary"}`}
                  onClick={handleClick}
                >{(connected)?"Desconectar":"Conectar"}</button>
              </form>
            </div>
          </div>
          <div className="col-md-4 overflow-hidden">
            <img src={IoTImage.src} className="img-fluid rounded-start" style={{height: '100%', margin: 'auto'}} alt="..." />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormConnect