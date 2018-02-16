'use strict';

exports.__esModule = true;

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


        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        if (orgInfo) {
            body = _react2.default.createElement(
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
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            height: '40%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    },
                    _react2.default.createElement(
                        'a',
                        { href: orgInfo.html_url, target: '_blank' },
                        _react2.default.createElement(
                            _ui.WidgetAvatar,
                            { size: '7vmin' },
                            _react2.default.createElement('img', { src: orgInfo.avatar_url, alt: this.props.organization })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            padding: '2vmin',
                            textAlign: 'center'
                        }
                    },
                    orgInfo.description
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
                        label: _react2.default.createElement(
                            'a',
                            { href: '' + orgInfo.html_url, target: '_blank' },
                            'public repos'
                        ),
                        prefix: orgInfo.public_repos,
                        style: { width: '48%', marginBottom: '1vmin' }
                    }),
                    _react2.default.createElement(_ui.WidgetLabel, {
                        label: 'public gists',
                        prefix: orgInfo.public_gists,
                        style: { width: '48%', marginBottom: '1vmin' }
                    }),
                    _react2.default.createElement(_ui.WidgetLabel, {
                        label: 'followers',
                        prefix: orgInfo.followers,
                        style: { width: '48%', marginBottom: '1vmin' }
                    }),
                    _react2.default.createElement(_ui.WidgetLabel, {
                        label: 'following',
                        prefix: orgInfo.following,
                        style: { width: '48%', marginBottom: '1vmin' }
                    })
                )
            );
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: title || 'organization',
                subject: title ? null : organization,
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

    return OrgBadge;
}(_react.Component);

OrgBadge.propTypes = {
    organization: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string,
    apiData: _propTypes2.default.shape({}),
    apiError: _propTypes2.default.object
};
exports.default = OrgBadge;