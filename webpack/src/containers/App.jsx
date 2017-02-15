import React, { PropTypes } from 'react'
import { Navbar, Col } from 'react-bootstrap'

const App = ({ children }) =>
  (
    <div>
      <Navbar className="navbar__custom">
        <Navbar.Header>
          <Navbar.Brand>Parcels traker</Navbar.Brand>
        </Navbar.Header>
      </Navbar>
      <Col sm={8} smOffset={2}>
        <Col xs={8} xsOffset={2}>
          {children}
        </Col>
      </Col>
    </div>
  )

App.propTypes = {
  children: PropTypes.node,
}

export default App
