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
            reviewers = _react2.default.createElement(
                'div',
                null,
                requested_reviewers.map(function (reviewer) {
                    return _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'a',
                            {
                                style: {
                                    border: '1px solid #ff0000',
                                    display: 'inline-block',
                                    margin: '2vmin',
                                    padding: '1vmin'
                                },
                                href: reviewer.html_url, target: '_blank' },
                            _react2.default.createElement(
                                _ui.WidgetAvatar,
                                { href: reviewer.html_url, size: '3vmin' },
                                _react2.default.createElement('img', { src: reviewer.avatar_url, alt: reviewer.login })
                            )
                        )
                    );
                })
            );
        }

        return _react2.default.createElement(
            'div',
            {
                style: {
                    display: 'flex'
                } },
            _react2.default.createElement(_ui.WidgetListItem, {
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
                    (0, _moment2.default)(updated_at).fromNow()
                )
            }),
            reviewers
        );
    };

    return PullRequestDC;
}(_react.Component);

PullRequestDC.propTypes = {
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
exports.default = PullRequestDC;