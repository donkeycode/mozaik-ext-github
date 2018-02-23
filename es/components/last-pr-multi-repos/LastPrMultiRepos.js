function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WidgetLabel, TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody } from '@mozaik/ui';
import GithubIcon from 'react-icons/lib/fa/github-alt';
import PullRequest from '../pull-requests/PullRequest';

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

    LastPrMultiRepos.prototype.render = function render() {
        var _props = this.props,
            repository = _props.repository,
            title = _props.title,
            apiData = _props.apiData,
            apiError = _props.apiError;


        var body = React.createElement(WidgetLoader, null);
        var count = 0;
        if (apiData) {
            console.log('apiData', apiData.length, apiData);
            var lastPullRequests = [];

            // .filter(repo => repo.pullRequests.length)
            // .sort((a, b) => new Date(a.updated_at) < new Date(b.updated_at))
            // .map(repo => repo.pullRequests[0])

            for (var i = 0; i < apiData.length; i++) {
                console.log('apiData', apiData[i]);
                for (var j = 0; j < apiData[i].pullRequests.length; j++) {
                    console.log('pull request', apiData[i].pullRequests[j]);
                    lastPullRequests.push(apiData[i].pullRequests[j]);
                }
            }
            lastPullRequests.sort(function (a, b) {
                return new Date(b.updated_at) - new Date(a.updated_at);
            });
            console.log('lastPullRequests', lastPullRequests);
            count = lastPullRequests.length;
            body = React.createElement(
                'div',
                null,
                lastPullRequests.map(function (pullRequest) {
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
                        React.createElement(PullRequest, { key: pullRequest.id, pullRequest: pullRequest })
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
    apiData: PropTypes.shape({
        LastPrMultiRepos: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
    }),
    apiError: PropTypes.object
};
export default LastPrMultiRepos;