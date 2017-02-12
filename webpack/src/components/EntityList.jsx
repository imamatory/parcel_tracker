import React, { PropTypes } from 'react'
import { Media } from 'react-bootstrap'

class EntityList extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    ItemComponent: PropTypes.func,
  }

  isChecked = item => item && item.status

  render() {
    const { ItemComponent } = this.props
    return (
      <div>
        {
          this.props.items.map(
            (item) => {
              const { id } = item

              return (
                <Media key={id.toString()} className="media__custom">
                  <ItemComponent {...item} />
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
