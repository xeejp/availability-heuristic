import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import Divider from 'material-ui/Divider'

import PageButtons from './PageButtons'
import Config from './Config.js'
import EditQuestion from './EditQuestion'
import DownloadButton from './DownloadButton'
import Users from './Users'

import Chart from 'components/Chart'

const mapStateToProps = ({loading, page, participants, question_text}) => ({
  loading, page, participants, question_text
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
    const { loading, page, participants, question_text } = this.props
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
          <Config />
          <EditQuestion />
          <DownloadButton
            fileName={"availability_heuristic.csv"}
            list={[
              ["利用可能性ヒューリスティクス"],
              ["実験日", new Date()],
              ["登録者数", Object.keys(participants).length],
              ["ID", "回答"],
            ].concat(
              Object.keys(participants).map(id => [id, (participants[id].question1 != 0)? question_text["question1"].title[participants[id].question1 - 1] : "未回答"])
            )}
            style={{marginLeft: '2%'}}
            disabled={page != "result"}
          />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)