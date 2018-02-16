function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WidgetListItem, WidgetAvatar } from '@mozaik/ui';

export var BranchPropType = PropTypes.shape({
    name: PropTypes.string.isRequired,
    _links: PropTypes.shape({
        html: PropTypes.string.isRequired
    }).isRequired,
    commit: PropTypes.shape({
        author: PropTypes.shape({
            login: PropTypes.string.isRequired,
            avatar_url: PropTypes.string.isRequired,
            html_url: PropTypes.string.isRequired
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


        return React.createElement(WidgetListItem, {
            title: React.createElement(
                'span',
                null,
                React.createElement(
                    'a',
                    { href: branch._links.html, target: '_blank' },
                    branch.name
                ),
                '\xA0',
                commit && commit.author && React.createElement(
                    'span',
                    null,
                    'by',
                    ' ',
                    React.createElement(
                        'a',
                        { href: commit.author.html_url, target: '_blank' },
                        commit.author.login
                    )
                )
            ),
            post: commit && commit.author && React.createElement(
                WidgetAvatar,
                { href: commit.author.html_url, size: '4vmin' },
                React.createElement('img', { src: commit.author.avatar_url, alt: commit.author.login })
            )
        });
    };

    return Branch;
}(Component);

Branch.propTypes = {
    branch: BranchPropType.isRequired
};
export default Branch;