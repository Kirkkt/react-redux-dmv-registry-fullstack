import React, { Component } from 'react';
import {connect} from "react-redux"

import { fetchRegistry, addRegistry, deleteRegistry } from "../../actions/registryActions"
import { fetchPeople } from "../../actions/peopleActions"
import { fetchCars } from "../../actions/carsActions"
import './list.css';

const mapStateToProps = (state) => {
  return {
    cars: state.cars,
    people: state.people,
    registry: state.registry,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRegistry,
    fetchPeople,
    fetchCars,
    addRegistry,
    deleteRegistry,
  }
}

class Registry extends Component {

  componentDidMount() {
    this.props.fetchRegistry()
    this.props.fetchPeople()
    this.props.fetchCars()
  }

  state = {
    isAdding: false,
    id: '',
    vin: '',
  }

  reset = () => {
    this.setState({
      isAdding: false,
      id: '',
      vin: '',
    })
  }

  getRegistryList() {
    if (Object.keys(this.props.people).length === 0 ||
      Object.keys(this.props.cars).length === 0 ||
      this.props.registry.length === 0) {
      return [];
    }
    let result = []
    for (const id in this.props.registry) {
      const person = this.props.people[id];
      result = result.concat(this.props.registry[id].map(vin => {
        const car = this.props.cars[vin]
        return (
          <div key={id + vin}>
            {person.firstName + " " + person.lastName + " <=> " +
              car.mileage + " " + car.make + " " + car.model}
            <button onClick={() => this.props.deleteRegistry({id, vin})}>
              delete
            </button>
          </div>
      )}));
    }
    return result
  }

  add = () => {
    if (!this.state.id || !this.state.vin) {
      return;
    }
    if (this.props.registry[this.state.id] && this.props.registry[this.state.id].indexOf(this.state.vin) !== -1) {
      alert("id - vin pair already existed")
    } else {
      this.props.addRegistry({id: this.state.id, vin: this.state.vin})
    }
    this.reset()
  }

  getPeopleOptions = () => {
    const result = []
    for (const id in this.props.people) {
      const person = this.props.people[id]
      result.push(
        <option key={id} value={id}>{person.firstName + " " + person.lastName}</option>
      )
    }
    return result
  }

  getCarsOptions = () => {
    const result = []
    for (const vin in this.props.cars) {
      const car = this.props.cars[vin]
      result.push(
        <option key={vin} value={vin}>{car.mileage + " " + car.make + " " + car.model}</option>
      )
    }
    return result
  }

  getAddRow = () => {
    if (!this.state.isAdding) {
      return <div/>;
    }
    return (
      <div>
        <select onChange={({target: {value}}) => this.setState({id: value})}>
          <option value="">- Please select a person -</option>
          {this.getPeopleOptions()}
        </select>
        {"<=>"}
        <select onChange={({target: {value}}) => this.setState({vin: value})}>
          <option value="">- Please select a car -</option>
          {this.getCarsOptions()}
        </select>
        <button onClick={() => this.add()}>
          confirm
        </button>
        <button onClick={() => this.reset()}>
          cancel
        </button>
      </div>
    );
  }

  getAddButton = () => {
    if (this.state.isAdding) {
      return <div/>;
    }
    return (
      <button onClick={() => this.setState({isAdding: true})}>
        add
      </button>
    )
  }

  render() {
    return (
      <div className="ListContainer">
        <h1>Registry</h1>
        <div>
          {this.getRegistryList()}
          {this.getAddRow()}
          {this.getAddButton()}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registry)
