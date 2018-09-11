import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ErrorFrame from "../common/ErrorFrame";
import { editBoss } from "../../actions/bossActions";

class EditBosses extends Component {
  constructor() {
    super();
    this.state = {
      qadp: "",
      poli: "",
      pocd: "",
      apob: ""
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

    this.props.editBoss(bossName, bossTod, this.props.history);
  }

  render() {
    const { errors } = this.props;

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 mx-auto text-light">
            <ErrorFrame errors={errors} />
            <form
              onSubmit={this.onSubmit.bind(this, "qadp", this.state.qadp)}
              className="form-inline"
            >
              <div className="form-group mb-2">
                <h4 className="text-success">Queen Ant Drone Priest</h4>
              </div>
              <div className="form-group mx-sm-3  mb-2">
                <input
                  type="text"
                  name="qadp"
                  onChange={this.onChange}
                  className="form-control"
                  id="inputPassword2"
                  placeholder="day/month/year hours:mins"
                />
              </div>
              <button type="submit" className="btn btn-success mb-2">
                Submit
              </button>
            </form>
            <form
              onSubmit={this.onSubmit.bind(this, "poli", this.state.poli)}
              className="form-inline mt-5"
            >
              <div className="form-group mb-2">
                <h4 className="text-success">
                  Priest Orfen Lord Ipos&nbsp;&nbsp;&nbsp;
                </h4>
              </div>
              <div className="form-group mx-sm-3 mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="poli"
                  onChange={this.onChange}
                  id="inputPassword2"
                  placeholder="day/month/year hours:mins"
                />
              </div>
              <button type="submit" className="btn btn-success mb-2">
                Submit
              </button>
            </form>
            <form
              onSubmit={this.onSubmit.bind(this, "pocd", this.state.pocd)}
              className="form-inline mt-5"
            >
              <div className="form-group mb-2">
                <h4 className="text-success">
                  Priest of Core Decar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </h4>
              </div>
              <div className="form-group mx-sm-3 mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="pocd"
                  onChange={this.onChange}
                  id="inputPassword2"
                  placeholder="day/month/year hours:mins"
                />
              </div>
              <button type="submit" className="btn btn-success mb-2">
                Submit
              </button>
            </form>
            <form
              onSubmit={this.onSubmit.bind(this, "apob", this.state.apob)}
              className="form-inline mt-5"
            >
              <div className="form-group mb-2">
                <h4 className="text-success">
                  Angel Priest of Baium&nbsp;&nbsp;&nbsp;&nbsp;
                </h4>
              </div>
              <div className="form-group mx-sm-3 mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="apob"
                  onChange={this.onChange}
                  id="inputPassword2"
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

EditBosses.propTypes = {
  editBoss: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editBoss }
)(EditBosses);
