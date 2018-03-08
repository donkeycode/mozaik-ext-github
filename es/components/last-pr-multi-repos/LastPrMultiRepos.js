function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WidgetLabel, TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody } from '@mozaik/ui';
import GithubIcon from 'react-icons/lib/fa/github-alt';
import PullRequestDC from '../pull-requests/PullRequestDC';

var LastPrMultiRepos = function (_Component) {
    _inherits(LastPrMultiRepos, _Component);

    function LastPrMultiRepos() {
        _classCallCheck(this, LastPrMultiRepos);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    LastPrMultiRepos.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        nextProps.currentPage = this.props.currentPage;
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

    LastPrMultiRepos.prototype.setCurrentPage = function setCurrentPage() {
        if (this.props.apiData) {
            this.props.currentPage = this.props.currentPage < this.getLastPullRequests().length - 1 ? this.props.currentPage + 1 : 0;
            this.setState();
        }
    };

    LastPrMultiRepos.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        setInterval(function () {
            _this2.setCurrentPage();
        }, 5000);
    };

    LastPrMultiRepos.prototype.render = function render() {
        var _props2 = this.props,
            repository = _props2.repository,
            title = _props2.title,
            apiData = _props2.apiData,
            apiError = _props2.apiError,
            elemOnPage = _props2.elemOnPage;


        var body = React.createElement(WidgetLoader, null);
        var count = 0;
        if (apiData) {
            var lastPullRequests = this.getLastPullRequests();

            count = this.props.currentPage + 1 + ' / ' + lastPullRequests.length;
            body = React.createElement(
                'div',
                null,
                lastPullRequests[this.props.currentPage].map(function (pullRequest) {
                    return React.createElement(
                        'div',
                        null,
                        React.createElement(WidgetLabel, {
                            label: React.createElement(
                                'a',
                                { href: '' + pullRequest.base.repo.html_url, target: '_blank' },
                                pullRequest.base.repo.name
                            ),
                            style: { width: '100%', marginBottom: '1vmin' }
                        }),
                        React.createElement(PullRequestDC, { key: pullRequest.id, pullRequest: pullRequest })
                    );
                })
            );
        }

        return React.createElement(
            Widget,
            null,
            React.createElement(WidgetHeader, {
                title: title || 'Last Pull Requests',
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
    apiData: PropTypes.shape({
        LastPrMultiRepos: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
    }),
    apiError: PropTypes.object
};
LastPrMultiRepos.defaultProps = {
    currentPage: 0
};
export default LastPrMultiRepos;