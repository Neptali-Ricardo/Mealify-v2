import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";

export const Form_Inicio = () =>{

    const { actions } = useContext(Context)
    const [formData, setFormData] = useState({
        
    })


    return(
        <div className="tab-pane fade show active">
                <form>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <button
                      type="button"
                      className="btn btn-link p-0 text-decoration-none"
                      style={{ color: '#6f42c1' }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="btn w-100 text-white"
                    style={{ backgroundColor: '#6f42c1' }}
                  >
                    Login
                  </button>
                </form>
              </div>
    )



}