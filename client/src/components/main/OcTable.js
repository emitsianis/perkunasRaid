import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getChars } from "../../actions/charActions";
import TableItem from "./TableItem";

class OcTable extends Component {
  componentDidMount() {
    this.props.getChars("oc");
  }

  render() {
    const { chars, loading } = this.props.chars;
    let content;

    if (chars === null || loading) {
      content = <Spinner />;
    } else {
      const tableContent = chars.map(char => (
        <TableItem key={char._id} char={char} />
      ));

      content = (
        <table className="table table-striped table-light">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Orfen&Core CDLs</th>
              <th scope="col">Class</th>
              <th scope="col">Total</th>
              <th scope="col">1</th>
              <th scope="col">2</th>
              <th scope="col">3</th>
              <th scope="col">4</th>
              <th scope="col">5</th>
              <th scope="col">6</th>
              <th scope="col">7</th>
              <th scope="col">8</th>
              <th scope="col">9</th>
              <th scope="col">10</th>
              <th scope="col">11</th>
              <th scope="col">12</th>
              <th scope="col">13</th>
              <th scope="col">14</th>
              <th scope="col">15</th>
              <th scope="col">16</th>
              <th scope="col">17</th>
              <th scope="col">18</th>
              <th scope="col">19</th>
              <th scope="col">20</th>
              <th scope="col">21</th>
              <th scope="col">22</th>
              <th scope="col">23</th>
              <th scope="col">24</th>
              <th scope="col">25</th>
              <th scope="col">26</th>
              <th scope="col">27</th>
              <th scope="col">28</th>
              <th scope="col">29</th>
              <th scope="col">30</th>
              <th scope="col">31</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      );
    }

    return <div className="col-md-12 mt-3">{content}</div>;
  }
}

OcTable.propTypes = {
  chars: PropTypes.object.isRequired,
  getChars: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  chars: state.chars
});

export default connect(
  mapStateToProps,
  { getChars }
)(OcTable);
