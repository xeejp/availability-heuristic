import React from 'react'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionSettings from 'material-ui/svg-icons/action/settings'

import ReactTooltip from 'react-tooltip'

import { ReadJSON } from '../util/ReadJSON'

const Config = () => (<span>
   <span data-tip={ReadJSON().static_text["config"]["no_setting"]}>
   <FloatingActionButton
     disabled={true}
   >
     <ActionSettings />
   </FloatingActionButton>
  </span>
  <ReactTooltip place="bottom" type="error" effect="solid" offset={{ top: -28, left: -28}} />
</span>)

export default connect()(Config) 
