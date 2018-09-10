import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ErrorFrame from "../common/ErrorFrame";
import { addChar } from "../../actions/charActions";

class AddChar extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      charClass: "",
      points: "",
      errors: {}
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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newChar = {
      name: this.state.name,
      charClass: this.state.charClass,
      points: this.state.points
    };

    this.props.addChar(
      this.props.match.params.group,
      newChar,
      this.props.history
    );
  }

  render() {
    const { errors } = this.props;
    const group =
      this.props.match.params.group === "aq" ? "Ant Queen" : "Orfen&Core";

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mx-auto text-light">
            <h2 className="text-success">Add {group} char</h2>
            <ErrorFrame errors={errors} />
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Char Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Char class"
                  name="charClass"
                  value={this.state.charClass}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Initial points, leave blank for 0"
                  name="points"
                  value={this.state.points}
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn btn-success mt-4 btn-block">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddChar.propTypes = {
  addChar: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addChar }
)(AddChar);
