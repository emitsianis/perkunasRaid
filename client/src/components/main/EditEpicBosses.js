import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ErrorFrame from "../common/ErrorFrame";
import { editEpicBoss } from "../../actions/bossActions";

class EditEpicBosses extends Component {
  constructor() {
    super();
    this.state = {
      baium: "",
      orfen: "",
      core: "",
      aq: ""
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(bossName, bossTod, e) {
    e.preventDefault();

    let x = bossTod.split("/");
    const temp = x[0];
    x[0] = x[1];
    x[1] = temp;
    const y = x.join("/");

    const tod = new Date(y);
    let tor = new Date(y);
    let tor2 = new Date(y);
    if (bossName === "baium") {
      tor.setHours(tor.getHours() + 115);
      tor2.setHours(tor2.getHours() + 120);
    } else {
      tor.setHours(tor.getHours() + 36);
      tor2.setHours(tor2.getHours() + 48);
    }

    const data = {
      name: bossName,
      tod: tod,
      tor: tor,
      tor2: tor2
    };

    this.props.editEpicBoss(data, this.props.history);
  }

  render() {
    const { errors } = this.props;

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mx-auto text-light">
            <ErrorFrame errors={errors} />
            <form
              onSubmit={this.onSubmit.bind(this, "baium", this.state.baium)}
              className="form-inline"
            >
              <div className="form-group mb-2">
                <h4 className="text-success">
                  Baium&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </h4>
              </div>
              <div className="form-group mx-sm-3  mb-2">
                <input
                  type="text"
                  name="baium"
                  onChange={this.onChange}
                  className="form-control"
                  placeholder="day/month/year hours:mins"
                />
              </div>
              <button type="submit" className="btn btn-success mb-2">
                Submit
              </button>
            </form>
            <form
              onSubmit={this.onSubmit.bind(this, "orfen", this.state.orfen)}
              className="form-inline mt-5"
            >
              <div className="form-group mb-2">
                <h4 className="text-success">
                  Orfen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </h4>
              </div>
              <div className="form-group mx-sm-3 mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="orfen"
                  onChange={this.onChange}
                  placeholder="day/month/year hours:mins"
                />
              </div>
              <button type="submit" className="btn btn-success mb-2">
                Submit
              </button>
            </form>
            <form
              onSubmit={this.onSubmit.bind(this, "core", this.state.core)}
              className="form-inline mt-5"
            >
              <div className="form-group mb-2">
                <h4 className="text-success">
                  Core&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                </h4>
              </div>
              <div className="form-group mx-sm-3 mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="core"
                  onChange={this.onChange}
                  placeholder="day/month/year hours:mins"
                />
              </div>
              <button type="submit" className="btn btn-success mb-2">
                Submit
              </button>
            </form>
            <form
              onSubmit={this.onSubmit.bind(this, "qa", this.state.qa)}
              className="form-inline mt-5"
            >
              <div className="form-group mb-2">
                <h4 className="text-success">Queen Ant</h4>
              </div>
              <div className="form-group mx-sm-3 mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="qa"
                  onChange={this.onChange}
                  placeholder="day/month/year hours:mins"
                />
              </div>
              <button type="submit" className="btn btn-success mb-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditEpicBosses.propTypes = {
  editEpicBoss: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editEpicBoss }
)(EditEpicBosses);
