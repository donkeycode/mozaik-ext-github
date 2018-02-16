'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _githubAlt = require('react-icons/lib/fa/github-alt');

var _githubAlt2 = _interopRequireDefault(_githubAlt);

var _ui = require('@mozaik/ui');

var _RepoContributorStat = require('./RepoContributorStat');

var _RepoContributorStat2 = _interopRequireDefault(_RepoContributorStat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RepoContributorsStats = function (_Component) {
    _inherits(RepoContributorsStats, _Component);

    function RepoContributorsStats() {
        _classCallCheck(this, RepoContributorsStats);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    RepoContributorsStats.getApiRequest = function getApiRequest(_ref) {
        var repository = _ref.repository;

        return {
            id: 'github.repositoryContributorsStats.' + repository,
            params: { repository: repository }
        };
    };

    RepoContributorsStats.prototype.render = function render() {
        var _props = this.props,
            repository = _props.repository,
            title = _props.title,
            apiData = _props.apiData,
            apiError = _props.apiError;


        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        var count = void 0;
        if (apiData && !apiError) {
            var contributors = apiData.contributors.slice().sort(function (contribA, contribB) {
                return contribB.total - contribA.total;
            });

            count = contributors.length;
            body = _react2.default.createElement(
                'div',
                null,
                contributors.map(function (contributor) {
                    return _react2.default.createElement(_RepoContributorStat2.default, {
                        key: contributor.author.id,
                        contributor: contributor
                    });
                })
            );
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: title || 'Contributors',
                subject: title ? null : repository,
                count: count,
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

    return RepoContributorsStats;
}(_react.Component);

RepoContributorsStats.propTypes = {
    repository: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string,
    apiData: _propTypes2.default.shape({
        contributors: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired
    }),
    apiError: _propTypes2.default.object
};
exports.default = RepoContributorsStats;