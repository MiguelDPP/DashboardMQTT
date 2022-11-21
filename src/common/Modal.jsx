import React, { useEffect, useRef } from 'react'

const Modal = ({handle, setHandle, topic, setTopic, aleatorio}) => {

  const button = useRef(null);

  useEffect(() => {
    if (button.current !== null && handle) {
      let btn = button.current;
      btn.click();
    }
  }, [handle]);

  const newTopic = useRef(null);

  const handleTopic = (e) => {
    if (newTopic.current !== null) {
      setTopic(newTopic.current.value);
    }
    setHandle(false);
  }

  return (
    <>
      {/* Button trigger modal */}
      <button type="button" ref={button} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target={`#modal-${aleatorio}`} >
        Launch demo modal
      </button>


      {/* Modal */}
      <div className="modal fade" id={`modal-${aleatorio}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Configuracion</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleTopic} aria-label="Close" />
            </div>
            <div className="modal-body">
              <form>
                <div class="mb-3">
                  <label for="topic" class="col-form-label">Topico:</label>
                  <input type="text" ref={newTopic} class="form-control" id="topic" placeholder={topic} />
                </div>
              </form> 
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleTopic}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleTopic} data-bs-dismiss="modal">Guardar Cambios</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Modal