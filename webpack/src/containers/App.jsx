import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Navbar, Col, Nav, NavItem } from 'react-bootstrap'
import { Link, browserHistory } from 'react-router'

import { resetUserData } from '../actions'
import { getLinkPrefix } from '../routes'
import { getIsEditorMode, getIsUserLoggedIn } from '../store/selectors'

const forwardToManage = () => browserHistory.push('/manage')

const App = ({ children, isEditorMode, resetUser, isUserLoggedIn }) =>
  (
    <div>
      <Navbar className="navbar__custom" collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={`${getLinkPrefix(isEditorMode)}/parcels/`}>
              {'Parcels tracker '}
              { isEditorMode ?
                <b>Manager</b> : ''
              }
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {
              !isEditorMode ?
                <NavItem onClick={forwardToManage}>
                  <span className="navbar__link">
                    {'Switch to manager'}
                  </span>
                </NavItem> : ''
            }
            {
              isEditorMode || isUserLoggedIn ?
                <NavItem onClick={resetUser}>
                  <span className="navbar__link">
                    { isEditorMode ? 'Switch to user' : 'Logout' }
                  </span>
                </NavItem> : ''
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Col sm={10} smOffset={1}>
        <Col xs={8} xsOffset={2}>
          {children}
        </Col>
      </Col>
    </div>
  )

App.propTypes = {
  children: PropTypes.node,
  isEditorMode: PropTypes.bool,
  isUserLoggedIn: PropTypes.bool,
  resetUser: PropTypes.func,
}

const mapStateToProps = state => ({
  isEditorMode: getIsEditorMode(state),
  isUserLoggedIn: getIsUserLoggedIn(state),
})

const mapDispatchToProps = dispatch => ({
  resetUser: bindActionCreators(resetUserData, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
