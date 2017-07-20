import React, { Component } from 'react';
import {connect} from "react-redux"
import randomToken from "random-token"

import { addCar, updateCar, deleteCar } from "../../actions/carsActions"
import { deleteCarFromRegistry } from "../../actions/registryActions"
import Property from "./Property"
import './list.css';

const mapStateToProps = (state) => {
  return {
    cars: state.cars
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCar,
    updateCar,
    deleteCar,
    deleteCarFromRegistry,
  }
}

class Cars extends Component {
  updateProperty = (vin, newProperty) => {
    this.props.updateCar({
      vin,
      information: Object.assign({}, this.props.cars[vin], newProperty)
    })
  }

  getCarsList() {
    const result = [];
    for (const vin in this.props.cars) {
      const car = this.props.cars[vin]
      result.push((
        <div key={vin}>
          <Property property={car.mileage} update={property => this.updateProperty(vin, {mileage: Number.parseInt(property, 10)})}/>
          {" "}
          <Property property={car.make} update={property => this.updateProperty(vin, {make: property})}/>
          {" "}
          <Property property={car.model} update={property => this.updateProperty(vin, {model: property})}/>
          <button onClick={() => {
            this.props.deleteCar({vin})
            this.props.deleteCarFromRegistry({vin})
          }}>
            delete
          </button>
        </div>
      ))
    }
    return result
  }

  add = () => {
    const mileage = Number.parseInt(prompt("mileage?"), 10)
    const make = prompt("make?")
    const model = prompt("model?")
    const vin = randomToken(12)
    this.props.addCar({
      vin,
      information: {
        mileage,
        make,
        model,
      }
    })
  }

  render() {
    return (
      <div className="ListContainer">
         <h1>Cars</h1>
         {this.getCarsList()}
         <div>
           <button onClick={() => this.add()}>
             add
           </button>
         </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cars)
