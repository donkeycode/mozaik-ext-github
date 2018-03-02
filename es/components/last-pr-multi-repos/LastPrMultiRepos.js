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
            console.log('this.props.nbPages', _this2.props.nbPages);
            var nextPage = _this2.props.currentPage < _this2.props.nbPages - 1 ? _this2.props.currentPage + 1 : 0;
            console.log(nextPage);
            _this2.props.currentPage = nextPage;
            _this2.setState();
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


        var body = React.createElement(WidgetLoader, null);
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
            console.log('nbPages', this.props.nbPages);
            console.log('lastPullRequests.length', lastPullRequests.length);
            // lastPullRequests.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
            console.log('lastPullRequests', lastPullRequests);
            count = this.props.currentPage + ' / ' + this.props.nbPages;
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
    currentPage: 0,
    nbPages: 1
};
export default LastPrMultiRepos;