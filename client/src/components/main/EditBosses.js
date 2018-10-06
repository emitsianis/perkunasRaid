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

    const x = bossTod.split("/");
    const day = x[0];
    const month = x[1];
    const year = x[2].split(" ")[0];
    const y = x[2].split(" ")[1];
    const hours = y.split(":")[0];
    const mins = y.split(":")[1];

    const date = {
      day: day,
      month: month,
      year: year,
      hours: hours,
      mins: mins
    };

    const tor = this.addHours(date, 30);

    const data = {
      name: bossName,
      tod: bossTod,
      tor: tor
    };

    this.props.editBoss(data, this.props.history);
  }

  addHours(date, hrs) {
    let day = parseInt(date.day, 10);
    let month = parseInt(date.month, 10);
    let year = parseInt(date.year, 10);
    let hours = parseInt(date.hours, 10);
    let mins = parseInt(date.mins, 10);
    let total;
    let extra;

    total = hours + hrs;
    extra = Math.floor(total / 24);
    hours = total % 24;
    //done with hours

    total = day + extra;
    if (month === 2) {
      if (year % 4 === 0 && year % 100 !== 0) {
        extra = Math.floor(total / 29);
        day = total % 30;
        if (total > 29) {
          month = month + extra;
          day++;
        }
      } else {
        extra = Math.floor(total / 28);
        day = total % 29;
        if (total > 28) {
          month = month + extra;
          day++;
        }
      }
    }
    if (
      month === 1 ||
      month === 3 ||
      month === 5 ||
      month === 7 ||
      month === 8 ||
      month === 10 ||
      month === 12
    ) {
      extra = Math.floor(total / 31);
      day = total % 32;
      if (total > 31) {
        month = month + extra;
        day++;
      }
    }
    if (
      month === 4 ||
      month === 6 ||
      month === 7 ||
      month === 9 ||
      month === 11
    ) {
      extra = Math.floor(total / 30);
      day = total % 31;
      if (total > 30) {
        month = month + extra;
        day++;
      }
    }
    //done with day

    if (month === 13) {
      month = 1;
      year++;
    }
    //done with month
    //done with year
    mins = mins > 9 ? "" + mins : "0" + mins;

    return `${day}/${month}/${year} ${hours}:${mins}`;
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
