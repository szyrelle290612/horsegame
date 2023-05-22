import React, { Component } from 'react'
import DraggableForm from './DraggableForm'
import AdminWatcher from '../../../api/classes/client/AdminWatcher'

export default class RouletteMain extends Component {
  constructor(props) {
    super(props)
    AdminWatcher.setWatcher(this, "ADMINWATCHER");
  }
  render() {
    let setting = AdminWatcher.SettingRoulette[0]
    if (!setting) {
      return <div>Loading...</div>
    }

    return (
      <div className="App">
        <DraggableForm setting={setting} />
      </div>
    )
  }
}
