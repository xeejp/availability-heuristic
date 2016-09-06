import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import Divider from 'material-ui/Divider'

import PageButtons from './PageButtons'
import EditQuestion from './EditQuestion'
import Users from './Users'

import Chart from 'components/Chart'

const mapStateToProps = ({loading, page, participants}) => ({
  loading, page, participants
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchContents())
  }

  render() {
    const { loading, page, participants } = this.props
    var ans = [0, 0]
    if(participants != undefined){
      for(var i in participants){
        if(participants[i].question1 != 0){
          ans[participants[i].question1 - 1]++
        }
      }
    }
    if (loading) {
      return <p>ロード中です。</p>
    } else {
      return (
        <div>
          <PageButtons />
          <Divider
            style={{
              marginTop: "5%",
              marginBottom: "5%"
            }}
          />
          <Users /><br />
         <Chart one={ans[0]} two={ans[1]} expanded={false} /><br />
          <EditQuestion />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)