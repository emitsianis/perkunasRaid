import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getChars, deleteChar } from "../../actions/charActions";
import Spinner from "../common/Spinner";

class DeleteChar extends Component {
  componentDidMount() {
    if (
      this.props.match.params.group !== "aq" &&
      this.props.match.params.group !== "oc"
    ) {
      this.props.history.push("/");
    }

    this.props.getChars(this.props.match.params.group);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.group !== nextProps.match.params.group) {
      window.location.reload();
    }
  }

  onDeleteClick(id) {
    if (window.confirm("Are you sure?")) {
      this.props.deleteChar(
        this.props.match.params.group,
        id,
        this.props.history
      );
    }
  }

  render() {
    const group =
      this.props.match.params.group === "aq" ? "Ant Queen" : "Orfen&Core";

    const { chars, loading } = this.props.chars;
    let content;

    if (chars === null || loading) {
      content = <Spinner />;
    } else {
      const listContent = chars.map(char => (
        <li key={char._id} className="list-group-item">
          {char.name}{" "}
          <button
            onClick={this.onDeleteClick.bind(this, char._id)}
            type="button"
            className="btn btn-danger float-right"
          >
            <i className="fas fa-times" />
          </button>
        </li>
      ));

      content = <ul className="list-group text-dark">{listContent}</ul>;
    }

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mx-auto text-light">
            <h2 className="text-success">Delete {group} char</h2>
            {content}
          </div>
        </div>
      </div>
    );
  }
}

DeleteChar.propTypes = {
  deleteChar: PropTypes.func.isRequired,
  chars: PropTypes.object.isRequired,
  getChars: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  chars: state.chars
});

export default connect(
  mapStateToProps,
  { deleteChar, getChars }
)(DeleteChar);
