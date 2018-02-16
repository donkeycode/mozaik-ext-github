function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GithubIcon from 'react-icons/lib/fa/github-alt';
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui';
import RepoContributorStat from './RepoContributorStat';

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


        var body = React.createElement(WidgetLoader, null);
        var count = void 0;
        if (apiData && !apiError) {
            var contributors = apiData.contributors.slice().sort(function (contribA, contribB) {
                return contribB.total - contribA.total;
            });

            count = contributors.length;
            body = React.createElement(
                'div',
                null,
                contributors.map(function (contributor) {
                    return React.createElement(RepoContributorStat, {
                        key: contributor.author.id,
                        contributor: contributor
                    });
                })
            );
        }

        return React.createElement(
            Widget,
            null,
            React.createElement(WidgetHeader, {
                title: title || 'Contributors',
                subject: title ? null : repository,
                count: count,
                icon: GithubIcon
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

    return RepoContributorsStats;
}(Component);

RepoContributorsStats.propTypes = {
    repository: PropTypes.string.isRequired,
    title: PropTypes.string,
    apiData: PropTypes.shape({
        contributors: PropTypes.arrayOf(PropTypes.object).isRequired
    }),
    apiError: PropTypes.object
};
export default RepoContributorsStats;