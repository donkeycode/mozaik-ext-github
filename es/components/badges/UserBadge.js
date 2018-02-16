function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GithubIcon from 'react-icons/lib/fa/github-alt';
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader, WidgetLabel, WidgetAvatar } from '@mozaik/ui';

var UserBadge = function (_Component) {
    _inherits(UserBadge, _Component);

    function UserBadge() {
        _classCallCheck(this, UserBadge);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    UserBadge.getApiRequest = function getApiRequest(_ref) {
        var user = _ref.user;

        return {
            id: 'github.user.' + user,
            params: { user: user }
        };
    };

    UserBadge.prototype.render = function render() {
        var _props = this.props,
            title = _props.title,
            user = _props.apiData,
            apiError = _props.apiError;


        var body = React.createElement(WidgetLoader, null);
        if (user) {
            body = React.createElement(
                'div',
                {
                    style: {
                        padding: '1.6vmin',
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'stretch',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%'
                    }
                },
                React.createElement(
                    'div',
                    {
                        style: {
                            height: '40%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    },
                    React.createElement(
                        'a',
                        { href: user.html_url, target: '_blank' },
                        React.createElement(
                            WidgetAvatar,
                            { size: '7vmin' },
                            React.createElement('img', { src: user.avatar_url, alt: this.props.user })
                        )
                    )
                ),
                React.createElement(
                    'div',
                    {
                        style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'
                        }
                    },
                    React.createElement(WidgetLabel, {
                        label: React.createElement(
                            'a',
                            { href: user.html_url + '?tab=repositories', target: '_blank' },
                            'public repos'
                        ),
                        prefix: user.public_repos,
                        style: { width: '48%', marginBottom: '1vmin' }
                    }),
                    React.createElement(WidgetLabel, {
                        label: 'public gists',
                        prefix: user.public_gists,
                        style: { width: '48%', marginBottom: '1vmin' }
                    }),
                    React.createElement(WidgetLabel, {
                        label: React.createElement(
                            'a',
                            { href: user.html_url + '/followers', target: '_blank' },
                            'followers'
                        ),
                        prefix: user.followers,
                        style: { width: '48%', marginBottom: '1vmin' }
                    }),
                    React.createElement(WidgetLabel, {
                        label: React.createElement(
                            'a',
                            { href: user.html_url + '/following', target: '_blank' },
                            'following'
                        ),
                        prefix: user.following,
                        style: { width: '48%', marginBottom: '1vmin' }
                    }),
                    React.createElement(WidgetLabel, {
                        label: 'company',
                        suffix: user.company,
                        style: { width: '100%' }
                    })
                )
            );
        }

        return React.createElement(
            Widget,
            null,
            React.createElement(WidgetHeader, {
                title: title || 'GitHub User',
                subject: title ? null : this.props.user,
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

    return UserBadge;
}(Component);

UserBadge.propTypes = {
    user: PropTypes.string.isRequired,
    title: PropTypes.string,
    apiData: PropTypes.shape({}),
    apiError: PropTypes.object
};
export default UserBadge;