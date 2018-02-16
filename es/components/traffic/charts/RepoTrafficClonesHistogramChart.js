function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ResponsiveBar } from 'nivo';

var margin = { top: 10, right: 10, bottom: 54, left: 60 };
var format = function format(d) {
    return moment(d).format('MM/DD');
};
var axisLeft = {
    legend: 'clones',
    legendPosition: 'center',
    legendOffset: -40
};
var axisBottom = {
    format: format,
    tickRotation: -60
};

var RepoTrafficClonesHistogramChart = function (_Component) {
    _inherits(RepoTrafficClonesHistogramChart, _Component);

    function RepoTrafficClonesHistogramChart() {
        _classCallCheck(this, RepoTrafficClonesHistogramChart);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    RepoTrafficClonesHistogramChart.prototype.render = function render() {
        var _props = this.props,
            clones = _props.clones,
            theme = _props.theme;


        return React.createElement(ResponsiveBar, {
            margin: margin,
            data: clones,
            indexBy: 'timestamp',
            keys: ['uniques', 'others'],
            theme: theme.charts,
            animate: false,
            xPadding: 0.3,
            axisLeft: axisLeft,
            axisBottom: axisBottom,
            labelsTextColor: 'inherit:darker(1.2)',
            labelsLinkColor: 'inherit',
            colors: theme.charts.colors
        });
    };

    return RepoTrafficClonesHistogramChart;
}(Component);

RepoTrafficClonesHistogramChart.propTypes = {
    clones: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired
};
export default RepoTrafficClonesHistogramChart;