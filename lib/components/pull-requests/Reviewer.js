'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ui = require('@mozaik/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Reviewer = function (_Component) {
    _inherits(Reviewer, _Component);

    function Reviewer() {
        _classCallCheck(this, Reviewer);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Reviewer.prototype.render = function render() {
        var _props = this.props,
            reviewer = _props.reviewer,
            display_nb_request = _props.display_nb_request;
        var html_url = reviewer.html_url,
            avatar_url = reviewer.avatar_url,
            login = reviewer.login,
            nbRequest = reviewer.nbRequest;


        return _react2.default.createElement(
            'div',
            { className: 'reviewer' },
            display_nb_request && _react2.default.createElement(
                'span',
                { className: 'nb-request' },
                nbRequest
            ),
            _react2.default.createElement(
                'a',
                { className: 'avatar', href: html_url, target: '_blank' },
                _react2.default.createElement(
                    _ui.WidgetAvatar,
                    { href: html_url, size: '3vmin' },
                    _react2.default.createElement('img', { src: avatar_url, alt: login })
                )
            )
        );
    };

    return Reviewer;
}(_react.Component);

Reviewer.propTypes = {
    reviewer: _propTypes2.default.shape({
        html_url: _propTypes2.default.string.isRequired,
        avatar_url: _propTypes2.default.string.isRequired,
        login: _propTypes2.default.string.isRequired
    }).isRequired,
    display_nb_request: _propTypes2.default.bool
};
exports.default = Reviewer;