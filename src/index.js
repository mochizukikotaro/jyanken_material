import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import Jyanken from './Jyanken'

class JyankenGamePage extends Component {
  constructor(props) {
    super(props)
    this.jyanken = new Jyanken()
    this.state = {scores: [], status: {}, tabIndex: 0}
  }
  componentDidMount() {
    this.getResult()
  }
  tabChange(ix) {
    this.setState({tabIndex: ix})
    this.getResult()
  }
  getResult() {
    this.setState({scores: this.jyanken.getScores()})
    this.setState({status: this.jyanken.getStatuses()})
  }
  pon(te) {
    this.jyanken.pon(te)
    this.getResult()
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={{marginLeft: 30}}>
          <Header>じゃんけんぽん！</Header>
          <JyankenBox actionPon={(te) => this.pon(te)} />
          <Paper style={{width: 400}} zDepth={2}>
            <Tabs value={this.state.tabIndex} onChange={(ix) => this.tabChange(ix)}>
              <Tab label="対戦結果" value={0}>
                <ScoreList scores={this.state.scores} />
              </Tab>
              <Tab label="対戦成績" value={1}>
                <StatusBox status={this.state.status} />
              </Tab>
            </Tabs>
          </Paper>
        </div>
      </MuiThemeProvider>
    )
  }
}
const Header = (props) => (<h1>{props.children}</h1>)
Header.propTypes = {
  children: PropTypes.string
}
const StatusBox = (props) => (
  <Table>
    <TableBody displayRowCheckbox={false}>
      <TableRow displayBorder={false}>
        <TableHeaderColumn>勝ち</TableHeaderColumn>
        <TableRowColumn style={judgementStyel(1)}>
          {props.status.win}
        </TableRowColumn>
      </TableRow>
      <TableRow displayBorder={false}>
        <TableHeaderColumn>負け</TableHeaderColumn>
        <TableRowColumn style={judgementStyel(2)}>
          {props.status.lose}
        </TableRowColumn>
      </TableRow>
      <TableRow displayBorder={false}>
        <TableHeaderColumn>引き分け</TableHeaderColumn>
        <TableRowColumn style={judgementStyel(0)}>
          {props.status.draw}
        </TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
)
StatusBox.propTypes = {
  status: PropTypes.object
}

const JyankenBox = (props) => {
  const style = {margin: 20}
  return (
    <div style={{marginTop: 40, marginBottom: 30, marginLeft: 30}}>
      <RaisedButton label="グー" onClick={() => props.actionPon(0)} style={style} />
      <RaisedButton label="チョキ" onClick={() => props.actionPon(1)} style={style} />
      <RaisedButton label="パー" onClick={() => props.actionPon(2)} style={style} />
    </div>
  )
}
JyankenBox.propTypes = {
  actionPon: PropTypes.func
}

const ScoreList = (props) => {
  return (
    <Table>
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>時間</TableHeaderColumn>
          <TableRowColumn>コンピューター</TableRowColumn>
          <TableRowColumn>結果</TableRowColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.scores.map((score, ix) => <ScoreListItem key={ix} score={score} />)}
      </TableBody>
    </Table>
  )
}
ScoreList.propTypes = {
  scores: PropTypes.array
}

const ScoreListItem = (props) => {
  const teString = ["グー", "チョキ", "パー"]
  const judgementString = ["引きわけ", "勝ち", "負け"]
  const dateHHMMSS = (d) => d.toTimeString().substr(0, 8)
  return (
    <TableRow style={judgementStyel(props.score.judgement)}>
      <TableRowColumn>{dateHHMMSS(props.score.created_at)}</TableRowColumn>
      <TableRowColumn>{teString[props.score.human]}</TableRowColumn>
      <TableRowColumn>{teString[props.score.computer]}</TableRowColumn>
      <TableRowColumn>{judgementString[props.score.judgement]}</TableRowColumn>
    </TableRow>
  )
}


ScoreListItem.propTypes = {
  score: PropTypes.object
}

const judgementStyel = (judgement) => (
  {color: ["#000", "#2979ff", "#ff1744"][judgement]}
)

ReactDOM.render(
  <JyankenGamePage />,
  document.getElementById('root')
)
