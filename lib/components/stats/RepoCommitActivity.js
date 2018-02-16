'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _RepoCommitActivityHistogramChart = require('./charts/RepoCommitActivityHistogramChart');

var _RepoCommitActivityHistogramChart2 = _interopRequireDefault(_RepoCommitActivityHistogramChart);

var _RepoCommitActivityLineChart = require('./charts/RepoCommitActivityLineChart');

var _RepoCommitActivityLineChart2 = _interopRequireDefault(_RepoCommitActivityLineChart);

var _ui = require('@mozaik/ui');

var _githubAlt = require('react-icons/lib/fa/github-alt');

var _githubAlt2 = _interopRequireDefault(_githubAlt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RepositoryCommitActivity = function (_Component) {
    _inherits(RepositoryCommitActivity, _Component);

    function RepositoryCommitActivity() {
        _classCallCheck(this, RepositoryCommitActivity);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    RepositoryCommitActivity.getApiRequest = function getApiRequest(_ref) {
        var repository = _ref.repository;

        return {
            id: 'github.repoCommitActivity.' + repository,
            params: { repository: repository }
        };
    };

    RepositoryCommitActivity.prototype.render = function render() {
        var _props = this.props,
            repository = _props.repository,
            title = _props.title,
            type = _props.type,
            apiData = _props.apiData,
            apiError = _props.apiError,
            theme = _props.theme;


        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        if (apiData && !apiError) {
            if (type === 'histogram') {
                body = _react2.default.createElement(_RepoCommitActivityHistogramChart2.default, { theme: theme, commits: apiData.buckets });
            } else if (type === 'line') {
                var chartData = [{
                    id: 'commits',
                    data: apiData.buckets.map(function (datum) {
                        return Object.assign({}, datum, {
                            x: datum.week,
                            y: datum.total
                        });
                    })
                }];

                body = _react2.default.createElement(_RepoCommitActivityLineChart2.default, { theme: theme, commits: chartData });
            }
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: title || 'Commit Activity',
                subject: title ? null : repository,
                icon: _githubAlt2.default
            }),
            _react2.default.createElement(
                _ui.WidgetBody,
                { style: { overflowY: 'hidden' } },
                _react2.default.createElement(
                    _ui.TrapApiError,
                    { error: apiError },
                    body
                )
            )
        );
    };

    return RepositoryCommitActivity;
}(_react.Component);

RepositoryCommitActivity.propTypes = {
    repository: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string,
    apiData: _propTypes2.default.shape({
        buckets: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired
    }),
    apiError: _propTypes2.default.object,
    type: _propTypes2.default.oneOf(['histogram', 'line']).isRequired,
    theme: _propTypes2.default.object.isRequired
};
exports.default = RepositoryCommitActivity;