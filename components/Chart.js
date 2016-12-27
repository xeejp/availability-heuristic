import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Highcharts from 'react-highcharts'

import { ReadJSON } from '../util/ReadJSON'

const mapStateToProps = ({ question_text }) => ({ question_text })

class Chart extends Component {
  constructor(props) {
    super(props)
    const { expanded } = this.props
    this.state = { expanded: expanded }
  }

  handleExpandChange(expanded) {
    this.setState({ expanded: expanded })
  }

  render() {
    const { one, two, question_text } = this.props
    const text = ReadJSON().static_text["comp_chart"]
    return (
    <Card
      expanded={this.state.expanded}
      onExpandChange={this.handleExpandChange.bind(this)}
    >
      <CardHeader
        title={text["title"]}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <span>
          {(one + two != 0)?
            <Highcharts
              config={{
                  chart: {
                    type: 'pie'
                  },
                  credits : {
                    enabled: false,
                  },
                  title: {
                    text: text["title"]
                  },
                  plotOptions: {
                      pie: {
                          dataLabels: {
                              distance: -30,
                              format: '{point.y:.0f}' + text["person_unit"]
                          },
                          showInLegend: true
                     }
                  },

                  tooltip: {
                    headerFormat: '<span>{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}{text["person_unit"]}</b><br/>'
                  },
                  series: [{
                    name: text["answer"],
                    colorByPoint: true,
                    data: [{
                      name: question_text["question1"].title[0] + text["choice"],
                      y: one,
                    }, {
                       name: question_text["question1"].title[1] + text["choice"],
                       y: two,
                    }]
                  }]
             }} /> : <p>{text["no_answer"]}</p>}
        </span>
      </CardText>
    </Card>
  )
  }
}

export default connect(mapStateToProps)(throttle(Chart, 200))
