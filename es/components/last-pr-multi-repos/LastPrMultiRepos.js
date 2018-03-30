function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody } from '@mozaik/ui';
import GithubIcon from 'react-icons/lib/fa/github-alt';
import FaPause from 'react-icons/lib/fa/pause';
import FaPlay from 'react-icons/lib/fa/play';
import FaBackward from 'react-icons/lib/fa/backward';
import FaForward from 'react-icons/lib/fa/forward';
import PullRequestDC from '../pull-requests/PullRequestDC';

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


        var body = React.createElement(WidgetLoader, null);
        var count = 0;
        var viewId = view === 'tv' ? 'tv' : 'screen';
        if (apiData) {
            var lastPullRequests = this.getLastPullRequests();

            count = React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'control-prs' },
                    React.createElement(
                        'span',
                        null,
                        this.props.currentPage + 1 + ' / ' + lastPullRequests.length
                    ),
                    React.createElement(
                        'a',
                        { onClick: this.goPreviousPage },
                        React.createElement(FaBackward, null)
                    ),
                    React.createElement(
                        'a',
                        { onClick: this.playOrPause },
                        this.props.playing ? React.createElement(FaPause, null) : React.createElement(FaPlay, null)
                    ),
                    React.createElement(
                        'a',
                        { onClick: this.goNextPage },
                        React.createElement(FaForward, null)
                    )
                )
            );
            body = React.createElement(
                'div',
                { id: 'prs' },
                React.createElement(
                    'div',
                    { className: viewId },
                    lastPullRequests[this.props.currentPage].map(function (pullRequest) {
                        return React.createElement(
                            'div',
                            { className: 'pull-request' },
                            React.createElement(PullRequestDC, { key: pullRequest.id, pullRequest: pullRequest })
                        );
                    })
                )
            );
        }

        return React.createElement(
            Widget,
            null,
            React.createElement(WidgetHeader, {
                title: title || 'Last PR',
                icon: GithubIcon,
                count: count
            }),
            React.createElement(
                WidgetBody,
                null,
                React.createElement(
                    TrapApiError,
                    { error: apiError },
                    body
                )
            )
        );
    };

    return LastPrMultiRepos;
}(Component);

LastPrMultiRepos.PropTypes = {
    organisation: PropTypes.string.isRequired,
    title: PropTypes.string,
    elemOnPage: PropTypes.number,
    view: PropTypes.string,
    apiData: PropTypes.shape({
        LastPrMultiRepos: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
    }),
    apiError: PropTypes.object
};
LastPrMultiRepos.defaultProps = {
    currentPage: 0,
    playing: true
};
export default LastPrMultiRepos;