import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getBosses } from "../../actions/bossActions";
import Moment from "react-moment";

class BossRespawns extends Component {
  componentDidMount() {
    this.props.getBosses();
  }

  render() {
    const { bosses, loading } = this.props.bosses;
    let content;

    if (bosses === null || loading) {
      content = <Spinner />;
    } else {
      const tableContent = bosses.map(boss => (
        <tr key={boss._id}>
          <td>{boss.fullName}</td>
          <td>
            <Moment format="DD/MM/YYYY @ HH:mm">{boss.tod}</Moment>
          </td>
          <td>
            <Moment format="DD/MM/YYYY @ HH:mm">{boss.tor}</Moment>
          </td>
        </tr>
      ));

      content = (
        <table className="table table-striped table-light">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Boss name</th>
              <th scope="col">Time of Death (CEST)</th>
              <th scope="col">Respawn time (CEST)</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      );
    }

    return (
      <div className="container mt-3">
        <div className="row">{content}</div>
      </div>
    );
  }
}

BossRespawns.propTypes = {
  bosses: PropTypes.object.isRequired,
  getBosses: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  bosses: state.bosses
});

export default connect(
  mapStateToProps,
  { getBosses }
)(BossRespawns);
