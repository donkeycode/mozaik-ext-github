'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dotCircleO = require('react-icons/lib/fa/dot-circle-o');

var _dotCircleO2 = _interopRequireDefault(_dotCircleO);

var _ui = require('@mozaik/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RepoContributorStat = function (_Component) {
    _inherits(RepoContributorStat, _Component);

    function RepoContributorStat() {
        _classCallCheck(this, RepoContributorStat);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    RepoContributorStat.prototype.render = function render() {
        var _props$contributor = this.props.contributor,
            author = _props$contributor.author,
            total = _props$contributor.total;


        return _react2.default.createElement(_ui.WidgetListItem, {
            title: _react2.default.createElement(
                'a',
                { href: author.html_url, target: '_blank' },
                author.login
            ),
            pre: _react2.default.createElement(
                _ui.WidgetAvatar,
                { size: '4vmin' },
                _react2.default.createElement('img', { src: author.avatar_url, alt: author.login })
            ),
            post: _react2.default.createElement(
                'span',
                {
                    style: {
                        display: 'flex',
                        alignItems: 'center'
                    }
                },
                total,
                '\xA0',
                _react2.default.createElement(_dotCircleO2.default, null)
            )
        });
    };

    return RepoContributorStat;
}(_react.Component);

RepoContributorStat.propTypes = {
    contributor: _propTypes2.default.shape({
        total: _propTypes2.default.number.isRequired,
        author: _propTypes2.default.shape({
            login: _propTypes2.default.string.isRequired,
            avatar_url: _propTypes2.default.string.isRequired
        }).isRequired
    }).isRequired
};
exports.default = RepoContributorStat;