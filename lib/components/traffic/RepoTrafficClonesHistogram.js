'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RepoTrafficClones = require('./RepoTrafficClones');

var _RepoTrafficClones2 = _interopRequireDefault(_RepoTrafficClones);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RepoTrafficClonesHistogram = function (_Component) {
    _inherits(RepoTrafficClonesHistogram, _Component);

    function RepoTrafficClonesHistogram() {
        _classCallCheck(this, RepoTrafficClonesHistogram);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    RepoTrafficClonesHistogram.getApiRequest = function getApiRequest(params) {
        return _RepoTrafficClones2.default.getApiRequest(params);
    };

    RepoTrafficClonesHistogram.prototype.render = function render() {
        return _react2.default.createElement(_RepoTrafficClones2.default, _extends({}, this.props, { type: 'histogram' }));
    };

    return RepoTrafficClonesHistogram;
}(_react.Component);

exports.default = RepoTrafficClonesHistogram;