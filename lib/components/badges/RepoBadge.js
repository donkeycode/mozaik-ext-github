'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _githubAlt = require('react-icons/lib/fa/github-alt');

var _githubAlt2 = _interopRequireDefault(_githubAlt);

var _ui = require('@mozaik/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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


        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        if (repoInfo) {
            var labelStyle = { width: '48%', marginBottom: '1vmin' };

            body = _react2.default.createElement(
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
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            padding: '2vmin 0',
                            textAlign: 'center'
                        }
                    },
                    repoInfo.description
                ),
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'
                        }
                    },
                    _react2.default.createElement(_ui.WidgetLabel, {
                        label: 'homepage',
                        suffix: _react2.default.createElement(
                            'a',
                            { href: repoInfo.homepage, target: '_blank' },
                            repoInfo.homepage
                        ),
                        style: _extends({}, labelStyle, {
                            width: '100%'
                        })
                    }),
                    _react2.default.createElement(_ui.WidgetLabel, {
                        label: 'default branch',
                        suffix: repoInfo.default_branch,
                        style: _extends({}, labelStyle, {
                            width: '100%'
                        })
                    }),
                    _react2.default.createElement(_ui.WidgetLabel, {
                        label: 'issues',
                        suffix: repoInfo.open_issues_count,
                        style: labelStyle
                    }),
                    _react2.default.createElement(_ui.WidgetLabel, {
                        label: 'watchers',
                        suffix: repoInfo.watchers_count,
                        style: labelStyle
                    }),
                    _react2.default.createElement(_ui.WidgetLabel, {
                        label: 'subscribers',
                        suffix: repoInfo.subscribers_count,
                        style: labelStyle
                    }),
                    _react2.default.createElement(_ui.WidgetLabel, { label: 'size', suffix: repoInfo.size, style: labelStyle })
                )
            );
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: title || 'Repository',
                subject: title ? null : repository,
                icon: _githubAlt2.default
            }),
            _react2.default.createElement(
                _ui.WidgetBody,
                null,
                _react2.default.createElement(
                    _ui.TrapApiError,
                    { error: apiError },
                    body
                )
            )
        );
    };

    return RepoBadge;
}(_react.Component);

RepoBadge.propTypes = {
    repository: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string,
    apiData: _propTypes2.default.object,
    apiError: _propTypes2.default.object,
    showKeys: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired
};
RepoBadge.defaultProps = {
    showKeys: ['description']
};
exports.default = RepoBadge;