import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import { openParticipantPage } from './actions'

import { ReadJSON } from '../util/ReadJSON'

const User = ({ id, status, openParticipantPage }) => (
  <tr><td><a onClick={openParticipantPage(id)}>{id}</a></td><td>{status}</td></tr>
)

const mapStateToProps = ({ participants, page }) => ({ participants, page })

const mapDispatchToProps = (dispatch) => {
  const open = bindActionCreators(openParticipantPage, dispatch)
  return {
    openParticipantPage: (id) => () => open(id)
  }
}

const UsersList = ({participants, page, openParticipantPage }) => (
  <table>
    <thead><tr><th>{ReadJSON().static_text["users"]["id"]}</th><th>{ReadJSON().static_text["users"]["status"]}</th></tr></thead>
    <tbody>
      {
        Object.keys(participants).map(id => (
          <User
            key={id}
            id={id}
            status={(page == "waiting" || !participants[id].active)? ReadJSON().static_text["users"]["waiting"] : (page == "description")? ReadJSON().static_text["users"]["description"] : (page == "result")? ReadJSON().static_text["users"]["result"] : {"question1": ReadJSON().static_text["users"]["question1"], "answered": ReadJSON().static_text["users"]["answered"]}[participants[id].sequence]}
            openParticipantPage={openParticipantPage}
          />
        ))
      }
    </tbody>
  </table>
)

const Users = ({ participants, page, openParticipantPage }) => (
  <div>
    <Card>
      <CardHeader
        title={ReadJSON().static_text["users"]["people"] + Object.keys(participants).length + ReadJSON().static_text["users"]["person_unit"]}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <UsersList
          participants={participants}
          page={page}
          openParticipantPage={openParticipantPage}
        />
      </CardText>
    </Card>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(throttle(Users, 200))
