var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GithubIcon from 'react-icons/lib/fa/github-alt';
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader, WidgetLabel as Label } from '@mozaik/ui';

var RepoBadge = function (_Component) {
    _inherits(RepoBadge, _Component);

    function RepoBadge() {
        _classCallCheck(this, RepoBadge);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    RepoBadge.getApiRequest = function getApiRequest(_ref) {
        var repository = _ref.repository;

        return {
            id: 'github.repository.' + repository,
            params: { repository: repository }
        };
    };

    RepoBadge.prototype.render = function render() {
        var _props = this.props,
            repository = _props.repository,
            title = _props.title,
            repoInfo = _props.apiData,
            apiError = _props.apiError;


        var body = React.createElement(WidgetLoader, null);
        if (repoInfo) {
            var labelStyle = { width: '48%', marginBottom: '1vmin' };

            body = React.createElement(
                'div',
                {
                    style: {
                        padding: '1.6vmin',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        alignContent: 'stretch',
                        flexDirection: 'column'
                    }
                },
                React.createElement(
                    'div',
                    {
                        style: {
                            padding: '2vmin 0',
                            textAlign: 'center'
                        }
                    },
                    repoInfo.description
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
                    React.createElement(Label, {
                        label: 'homepage',
                        suffix: React.createElement(
                            'a',
                            { href: repoInfo.homepage, target: '_blank' },
                            repoInfo.homepage
                        ),
                        style: _extends({}, labelStyle, {
                            width: '100%'
                        })
                    }),
                    React.createElement(Label, {
                        label: 'default branch',
                        suffix: repoInfo.default_branch,
                        style: _extends({}, labelStyle, {
                            width: '100%'
                        })
                    }),
                    React.createElement(Label, {
                        label: 'issues',
                        suffix: repoInfo.open_issues_count,
                        style: labelStyle
                    }),
                    React.createElement(Label, {
                        label: 'watchers',
                        suffix: repoInfo.watchers_count,
                        style: labelStyle
                    }),
                    React.createElement(Label, {
                        label: 'subscribers',
                        suffix: repoInfo.subscribers_count,
                        style: labelStyle
                    }),
                    React.createElement(Label, { label: 'size', suffix: repoInfo.size, style: labelStyle })
                )
            );
        }

        return React.createElement(
            Widget,
            null,
            React.createElement(WidgetHeader, {
                title: title || 'Repository',
                subject: title ? null : repository,
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

    return RepoBadge;
}(Component);

RepoBadge.propTypes = {
    repository: PropTypes.string.isRequired,
    title: PropTypes.string,
    apiData: PropTypes.object,
    apiError: PropTypes.object,
    showKeys: PropTypes.arrayOf(PropTypes.string).isRequired
};
RepoBadge.defaultProps = {
    showKeys: ['description']
};
export default RepoBadge;