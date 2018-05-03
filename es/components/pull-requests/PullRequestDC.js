function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ClockIcon from 'react-icons/lib/fa/clock-o';
import { WidgetLabel, WidgetListItem, WidgetAvatar } from '@mozaik/ui';
import Reviewer from './Reviewer';

var PullRequestDC = function (_Component) {
    _inherits(PullRequestDC, _Component);

    function PullRequestDC() {
        _classCallCheck(this, PullRequestDC);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    PullRequestDC.prototype.render = function render() {
        var pullRequest = this.props.pullRequest;
        var title = pullRequest.title,
            html_url = pullRequest.html_url,
            updated_at = pullRequest.updated_at,
            user = pullRequest.user,
            requested_reviewers = pullRequest.requested_reviewers,
            labels = pullRequest.labels;


        var reviewersBody = null;
        var labelsBody = null;
        if (requested_reviewers.length) {
            reviewersBody = React.createElement(
                'div',
                { className: 'reviewers' },
                requested_reviewers.map(function (reviewer) {
                    return React.createElement(Reviewer, { reviewer: reviewer });
                })
            );
        }

        if (labels.length) {
            labelsBody = React.createElement(
                'div',
                { className: 'labels' },
                labels.map(function (label) {
                    return React.createElement(
                        'div',
                        { className: 'label', style: { background: '#' + label.color } },
                        React.createElement(
                            'span',
                            null,
                            label.name
                        )
                    );
                })
            );
        }

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'pr-dc' },
                React.createElement(
                    WidgetAvatar,
                    { href: user.html_url, size: '4vmin', style: { display: 'inlineBlock', marginLeft: '10px' } },
                    React.createElement('img', { src: user.avatar_url, alt: user.login })
                ),
                React.createElement(
                    'h2',
                    { className: 'repo-name' },
                    React.createElement(
                        'a',
                        { href: '' + pullRequest.base.repo.html_url, target: '_blank' },
                        pullRequest.base.repo.name
                    )
                ),
                React.createElement(
                    'span',
                    { className: 'clock' },
                    React.createElement(ClockIcon, null),
                    '\xA0',
                    moment(updated_at).fromNow()
                )
            ),
            React.createElement(
                'div',
                { className: 'pr-title' },
                React.createElement(
                    'span',
                    null,
                    React.createElement(
                        'a',
                        { href: html_url, target: '_blank' },
                        title
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'pr-infos-more' },
                labelsBody,
                reviewersBody
            )
        );
    };

    return PullRequestDC;
}(Component);

PullRequestDC.propTypes = {
    pullRequest: PropTypes.shape({
        title: PropTypes.string.isRequired,
        html_url: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        user: PropTypes.shape({
            html_url: PropTypes.string.isRequired,
            avatar_url: PropTypes.string.isRequired,
            login: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};
export default PullRequestDC;