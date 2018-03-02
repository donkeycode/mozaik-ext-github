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

    function LastPrMultiRepos(props) {
        _classCallCheck(this, LastPrMultiRepos);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        console.log('Component has been built');
        return _this;
    }

    LastPrMultiRepos.getApiRequest = function getApiRequest(_ref) {
        var repositories = _ref.repositories,
            owner = _ref.owner;

        return {
            id: 'github.pullRequestsMultiRepos.' + repositories + '.' + owner,
            params: { repositories: repositories, owner: owner }
        };
    };

    LastPrMultiRepos.prototype.getLastPullRequests = function getLastPullRequests() {
        var _props = this.props,
            apiData = _props.apiData,
            elemOnPage = _props.elemOnPage;

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
        if (pr.length) {
            lastPullRequests.push(pr);
        }
        return lastPullRequests;
    };

    LastPrMultiRepos.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        setInterval(function () {
            if (_this2.props.apiData) {
                console.log(_this2.getLastPullRequests().length);
                _this2.props.currentPage = _this2.props.currentPage < _this2.getLastPullRequests().length ? _this2.props.currentPage + 1 : 0;
                console.log('Current page', _this2.props.currentPage);
                _this2.setState();
            } else {
                console.log('No API data');
            }
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
            console.log('apiData', apiData.length, apiData);

            var lastPullRequests = this.getLastPullRequests();

            count = this.props.currentPage + 1 + ' / ' + (lastPullRequests.length - 1);
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

    LastPrMultiRepos.prototype.componentWillUnmount = function componentWillUnmount() {
        console.log('Component destroyed');
    };

    return LastPrMultiRepos;
}(Component);

LastPrMultiRepos.PropTypes = {
    repositories: PropTypes.arrayOf(PropTypes.string).isRequired,
    owner: PropTypes.string.isRequired,
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