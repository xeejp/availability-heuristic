import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import Chart from 'components/Chart'

const mapStateToProps = ({ one, two }) => ({
  one, two
})

const Result = ({ one, two }) => (
  <div>
    <Chart one={one} two={two} expanded={true} />
  </div>
)

export default connect(mapStateToProps)(Result)