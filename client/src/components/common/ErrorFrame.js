import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ErrorFrame extends Component {
  render() {
    const { errors } = this.props;

    const content = isEmpty(errors) ? null : (
      <React.Fragment>
        {errors.username !== undefined ? (
          <div className="alert alert-danger text-danger">
            {errors.username}
          </div>
        ) : null}
        {errors.password !== undefined ? (
          <div className="alert alert-danger text-danger">
            {errors.password}
          </div>
        ) : null}
      </React.Fragment>
    );

    return <div>{content}</div>;
  }
}

ErrorFrame.propTypes = {
  errors: PropTypes.object.isRequired
};

export default ErrorFrame;
