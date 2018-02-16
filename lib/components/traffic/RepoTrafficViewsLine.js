'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RepoTrafficViews = require('./RepoTrafficViews');

var _RepoTrafficViews2 = _interopRequireDefault(_RepoTrafficViews);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RepoTrafficViewsLine = function (_Component) {
    _inherits(RepoTrafficViewsLine, _Component);

    function RepoTrafficViewsLine() {
        _classCallCheck(this, RepoTrafficViewsLine);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    RepoTrafficViewsLine.getApiRequest = function getApiRequest(params) {
        return _RepoTrafficViews2.default.getApiRequest(params);
    };

    RepoTrafficViewsLine.prototype.render = function render() {
        return _react2.default.createElement(_RepoTrafficViews2.default, _extends({}, this.props, { type: 'line' }));
    };

    return RepoTrafficViewsLine;
}(_react.Component);

exports.default = RepoTrafficViewsLine;