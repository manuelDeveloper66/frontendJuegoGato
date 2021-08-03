import React from "react";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }
    render() {
        return(

            <div className="container">
                <div className="row text-center login-page">
                    <div className="col-md-12 login-form">
                        <form action="claseDestino.php" method="post">
                            <div className="row">
                                <div className="col-md-12 login-form-header">
                                    <p className="login-form-font-header">Tic Tac <span>Toe</span></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 login-from-row">
                                    <input name="usuario" type="text" placeholder="Usuario" required/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 login-from-row">
                                    <input name="password" type="password" placeholder="Contraseña" required/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 login-from-row">
                                    <button className="btn btn-info">Inicio</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login;