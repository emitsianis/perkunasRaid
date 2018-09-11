import React, { Component } from "react";
import PropTypes from "prop-types";
import uuid from "uuid";

class TableItem extends Component {
  render() {
    const { char, group } = this.props;

    const visits = char.visits.split(" ").map(visit => parseInt(visit, 10));
    const content = visits.map(
      visit =>
        visit ? (
          <td key={uuid()}>{group === "aq" ? 1 : 3}</td>
        ) : (
          <td key={uuid()} />
        )
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
  char: PropTypes.object.isRequired,
  group: PropTypes.string.isRequired
};

export default TableItem;
