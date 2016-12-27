import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

import { ReadJSON } from '../util/ReadJSON'

const mapStateToProps = ({ joined, question_text }) => ({
  joined, question_text
})

const Waiting = ({ joined, question_text }) => (
	<Card>
		<CardTitle title={ReadJSON().static_text["title"]} subtitle={ReadJSON().static_text["waiting"]} />
		<CardText>
			{question_text['waiting_text'].split('\n').map( line => <p>{line}</p>)}
			<p>{ReadJSON().static_text["part_waiting"]["joined"][0] + joined + ReadJSON().static_text["part_waiting"]["joined"][1]} </p>
		</CardText>
		<div style={{textAlign: "center"}}>
			<CircularProgress size={2}/>
		</div>
	</Card>
)

export default connect(mapStateToProps)(Waiting)
