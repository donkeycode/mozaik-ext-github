function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GithubIcon from 'react-icons/lib/fa/github-alt';
import { TrapApiError, Widget, WidgetLabel, WidgetHeader, WidgetBody, WidgetLoader, WidgetAvatar } from '@mozaik/ui';

var OrgBadge = function (_Component) {
    _inherits(OrgBadge, _Component);

    function OrgBadge() {
        _classCallCheck(this, OrgBadge);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    OrgBadge.getApiRequest = function getApiRequest(_ref) {
        var organization = _ref.organization;

        return {
            id: 'github.organization.' + organization,
            params: { organization: organization }
        };
    };

    OrgBadge.prototype.render = function render() {
        var _props = this.props,
            organization = _props.organization,
            title = _props.title,
            orgInfo = _props.apiData,
            apiError = _props.apiError;


        var body = React.createElement(WidgetLoader, null);
        if (orgInfo) {
            body = React.createElement(
                'div',
                {
                    style: {
                        padding: '1.6vmin',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'stretch',
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
                        { href: orgInfo.html_url, target: '_blank' },
                        React.createElement(
                            WidgetAvatar,
                            { size: '7vmin' },
                            React.createElement('img', { src: orgInfo.avatar_url, alt: this.props.organization })
                        )
                    )
                ),
                React.createElement(
                    'div',
                    {
                        style: {
                            padding: '2vmin',
                            textAlign: 'center'
                        }
                    },
                    orgInfo.description
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
                            { href: '' + orgInfo.html_url, target: '_blank' },
                            'public repos'
                        ),
                        prefix: orgInfo.public_repos,
                        style: { width: '48%', marginBottom: '1vmin' }
                    }),
                    React.createElement(WidgetLabel, {
                        label: 'public gists',
                        prefix: orgInfo.public_gists,
                        style: { width: '48%', marginBottom: '1vmin' }
                    }),
                    React.createElement(WidgetLabel, {
                        label: 'followers',
                        prefix: orgInfo.followers,
                        style: { width: '48%', marginBottom: '1vmin' }
                    }),
                    React.createElement(WidgetLabel, {
                        label: 'following',
                        prefix: orgInfo.following,
                        style: { width: '48%', marginBottom: '1vmin' }
                    })
                )
            );
        }

        return React.createElement(
            Widget,
            null,
            React.createElement(WidgetHeader, {
                title: title || 'organization',
                subject: title ? null : organization,
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

    return OrgBadge;
}(Component);

OrgBadge.propTypes = {
    organization: PropTypes.string.isRequired,
    title: PropTypes.string,
    apiData: PropTypes.shape({}),
    apiError: PropTypes.object
};
export default OrgBadge;