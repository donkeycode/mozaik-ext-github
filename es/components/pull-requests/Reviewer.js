function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WidgetAvatar } from '@mozaik/ui';

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


        return React.createElement(
            'div',
            { className: 'reviewer' },
            display_nb_request && React.createElement(
                'span',
                { className: 'nb-request' },
                nbRequest
            ),
            React.createElement(
                'a',
                { className: 'avatar', href: html_url, target: '_blank' },
                React.createElement(
                    WidgetAvatar,
                    { href: html_url, size: '3vmin' },
                    React.createElement('img', { src: avatar_url, alt: login })
                )
            )
        );
    };

    return Reviewer;
}(Component);

Reviewer.propTypes = {
    reviewer: PropTypes.shape({
        html_url: PropTypes.string.isRequired,
        avatar_url: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired
    }).isRequired,
    display_nb_request: PropTypes.bool
};
export default Reviewer;