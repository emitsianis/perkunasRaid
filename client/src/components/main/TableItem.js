import React, { Component } from "react";
import PropTypes from "prop-types";
import uuid from "uuid";

class TableItem extends Component {
  render() {
    const { char } = this.props;

    const content = char.visits.map(
      visit => (visit ? <td key={uuid()}>1</td> : <td key={uuid()} />)
    );

    return (
      <tr>
        <td>{char.name}</td>
        <td>{char.charClass}</td>
        <td className="total">{char.points}</td>
        {content}
      </tr>
    );
  }
}

TableItem.propTypes = {
  char: PropTypes.object.isRequired
};

export default TableItem;
