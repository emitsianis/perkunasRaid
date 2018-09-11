import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getChars, newEvent } from "../../actions/charActions";
import Spinner from "../common/Spinner";
import ErrorFrame from "../common/ErrorFrame";

class NewEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ids: [],
      day: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    const { ids } = this.state;
    const btn = document.getElementById(id);

    if (ids.indexOf(id) === -1) {
      ids.push(id);
      this.setState({
        ids: ids
      });
      btn.className = "btn btn-success float-right text-light";
    } else {
      ids.splice(ids.indexOf(id), 1);
      this.setState({
        ids: ids
      });
      btn.className = "btn btn-danger float-right text-light";
    }
  }

  onSubmit(e) {
    e.preventDefault();

    if (window.confirm("Are you sure?")) {
      const data = {
        ids: this.state.ids,
        day: this.state.day
      };

      this.props.newEvent(
        this.props.match.params.group,
        data,
        this.props.history
      );
    }
  }

  render() {
    const group =
      this.props.match.params.group === "aq" ? "Ant Queen" : "Orfen or Core";

    const { chars, loading } = this.props.chars;
    const { errors } = this.props;
    let content;

    if (chars === null || loading) {
      content = <Spinner />;
    } else {
      const listContent = chars.map(char => (
        <li key={char._id} className="list-group-item">
          {char.name}
          <button
            type="button"
            id={char._id}
            className="btn btn-danger float-right text-light"
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
            <h2 className="text-success mb-4">Add new {group} event</h2>
            <ErrorFrame errors={errors} />
            <div className="mb-4">
              <form onSubmit={this.onSubmit} className="form-inline">
                <div className="form-group mb-2">
                  <h4 className="">Day of the month</h4>
                </div>
                <div className="form-group mx-sm-3  mb-2">
                  <input
                    type="text"
                    className="form-control"
                    name="day"
                    onChange={this.onChange}
                    placeholder="(1 - 31)"
                  />
                </div>
                <div className="form-group mx-sm-3  mb-2">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Add Event"
                  />
                </div>
              </form>
            </div>
            <h4>Check the chars that attended:</h4>
            {content}
          </div>
        </div>
      </div>
    );
  }
}

NewEvent.propTypes = {
  chars: PropTypes.object.isRequired,
  getChars: PropTypes.func.isRequired,
  newEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  chars: state.chars,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getChars, newEvent }
)(NewEvent);
