'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _clockO = require('react-icons/lib/fa/clock-o');

var _clockO2 = _interopRequireDefault(_clockO);

var _ui = require('@mozaik/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
        console.log('props', this.props);
        return _react2.default.createElement(_ui.WidgetListItem, {
            title: _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                    'a',
                    { href: html_url, target: '_blank' },
                    title
                ),
                ' ',
                'by',
                ' ',
                _react2.default.createElement(
                    'a',
                    { href: user.html_url, target: '_blank' },
                    user.login
                )
            ),
            pre: _react2.default.createElement(
                _ui.WidgetAvatar,
                { href: user.html_url, size: '4vmin' },
                _react2.default.createElement('img', { src: user.avatar_url, alt: user.login })
            ),
            meta: _react2.default.createElement(
                'span',
                {
                    style: {
                        display: 'flex',
                        alignItems: 'center'
                    }
                },
                _react2.default.createElement(_clockO2.default, null),
                '\xA0',
                (0, _moment2.default)(created_at).fromNow()
            )
        });
    };

    return PullRequest;
}(_react.Component);

PullRequest.propTypes = {
    pullRequest: _propTypes2.default.shape({
        title: _propTypes2.default.string.isRequired,
        html_url: _propTypes2.default.string.isRequired,
        created_at: _propTypes2.default.string.isRequired,
        user: _propTypes2.default.shape({
            html_url: _propTypes2.default.string.isRequired,
            avatar_url: _propTypes2.default.string.isRequired,
            login: _propTypes2.default.string.isRequired
        }).isRequired
    }).isRequired
};
exports.default = PullRequest;