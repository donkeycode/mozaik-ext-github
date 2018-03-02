'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ui = require('@mozaik/ui');

var _githubAlt = require('react-icons/lib/fa/github-alt');

var _githubAlt2 = _interopRequireDefault(_githubAlt);

var _PullRequestDC = require('../pull-requests/PullRequestDC');

var _PullRequestDC2 = _interopRequireDefault(_PullRequestDC);

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
        var repositories = _ref.repositories,
            owner = _ref.owner;

        return {
            id: 'github.pullRequestsMultiRepos.' + repositories + '.' + owner,
            params: { repositories: repositories, owner: owner }
        };
    };

    LastPrMultiRepos.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        setInterval(function () {
            console.log('Setting current page', _this2.props.currentPage);
            var nextPage = _this2.props.currentPage < _this2.props.nbPages - 1 ? _this2.props.currentPage + 1 : 0;
            console.log(nextPage);
            _this2.props.currentPage = nextPage;
        }, 5000);
    };

    LastPrMultiRepos.prototype.render = function render() {
        var _props = this.props,
            repository = _props.repository,
            title = _props.title,
            apiData = _props.apiData,
            apiError = _props.apiError,
            elemOnPage = _props.elemOnPage,
            currentPage = _props.currentPage;


        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        var count = 0;
        var page = 0;
        if (apiData) {
            console.log('apiData', apiData.length, apiData);
            var lastPullRequests = [];

            var pr = [];
            for (var i = 0; i < apiData.length; i++) {
                for (var j = 0; j < apiData[i].pullRequests.length; j++) {
                    pr.push(apiData[i].pullRequests[j]);
                    if (elemOnPage) {
                        if (pr.length === elemOnPage) {
                            lastPullRequests.push(pr);
                            pr = [];
                        }
                    }
                }
            }
            lastPullRequests.push(pr);
            this.props.nbPages = lastPullRequests.length;
            // lastPullRequests.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
            console.log('lastPullRequests', lastPullRequests);
            count = this.props.currentPage + ' / ' + this.props.nbPages;
            body = _react2.default.createElement(
                'div',
                null,
                lastPullRequests[this.props.currentPage].map(function (pullRequest) {
                    return _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_ui.WidgetLabel, {
                            label: _react2.default.createElement(
                                'a',
                                { href: '' + pullRequest.base.repo.html_url, target: '_blank' },
                                pullRequest.base.repo.name
                            ),
                            style: { width: '100%', marginBottom: '1vmin' }
                        }),
                        _react2.default.createElement(_PullRequestDC2.default, { key: pullRequest.id, pullRequest: pullRequest })
                    );
                })
            );
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: title || 'Last Pull Requests',
                icon: _githubAlt2.default,
                count: count
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
    owner: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string,
    elemOnPage: _propTypes2.default.number,
    apiData: _propTypes2.default.shape({
        LastPrMultiRepos: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.object)).isRequired
    }),
    apiError: _propTypes2.default.object
};
LastPrMultiRepos.defaultProps = {
    currentPage: 0,
    nbPages: 1
};
exports.default = LastPrMultiRepos;