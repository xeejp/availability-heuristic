import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'

import { ReadJSON } from '../util/ReadJSON'

const mapStateToProps = ({ question_text }) => ({
  question_text
})

const Description = ({ question_text }) => (
  <Card>
    <CardTitle title={ReadJSON().static_text["title"]} subtitle={ReadJSON().static_text["part_description"]["description"]} />
    <CardText>
      {question_text['description_text'].split('\n').map( line => <p>{line}</p>)}
    </CardText>
  </Card>
)
export default connect(mapStateToProps)(Description)
