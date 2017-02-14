import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Button, Modal } from 'react-bootstrap'


class Edit extends React.Component {
  static propTypes = {
    onSubmitAction: PropTypes.func,
    item: PropTypes.object,
    formComponent: PropTypes.func.isRequired,
    router: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = { showModal: true }
  }

  close = () => {
    const router = this.props.router
    this.setState({ showModal: false })
    router.replace(router.location.pathname)
  }

  open = () => {
    this.setState({ showModal: true })
  }

  render() {
    const { item, onSubmitAction, formComponent: FormComponemt } = this.props
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComponemt
            getData={item}
            onSubmitAction={onSubmitAction}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default Edit
