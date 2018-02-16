function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RepoTrafficClonesHistogramChart from './charts/RepoTrafficClonesHistogramChart';
import RepoTrafficClonesLineChart from './charts/RepoTrafficClonesLineChart';
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui';
import GithubIcon from 'react-icons/lib/fa/github-alt';

var RepoTrafficClones = function (_Component) {
    _inherits(RepoTrafficClones, _Component);

    function RepoTrafficClones() {
        _classCallCheck(this, RepoTrafficClones);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    RepoTrafficClones.getApiRequest = function getApiRequest(_ref) {
        var repository = _ref.repository;

        return {
            id: 'github.trafficClones.' + repository,
            params: { repository: repository }
        };
    };

    RepoTrafficClones.prototype.render = function render() {
        var _props = this.props,
            repository = _props.repository,
            title = _props.title,
            type = _props.type,
            apiData = _props.apiData,
            apiError = _props.apiError,
            theme = _props.theme;


        var countNode = null;
        var body = React.createElement(WidgetLoader, null);
        if (apiData !== undefined) {
            var count = apiData.count,
                uniques = apiData.uniques,
                clones = apiData.clones;


            countNode = React.createElement(
                'span',
                null,
                count,
                ' clones - ',
                uniques,
                ' unique clones'
            );

            if (type === 'histogram') {
                var chartData = clones.map(function (_ref2) {
                    var timestamp = _ref2.timestamp,
                        uniques = _ref2.uniques,
                        count = _ref2.count;
                    return {
                        timestamp: timestamp,
                        uniques: uniques,
                        others: count - uniques
                    };
                });

                body = React.createElement(RepoTrafficClonesHistogramChart, { theme: theme, clones: chartData });
            } else if (type === 'line') {
                var _chartData = [{
                    id: 'total',
                    data: clones.map(function (clone) {
                        return {
                            y: clone.count,
                            x: clone.timestamp
                        };
                    })
                }, {
                    id: 'uniques',
                    data: clones.map(function (clone) {
                        return {
                            y: clone.uniques,
                            x: clone.timestamp
                        };
                    })
                }];

                body = React.createElement(RepoTrafficClonesLineChart, { theme: theme, clones: _chartData });
            }
        }

        return React.createElement(
            Widget,
            null,
            React.createElement(WidgetHeader, {
                title: title || 'Clones',
                subject: title ? null : repository,
                count: countNode,
                icon: GithubIcon
            }),
            React.createElement(
                WidgetBody,
                { style: { overflowY: 'hidden' } },
                React.createElement(
                    TrapApiError,
                    { error: apiError },
                    body
                )
            )
        );
    };

    return RepoTrafficClones;
}(Component);

RepoTrafficClones.propTypes = {
    repository: PropTypes.string.isRequired,
    title: PropTypes.string,
    apiData: PropTypes.any,
    apiError: PropTypes.object,
    type: PropTypes.oneOf(['histogram', 'line']).isRequired,
    theme: PropTypes.object.isRequired
};
RepoTrafficClones.defaultProps = {
    type: 'histogram'
};
export default RepoTrafficClones;