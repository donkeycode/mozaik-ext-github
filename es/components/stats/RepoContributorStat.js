function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DotIcon from 'react-icons/lib/fa/dot-circle-o';
import { WidgetListItem, WidgetAvatar } from '@mozaik/ui';

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


        return React.createElement(WidgetListItem, {
            title: React.createElement(
                'a',
                { href: author.html_url, target: '_blank' },
                author.login
            ),
            pre: React.createElement(
                WidgetAvatar,
                { size: '4vmin' },
                React.createElement('img', { src: author.avatar_url, alt: author.login })
            ),
            post: React.createElement(
                'span',
                {
                    style: {
                        display: 'flex',
                        alignItems: 'center'
                    }
                },
                total,
                '\xA0',
                React.createElement(DotIcon, null)
            )
        });
    };

    return RepoContributorStat;
}(Component);

RepoContributorStat.propTypes = {
    contributor: PropTypes.shape({
        total: PropTypes.number.isRequired,
        author: PropTypes.shape({
            login: PropTypes.string.isRequired,
            avatar_url: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};
export default RepoContributorStat;