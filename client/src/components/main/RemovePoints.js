import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getChars, removePoints } from "../../actions/charActions";
import Spinner from "../common/Spinner";
import ErrorFrame from "../common/ErrorFrame";

class RemovePoints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      points: ""
    };

    this.onChange = this.onChange.bind(this);
  }

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

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClick(id) {
    if (window.confirm("Are you sure")) {
      this.props.removePoints(
        this.props.match.params.group,
        this.state.points,
        id
      );
    }
  }

  render() {
    const group =
      this.props.match.params.group === "aq" ? "Ant Queen" : "Orfen&Core";

    const { chars, loading } = this.props.chars;
    const { errors } = this.props;
    let content;

    if (chars === null || loading) {
      content = <Spinner />;
    } else {
      const listContent = chars.map(char => (
        <li key={char._id} className="list-group-item">
          {char.name}, points: <span className="total">{char.points}</span>
          <button
            type="button"
            className="btn btn-warning float-right text-light"
            onClick={this.onClick.bind(this, char._id)}
          >
            <i className="fas fa-check" />
          </button>
        </li>
      ));

      content = <ul className="list-group text-dark">{listContent}</ul>;
    }

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 mx-auto text-light">
            <h2 className="text-success mb-4">
              Remove points from {group} char
            </h2>
            <ErrorFrame errors={errors} />
            <div className="mb-4">
              <form className="form-inline">
                <div className="form-group mb-2">
                  <h4 className="">Set points and choose a character</h4>
                </div>
                <div className="form-group mx-sm-3  mb-2">
                  <input
                    type="text"
                    className="form-control"
                    name="points"
                    onChange={this.onChange}
                    placeholder="Number of points"
                  />
                </div>
              </form>
            </div>

            {content}
          </div>
        </div>
      </div>
    );
  }
}

RemovePoints.propTypes = {
  chars: PropTypes.object.isRequired,
  getChars: PropTypes.func.isRequired,
  removePoints: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  chars: state.chars,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getChars, removePoints }
)(RemovePoints);
