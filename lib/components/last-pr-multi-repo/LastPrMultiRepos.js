'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ui = require('@mozaik/ui');

var _githubAlt = require('react-icons/lib/fa/github-alt');

var _githubAlt2 = _interopRequireDefault(_githubAlt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LastPrMultiRepos = function (_Component) {
    _inherits(LastPrMultiRepos, _Component);

    function LastPrMultiRepos() {
        _classCallCheck(this, LastPrMultiRepos);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    LastPrMultiRepos.getApiRequest = function getApiRequest(_ref) {
        var repositories = _ref.repositories;

        return {
            id: 'githubLocal.pullRequestsMultiCompte.' + repositories,
            params: { repositories: repositories }
        };
    };

    LastPrMultiRepos.prototype.render = function render() {
        var _props = this.props,
            repository = _props.repository,
            title = _props.title,
            apiData = _props.apiData,
            apiError = _props.apiError;


        console.log(apiData);

        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        var count = 0;
        if (apiData) {
            // body = (
            //     <div>
            //         {this.repositories.map(PullRequests => {

            //         })}
            //     </div>
            // )
            body = _react2.default.createElement(
                'div',
                null,
                'Test last pull requests'
            );
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: title || 'Last Pull Requests',
                icon: _githubAlt2.default
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

    return LastPrMultiRepos;
}(_react.Component);

LastPrMultiRepos.PropTypes = {
    repositories: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
    title: _propTypes2.default.string,
    apiData: _propTypes2.default.shape({
        LastPrMultiRepos: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.object)).isRequired
    }),
    apiError: _propTypes2.default.object
};
exports.default = LastPrMultiRepos;