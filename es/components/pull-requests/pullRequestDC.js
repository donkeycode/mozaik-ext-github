function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ClockIcon from 'react-icons/lib/fa/clock-o';
import { WidgetListItem, WidgetAvatar } from '@mozaik/ui';

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
            requested_reviewers = pullRequest.requested_reviewers;


        var reviewers = null;
        console.log(requested_reviewers);
        if (requested_reviewers.length) {
            reviewers = React.createElement(
                'div',
                null,
                requested_reviewers.map(function (reviewer) {
                    return React.createElement(
                        'div',
                        {
                            style: {
                                background: 'ff0000',
                                display: 'inline-block',
                                margin: '2vmin',
                                padding: '1vmin'
                            } },
                        React.createElement(
                            'a',
                            { href: reviewer.html_url, target: '_blank' },
                            React.createElement(
                                WidgetAvatar,
                                { href: reviewer.html_url, size: '3vmin' },
                                React.createElement('img', { src: reviewer.avatar_url, alt: reviewer.login })
                            )
                        )
                    );
                })
            );
        }

        return React.createElement(
            'div',
            {
                style: {
                    display: 'flex'
                } },
            React.createElement(WidgetListItem, {
                title: React.createElement(
                    'span',
                    null,
                    React.createElement(
                        'a',
                        { href: html_url, target: '_blank' },
                        title
                    ),
                    ' ',
                    'by',
                    ' ',
                    React.createElement(
                        'a',
                        { href: user.html_url, target: '_blank' },
                        user.login
                    )
                ),
                pre: React.createElement(
                    WidgetAvatar,
                    { href: user.html_url, size: '4vmin' },
                    React.createElement('img', { src: user.avatar_url, alt: user.login })
                ),
                meta: React.createElement(
                    'span',
                    {
                        style: {
                            display: 'flex',
                            alignItems: 'center'
                        }
                    },
                    React.createElement(ClockIcon, null),
                    '\xA0',
                    moment(updated_at).fromNow()
                )
            }),
            reviewers
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