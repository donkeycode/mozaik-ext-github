'use strict';

exports.__esModule = true;
exports.BranchPropType = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ui = require('@mozaik/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BranchPropType = exports.BranchPropType = _propTypes2.default.shape({
    name: _propTypes2.default.string.isRequired,
    _links: _propTypes2.default.shape({
        html: _propTypes2.default.string.isRequired
    }).isRequired,
    commit: _propTypes2.default.shape({
        author: _propTypes2.default.shape({
            login: _propTypes2.default.string.isRequired,
            avatar_url: _propTypes2.default.string.isRequired,
            html_url: _propTypes2.default.string.isRequired
        })
    })
});

var Branch = function (_Component) {
    _inherits(Branch, _Component);

    function Branch() {
        _classCallCheck(this, Branch);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Branch.prototype.render = function render() {
        var branch = this.props.branch;
        var commit = branch.commit;


        return _react2.default.createElement(_ui.WidgetListItem, {
            title: _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                    'a',
                    { href: branch._links.html, target: '_blank' },
                    branch.name
                ),
                '\xA0',
                commit && commit.author && _react2.default.createElement(
                    'span',
                    null,
                    'by',
                    ' ',
                    _react2.default.createElement(
                        'a',
                        { href: commit.author.html_url, target: '_blank' },
                        commit.author.login
                    )
                )
            ),
            post: commit && commit.author && _react2.default.createElement(
                _ui.WidgetAvatar,
                { href: commit.author.html_url, size: '4vmin' },
                _react2.default.createElement('img', { src: commit.author.avatar_url, alt: commit.author.login })
            )
        });
    };

    return Branch;
}(_react.Component);

Branch.propTypes = {
    branch: BranchPropType.isRequired
};
exports.default = Branch;