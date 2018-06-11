import React from 'react';
import { signup, signin } from '../routes/servicios.jsx';

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        const result = await signup(email, password);
        console.log('Result', result.returnObject)
        this.setState({ email, password });
        let $this = this;
        if (typeof result === typeof undefined) {
            toastr.error('Erorr en los credenciales');
        } else {
            setTimeout(function () {
                $this.props.history.push(`/Home`)
            }, 1000);
        }
    }

    handleSignIn = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        const result = await signin(email, password);
        if (typeof result === typeof undefined) {
            toastr.error('Erorr en los credenciales');
        } else {
            let $this = this;
            setTimeout(function () {
                $this.props.history.push(`/Home`)
            }, 1000);
            sessionStorage.setItem('user', result.returnObject);
            console.log('Result', result.returnObject)
            this.setState({ email, password });
        }

    }

    handlerUpdateInput = (e) => {
        e.preventDefault();
        const name = e.target.id;
        const value = e.target.value;
        console.log(name, '--', value);
        this.setState({ [name]: value });
    }


    render() {
        return (
            <div className="col-sm-12">
                <fieldset>
                    <form>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handlerUpdateInput} />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handlerUpdateInput} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit} >Submit</button>
                        <button type="submit" className="btn btn-primary" onClick={this.handleSignIn} >Sign In</button>
                    </form>
                </fieldset>
            </div>

        )

    }
}

export default Login;