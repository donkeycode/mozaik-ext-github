function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RepoCommitActivityHistogramChart from './charts/RepoCommitActivityHistogramChart';
import RepoCommitActivityLineChart from './charts/RepoCommitActivityLineChart';
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui';
import GithubIcon from 'react-icons/lib/fa/github-alt';

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


        var body = React.createElement(WidgetLoader, null);
        if (apiData && !apiError) {
            if (type === 'histogram') {
                body = React.createElement(RepoCommitActivityHistogramChart, { theme: theme, commits: apiData.buckets });
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

                body = React.createElement(RepoCommitActivityLineChart, { theme: theme, commits: chartData });
            }
        }

        return React.createElement(
            Widget,
            null,
            React.createElement(WidgetHeader, {
                title: title || 'Commit Activity',
                subject: title ? null : repository,
                icon: GithubIcon
            }),
            React.createElement(
                WidgetBody,
                { style: { overflowY: 'hidden' } },
                React.createElement(
                    TrapApiError,
                    { error: apiError },
                    body
                )
            )
        );
    };

    return RepositoryCommitActivity;
}(Component);

RepositoryCommitActivity.propTypes = {
    repository: PropTypes.string.isRequired,
    title: PropTypes.string,
    apiData: PropTypes.shape({
        buckets: PropTypes.arrayOf(PropTypes.object).isRequired
    }),
    apiError: PropTypes.object,
    type: PropTypes.oneOf(['histogram', 'line']).isRequired,
    theme: PropTypes.object.isRequired
};
export default RepositoryCommitActivity;