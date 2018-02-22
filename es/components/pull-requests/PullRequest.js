function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ClockIcon from 'react-icons/lib/fa/clock-o';
import { WidgetListItem, WidgetAvatar } from '@mozaik/ui';

var PullRequest = function (_Component) {
    _inherits(PullRequest, _Component);

    function PullRequest() {
        _classCallCheck(this, PullRequest);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    PullRequest.prototype.render = function render() {
        var pullRequest = this.props.pullRequest;
        var title = pullRequest.title,
            html_url = pullRequest.html_url,
            created_at = pullRequest.created_at,
            user = pullRequest.user;


        console.log('Trying to render pull request');
        console.log('pr', pullRequest);
        return React.createElement(WidgetListItem, {
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
                moment(created_at).fromNow()
            )
        });
    };

    return PullRequest;
}(Component);

PullRequest.propTypes = {
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
export default PullRequest;