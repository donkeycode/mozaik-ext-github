'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _githubAlt = require('react-icons/lib/fa/github-alt');

var _githubAlt2 = _interopRequireDefault(_githubAlt);

var _clockO = require('react-icons/lib/fa/clock-o');

var _clockO2 = _interopRequireDefault(_clockO);

var _ui = require('@mozaik/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
            meta = _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_clockO2.default, null),
                '\xA0',
                (0, _moment2.default)(_status.created_on).fromNow()
            );
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: 'GitHub',
                subject: 'Status',
                subjectPlacement: 'append',
                icon: _githubAlt2.default
            }),
            _react2.default.createElement(
                _ui.WidgetBody,
                null,
                _react2.default.createElement(
                    _ui.TrapApiError,
                    { error: apiError },
                    _react2.default.createElement(_ui.WidgetStatusBadge, { status: status, message: messageNode, meta: meta })
                )
            )
        );
    };

    return Status;
}(_react.Component);

Status.propTypes = {
    apiData: _propTypes2.default.shape({
        status: _propTypes2.default.string.isRequired,
        body: _propTypes2.default.string.isRequired
    }),
    apiError: _propTypes2.default.object
};
exports.default = Status;