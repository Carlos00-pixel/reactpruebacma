import axios from 'axios'
import React, { Component } from 'react'
import Global from './../Global'

export default class CargarDoctores extends Component {

    cajaSelect = React.createRef();
    cajaInput = React.createRef();

    state = {
        doctores: [],
        especialidades: [],
        tabla: [],
        salarios: [],
        statusDoctores: false,
        statusEspecialidad: false,
        statusTabla: false,
        statusSalarios: false,
        refresh: false
    }

    mostrarDoctores = () => {
        var request = "/api/Doctores"
        var url = Global.urlDoctores + request;

        axios.get(url).then((response) => {
            this.setState({
                doctores: response.data,
                statusDoctores: true
            })
        })
    }

    mostrarSelect = () => {
        var request = "/api/Doctores/Especialidades"
        var url = Global.urlDoctores + request;

        axios.get(url).then((response) => {
            this.setState({
                especialidades: response.data,
                statusEspecialidad: true
            })
        })
    }

    componentDidMount = () => {
        this.mostrarSelect();
    }

    mostrarTabla = (e) => {
        e.preventDefault();

        var valorSelect = this.cajaSelect.current.value;

        var request = "/api/Doctores/DoctoresEspecialidad/"+valorSelect;
        var url = Global.urlDoctores + request;

        console.log(url);

        axios.get(url).then((response) => {
            this.setState({
                tabla: response.data,
                statusTabla: true,
                refresh: true
            })
        })
    }

    incrementarSalario = (e) => {
        e.preventDefault();

        var valorSelect = this.cajaSelect.current.value;
        var valorInput = this.cajaInput.current.value;

        var request = "/api/Doctores/"+valorSelect+"/"+valorInput

        var url = Global.urlDoctores + request;

        console.log(url);

        axios.put(url).then((response) => {
            this.setState({
                salarios: response.data,
                statusSalarios: true
            })
        })
    }


  render() {
    return (
      <div>
        <h1>Tabla Doctores</h1>
        <form>
            <label>Seleccione una especialidad: </label>
            <select ref={this.cajaSelect} onChange={this.mostrarTabla}>
                {
                     this.state.statusEspecialidad == true &&
                     (
                        this.state.especialidades.map((especialidad, index) => {
                            return (<option key={index} value={especialidad}>{especialidad}</option>)
                        })
                     )
                }
            </select>
            <br/>
            <label>Incremento Salarial </label>
            <input type="number" ref={this.cajaInput}/>
            <br/>
            <button onClick={this.incrementarSalario}>Incrementar Salarios</button>
        </form>
        <table border="2" style={{margin: "0 auto"}}>
            <thead>
                <tr>
                    <th>Apellido</th>
                    <th>Especialidad</th>
                    <th>Salario</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.statusTabla == true &&
                    (
                        this.state.tabla.map((tab, index) => {
                            return (
                                <tr key={tab.idDoctor}>
                                    <td>{tab.apellido}</td>
                                    <td>{tab.especialidad}</td>
                                    <td>{tab.salario}</td>
                                </tr>
                            )
                        })
                    )
                }
            </tbody>
        </table>
        
      </div>
    )
  }
}
