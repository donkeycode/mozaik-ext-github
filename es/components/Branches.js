function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BranchesIcon from 'react-icons/lib/fa/code-fork';
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui';
import Branch, { BranchPropType } from './Branch';

var Branches = function (_Component) {
    _inherits(Branches, _Component);

    function Branches() {
        _classCallCheck(this, Branches);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Branches.getApiRequest = function getApiRequest(_ref) {
        var repository = _ref.repository;

        return {
            id: 'github.branches.' + repository,
            params: { repository: repository }
        };
    };

    Branches.prototype.render = function render() {
        var _props = this.props,
            repository = _props.repository,
            title = _props.title,
            apiData = _props.apiData,
            apiError = _props.apiError;


        var body = React.createElement(WidgetLoader, null);
        var count = void 0;
        if (apiData && !apiError) {
            count = apiData.branches.length;
            body = React.createElement(
                'div',
                null,
                apiData.branches.map(function (branch) {
                    return React.createElement(Branch, { key: branch.name, branch: branch });
                })
            );
        }

        return React.createElement(
            Widget,
            null,
            React.createElement(WidgetHeader, {
                title: title || 'Branches',
                subject: title ? null : repository,
                count: count,
                icon: BranchesIcon
            }),
            React.createElement(
                WidgetBody,
                null,
                React.createElement(
                    TrapApiError,
                    { error: apiError },
                    body
                )
            )
        );
    };

    return Branches;
}(Component);

Branches.propTypes = {
    repository: PropTypes.string.isRequired,
    title: PropTypes.string,
    apiData: PropTypes.shape({
        branches: PropTypes.arrayOf(BranchPropType).isRequired
    }),
    apiError: PropTypes.object
};
export default Branches;