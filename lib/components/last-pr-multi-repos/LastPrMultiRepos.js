'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ui = require('@mozaik/ui');

var _githubAlt = require('react-icons/lib/fa/github-alt');

var _githubAlt2 = _interopRequireDefault(_githubAlt);

var _pause = require('react-icons/lib/fa/pause');

var _pause2 = _interopRequireDefault(_pause);

var _play = require('react-icons/lib/fa/play');

var _play2 = _interopRequireDefault(_play);

var _backward = require('react-icons/lib/fa/backward');

var _backward2 = _interopRequireDefault(_backward);

var _forward = require('react-icons/lib/fa/forward');

var _forward2 = _interopRequireDefault(_forward);

var _PullRequestDC = require('../pull-requests/PullRequestDC');

var _PullRequestDC2 = _interopRequireDefault(_PullRequestDC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LastPrMultiRepos = function (_Component) {
    _inherits(LastPrMultiRepos, _Component);

    function LastPrMultiRepos(props) {
        _classCallCheck(this, LastPrMultiRepos);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.goNextPage = _this.goNextPage.bind(_this);
        _this.goPreviousPage = _this.goPreviousPage.bind(_this);
        _this.playOrPause = _this.playOrPause.bind(_this);
        return _this;
    }

    LastPrMultiRepos.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        nextProps.currentPage = this.props.currentPage;
        nextProps.playing = this.props.playing;
    };

    LastPrMultiRepos.getApiRequest = function getApiRequest(_ref) {
        var organisation = _ref.organisation;

        return {
            id: 'github.pullRequestsMultiRepos.' + organisation,
            params: { organisation: organisation }
        };
    };

    LastPrMultiRepos.prototype.getAllPullRequests = function getAllPullRequests() {
        var prs = [];
        var apiData = this.props.apiData;


        for (var i = 0; i < apiData.length; i++) {
            for (var j = 0; j < apiData[i].pullRequests.length; j++) {
                prs.push(apiData[i].pullRequests[j]);
            }
        }
        prs.sort(function (a, b) {
            return new Date(b.updated_at) - new Date(a.updated_at);
        });

        return prs;
    };

    LastPrMultiRepos.prototype.getLastPullRequests = function getLastPullRequests() {
        var _props = this.props,
            apiData = _props.apiData,
            elemOnPage = _props.elemOnPage;

        var lastPullRequests = [];
        var prs = this.getAllPullRequests();
        var pr = [];

        for (var i = 0; i < prs.length; i++) {
            pr.push(prs[i]);
            if (elemOnPage) {
                if (pr.length === elemOnPage) {
                    lastPullRequests.push(pr);
                    pr = [];
                }
            }
        }
        if (pr.length) {
            lastPullRequests.push(pr);
        }
        return lastPullRequests;
    };

    LastPrMultiRepos.prototype.goNextPage = function goNextPage() {
        if (this.props.apiData) {
            this.props.currentPage = this.props.currentPage < this.getLastPullRequests().length - 1 ? this.props.currentPage + 1 : 0;
            this.setState();
        }
    };

    LastPrMultiRepos.prototype.goPreviousPage = function goPreviousPage() {
        if (this.props.apiData) {
            this.props.currentPage = this.props.currentPage > 0 ? this.props.currentPage - 1 : this.getLastPullRequests().length - 1;
            this.setState();
        }
    };

    LastPrMultiRepos.prototype.playOrPause = function playOrPause() {
        this.props.playing = !this.props.playing;
        this.setState();
    };

    LastPrMultiRepos.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        setInterval(function () {
            if (_this2.props.playing) {
                _this2.goNextPage();
            }
        }, 5000);
    };

    LastPrMultiRepos.prototype.render = function render() {
        var _props2 = this.props,
            view = _props2.view,
            repository = _props2.repository,
            title = _props2.title,
            apiData = _props2.apiData,
            apiError = _props2.apiError,
            elemOnPage = _props2.elemOnPage;


        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        var count = 0;
        var viewId = view === 'tv' ? 'tv' : 'screen';
        if (apiData) {
            var lastPullRequests = this.getLastPullRequests();

            count = _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'control-prs' },
                    _react2.default.createElement(
                        'span',
                        null,
                        this.props.currentPage + 1 + ' / ' + lastPullRequests.length
                    ),
                    _react2.default.createElement(
                        'a',
                        { onClick: this.goPreviousPage },
                        _react2.default.createElement(_backward2.default, null)
                    ),
                    _react2.default.createElement(
                        'a',
                        { onClick: this.playOrPause },
                        this.props.playing ? _react2.default.createElement(_pause2.default, null) : _react2.default.createElement(_play2.default, null)
                    ),
                    _react2.default.createElement(
                        'a',
                        { onClick: this.goNextPage },
                        _react2.default.createElement(_forward2.default, null)
                    )
                )
            );
            body = _react2.default.createElement(
                'div',
                { id: 'prs' },
                _react2.default.createElement(
                    'div',
                    { className: viewId },
                    lastPullRequests[this.props.currentPage].map(function (pullRequest) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'pull-request' },
                            _react2.default.createElement(_PullRequestDC2.default, { key: pullRequest.id, pullRequest: pullRequest })
                        );
                    })
                )
            );
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: title || 'Last PR',
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
    organisation: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string,
    elemOnPage: _propTypes2.default.number,
    view: _propTypes2.default.string,
    apiData: _propTypes2.default.shape({
        LastPrMultiRepos: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.object)).isRequired
    }),
    apiError: _propTypes2.default.object
};
LastPrMultiRepos.defaultProps = {
    currentPage: 0,
    playing: true
};
exports.default = LastPrMultiRepos;