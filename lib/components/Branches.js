'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _codeFork = require('react-icons/lib/fa/code-fork');

var _codeFork2 = _interopRequireDefault(_codeFork);

var _ui = require('@mozaik/ui');

var _Branch = require('./Branch');

var _Branch2 = _interopRequireDefault(_Branch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Branches = function (_Component) {
    _inherits(Branches, _Component);

    function Branches() {
        _classCallCheck(this, Branches);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Branches.getApiRequest = function getApiRequest(_ref) {
        var repository = _ref.repository;

        return {
            id: 'github.branches.' + repository,
            params: { repository: repository }
        };
    };

    Branches.prototype.render = function render() {
        var _props = this.props,
            repository = _props.repository,
            title = _props.title,
            apiData = _props.apiData,
            apiError = _props.apiError;


        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        var count = void 0;
        if (apiData && !apiError) {
            count = apiData.branches.length;
            body = _react2.default.createElement(
                'div',
                null,
                apiData.branches.map(function (branch) {
                    return _react2.default.createElement(_Branch2.default, { key: branch.name, branch: branch });
                })
            );
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: title || 'Branches',
                subject: title ? null : repository,
                count: count,
                icon: _codeFork2.default
            }),
            _react2.default.createElement(
                _ui.WidgetBody,
                null,
                _react2.default.createElement(
                    _ui.TrapApiError,
                    { error: apiError },
                    body
                )
            )
        );
    };

    return Branches;
}(_react.Component);

Branches.propTypes = {
    repository: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string,
    apiData: _propTypes2.default.shape({
        branches: _propTypes2.default.arrayOf(_Branch.BranchPropType).isRequired
    }),
    apiError: _propTypes2.default.object
};
exports.default = Branches;