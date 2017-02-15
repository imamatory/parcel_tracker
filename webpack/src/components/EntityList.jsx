import React, { PropTypes } from 'react'
import { Media } from 'react-bootstrap'

class EntityList extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    itemComponent: PropTypes.func,
  }

  isChecked = item => item && item.status

  render() {
    const { itemComponent: ItemComponent, isEditorMode } = this.props
    return (
      <div>
        {
          this.props.items.map(
            (item) => {
              const { id } = item

              return (
                <Media key={id.toString()} className="media__custom">
                  <ItemComponent {...item} isEditorMode={isEditorMode} />
                </Media>
              )
            }
          )
        }
      </div>
    )
  }
}

export default EntityList
