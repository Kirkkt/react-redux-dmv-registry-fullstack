import React, { Component } from 'react';
import {connect} from "react-redux"
import randomToken from "random-token"

import { addPerson, updatePerson, deletePerson } from "../../actions/peopleActions"
import { deletePersonFromRegistry } from "../../actions/registryActions"
import Property from "./Property"
import './list.css';

const mapStateToProps = (state) => {
  return {
    people: state.people
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPerson,
    updatePerson,
    deletePerson,
    deletePersonFromRegistry,
  }
}

class People extends Component {

  updateName = (id, newProperty) => {
    this.props.updatePerson({
      id: id,
      information: Object.assign({}, this.props.people[id], newProperty)
    })
  }

  getPeopleList() {
    const result = [];
    for (const id in this.props.people) {
      const person = this.props.people[id]
      result.push((
        <div key={id}>
          <Property property={person.firstName} update={property => this.updateName(id, {firstName: property})}/>
          {" "}
          <Property property={person.lastName} update={property => this.updateName(id, {lastName: property})}/>
          <button onClick={() => {
            this.props.deletePerson({id})
            this.props.deletePersonFromRegistry({id})
          }}>
            delete
          </button>
        </div>
      ))
    }
    return result
  }

  add = () => {
    const firstName = prompt("first name?")
    const lastName = prompt("last name?")
    const id = randomToken(12)
    this.props.addPerson({
      id,
      information: {
        firstName,
        lastName,
      }
    })
  }

  render() {
    return (
      <div className="ListContainer">
         <h1>People</h1>
         {this.getPeopleList()}
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
)(People)
