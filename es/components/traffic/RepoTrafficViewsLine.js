var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import RepoTrafficViews from './RepoTrafficViews';

var RepoTrafficViewsLine = function (_Component) {
    _inherits(RepoTrafficViewsLine, _Component);

    function RepoTrafficViewsLine() {
        _classCallCheck(this, RepoTrafficViewsLine);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    RepoTrafficViewsLine.getApiRequest = function getApiRequest(params) {
        return RepoTrafficViews.getApiRequest(params);
    };

    RepoTrafficViewsLine.prototype.render = function render() {
        return React.createElement(RepoTrafficViews, _extends({}, this.props, { type: 'line' }));
    };

    return RepoTrafficViewsLine;
}(Component);

export default RepoTrafficViewsLine;