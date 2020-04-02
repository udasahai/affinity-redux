import React from "react"
import { Modal, Button, ButtonGroup, ListGroup } from 'react-bootstrap'
import Select from '../Select/Select'


class MyVerticallyCenteredModal extends React.Component {
  // console.log(props['source'])

  constructor(props) {
    super(props);
    this.callback = this.callback.bind(this);
    this.state = {
      link: this.props.source[0]
    }
  }

  callback(src) {
    this.setState({
      link: src
    })
  }

  predicate(val) {
    return {
      val: val,
      display: val
    }
  }

  render() {
    const link = this.state.link
    return (
      <Modal
        {...this.props}
        id="modal"
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Sources: <Select callback={this.callback} predicate={this.predicate} source={this.props['source']} />
            <iframe src={link}  width='1000px' height='600px'></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function MyLinksModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sources
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {props.source.map( (src,i) =>
            <ListGroup.Item key={i} action target="_blank" rel="noopener noreferrer" href={src}>
              {src}
            </ListGroup.Item>
          )}

        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}



function ShowModal(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [linkShow, setLinkShow] = React.useState(false);

  return (
    <div>
    <ButtonGroup>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          View Paper
        </Button>

        <Button variant="primary" onClick={() => setLinkShow(true)}>
          View Source
        </Button>
      </ButtonGroup>

      <MyLinksModal
        source={props['source']}
        show={linkShow}
        onHide={() => setLinkShow(false)}
      />

      <MyVerticallyCenteredModal
        source={props['source']}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}


export default ShowModal;
