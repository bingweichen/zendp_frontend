import React from 'react'
import { Modal } from 'antd'
import Draggable from 'react-draggable'

class DraggableModal extends React.Component {

  state = {
    disabled: true,
    bounds: { left: 0, top: 0, bottom: 0, right: 0 },
  }

  draggleRef = React.createRef()

  onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement
    const targetRect = this.draggleRef?.current?.getBoundingClientRect()
    this.setState({
      bounds: {
        left: -targetRect?.left + uiData?.x,
        right: clientWidth - (targetRect?.right - uiData?.x),
        top: -targetRect?.top + uiData?.y,
        bottom: clientHeight - (targetRect?.bottom - uiData?.y),
      },
    })
  }

  render() {

    const { bounds, disabled } = this.state
    const { title, visible, onCancel, onOk, width, destroyOnClose = true, ...modalProps } = this.props

    return (
      <Modal
        {...modalProps}
        destroyOnClose={destroyOnClose}
        maskClosable={false}
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        width={width}
        maskStyle={{backgroundColor: "rgba(0, 0, 0, 0.15)"}}
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
            onMouseOver={() => {
              if (disabled) {
                this.setState({
                  disabled: false,
                })
              }
            }}
            onMouseOut={() => {
              this.setState({
                disabled: true,
              })
            }}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            {title}
          </div>
        }
        modalRender={modal => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => this.onStart(event, uiData)}
          >
            <div ref={this.draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        {this.props.children}
      </Modal>

    )
  }
}

export default DraggableModal
