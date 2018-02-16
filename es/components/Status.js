function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import GithubIcon from 'react-icons/lib/fa/github-alt';
import ClockIcon from 'react-icons/lib/fa/clock-o';
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetStatusBadge } from '@mozaik/ui';

var Status = function (_Component) {
    _inherits(Status, _Component);

    function Status() {
        _classCallCheck(this, Status);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Status.getApiRequest = function getApiRequest() {
        return { id: 'github.status' };
    };

    Status.prototype.render = function render() {
        var _props = this.props,
            _status = _props.apiData,
            apiError = _props.apiError;


        var status = 'unknown';
        var messageNode = void 0;
        var meta = void 0;
        if (_status) {
            status = _status.status;
            messageNode = _status.body;
            meta = React.createElement(
                'span',
                null,
                React.createElement(ClockIcon, null),
                '\xA0',
                moment(_status.created_on).fromNow()
            );
        }

        return React.createElement(
            Widget,
            null,
            React.createElement(WidgetHeader, {
                title: 'GitHub',
                subject: 'Status',
                subjectPlacement: 'append',
                icon: GithubIcon
            }),
            React.createElement(
                WidgetBody,
                null,
                React.createElement(
                    TrapApiError,
                    { error: apiError },
                    React.createElement(WidgetStatusBadge, { status: status, message: messageNode, meta: meta })
                )
            )
        );
    };

    return Status;
}(Component);

Status.propTypes = {
    apiData: PropTypes.shape({
        status: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired
    }),
    apiError: PropTypes.object
};
export default Status;