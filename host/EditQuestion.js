import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Tabs, Tab} from 'material-ui/Tabs'
import {Card} from 'material-ui/Card'
import SwipeableViews from 'react-swipeable-views'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ImageEdit from 'material-ui/svg-icons/image/edit'
import FlatButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import { updateQuestion } from './actions'

const mapStateToProps = ({ question_text, page }) => ({
  question_text, page
})

class EditQuestion extends Component {
  constructor(props){
    super(props)
    const { question_text } = this.props
    this.state = {
      question_text: question_text,
      open: false,
      slideIndex: 0,
      mainSlideIndex: 0,
      default_text: {
          'question': {
              text: "Rについて考えてください。",
           },
           'question1': {
             text: "辞書中の英単語のうち、Rが",
              title: ["①", "②"],
              question: [
                "最初に来るものが多い。", 
                "3番目に来るものが多い。"
              ]
            },
            'answered': {
              text: "あなたの回答は終了しました。他の参加者の回答が終了するまでこのままお待ちください。",
           },
           'waiting_text': "参加者の登録を待っています。\nこの画面のまましばらくお待ちください。",
           'description_text': "これから、1つ質問をします。\n選択肢のうち、あなたが最も好むものを選択してください。",
          }
    }
  }

  QuestionTab(){
    return (
      <div>
        <TextField
          hintText={"問題の説明"}
          defaultValue={this.state.question_text["question"].text}
          onBlur={this.handleChange.bind(this, ["question", "text"])}
          multiLine={true}
          fullWidth={true}
        /><br />
        <div>
          <TextField
            hintText={"問題の詳細"}
            defaultValue={this.state.question_text["question1"].text}
            onBlur={this.handleChange.bind(this, ["question1", "text"])}
            multiLine={true}
           fullWidth={true}
          /><br />
         <TextField
         hintText={this.state.default_text["question1"].title[0]}
           defaultValue={this.state.question_text["question1"].title[0]}
           onBlur={this.handleChange.bind(this, ["question1", "title", 0])}
         />:<TextField
            hintText={this.state.default_text["question1"].title[0] + "の詳細"}
            defaultValue={this.state.question_text["question1"].question[0]}
            onBlur={this.handleChange.bind(this, ["question1", "question", 0])}
            multiLine={true}
         /><br />
      <TextField
            hintText={this.state.default_text["question1"].title[1]}
           defaultValue={this.state.question_text["question1"].title[1]}
           onBlur={this.handleChange.bind(this, ["question1", "title", 1])}
          />:<TextField
            hintText={this.state.default_text["question1"].title[1] + "の詳細"}
             defaultValue={this.state.question_text["question1"].question[1]}
            onBlur={this.handleChange.bind(this, ["question1", "question", 1])}
            multiLine={true}
          /><br />
        </div>
      </div>
    )
  }

  WaitingTab() {
    return (
      <div style={{height: '100%', position: 'relative'}}>
        <TextField
         hintText={"待機画面に表示するテキスト"}
         defaultValue={this.state.question_text["waiting_text"]}
         onBlur={this.handleChange.bind(this, ["waiting_text"])}
         multiLine={true}
         fullWidth={true}
         style={{height: 1000}}
       />
      </div>
    )
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleChange(value, event){
    var question_text = Object.assign({}, this.state.question_text)
    var temp = question_text
    for(var i = 0; i < value.length - 1; i++){
      temp = temp[value[i]]
    }
    temp[value[value.length - 1]] = event.target.value
    this.setState({ question_text: question_text })
  }

  handleMainSlide(value){
    this.setState({
      mainSlideIndex: value
    })
  }

  submit() {
    const { dispatch } = this.props
    dispatch(updateQuestion(this.state.question_text))
    this.setState({ open: false })
  }

  reset(){
    const { dispatch } = this.props
    dispatch(updateQuestion(this.state.default_text))
    this.setState({ question_text: this.state.default_text, open: false})
  }

  render(){
    const { page } = this.props
    const actions = [
      <FlatButton
        label="適用"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submit.bind(this)}
      />,
      <FlatButton
        label="キャンセル"
        onTouchTap={this.handleClose.bind(this)}
      />,
     <FlatButton
        label="すべてリセット"
        onTouchTap={this.reset.bind(this)}
      />,
    ]
    return (<div>
      <FloatingActionButton onClick={this.handleOpen.bind(this)} disabled={page != "waiting"}>
         <ImageEdit />
      </FloatingActionButton>
      <Dialog
        title="編集画面"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose.bind(this)}
        autoScrollBodyContent={this.state.mainSlideIndex == 1}
      >
        <Tabs
          onChange={this.handleMainSlide.bind(this)}
          value={this.state.mainSlideIndex}
        >
          <Tab label="待機画面" value={0}/>
          <Tab label="問題画面" value={1}/>
        </Tabs>
        <SwipeableViews
          index={this.state.mainSlideIndex}
          onChangeIndex={this.handleMainSlide.bind(this)}
        >
         {this. WaitingTab()}
         {this.QuestionTab()}
      </SwipeableViews>
      </Dialog>
    </div>)
  }
}

export default connect(mapStateToProps)(EditQuestion)