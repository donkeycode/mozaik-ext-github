'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _nivo = require('nivo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var margin = { top: 10, right: 10, bottom: 54, left: 60 };
var format = function format(d) {
    return _moment2.default.unix(d).format('MM/DD');
};
var axisLeft = {
    legend: 'commits',
    legendPosition: 'center',
    legendOffset: -40
};
var axisBottom = {
    format: format,
    tickRotation: -60
};

var RepoCommitActivityHistogramChart = function (_Component) {
    _inherits(RepoCommitActivityHistogramChart, _Component);

    function RepoCommitActivityHistogramChart() {
        _classCallCheck(this, RepoCommitActivityHistogramChart);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    RepoCommitActivityHistogramChart.prototype.render = function render() {
        var _props = this.props,
            commits = _props.commits,
            theme = _props.theme;


        return _react2.default.createElement(_nivo.ResponsiveBar, {
            margin: margin,
            data: commits,
            indexBy: 'week',
            keys: ['total'],
            theme: theme.charts,
            animate: false,
            enableGridX: false,
            paddingX: 0.2,
            axisLeft: axisLeft,
            axisBottom: axisBottom,
            labelsTextColor: 'inherit:darker(1.2)',
            labelsLinkColor: 'inherit',
            colors: theme.charts.colors
        });
    };

    return RepoCommitActivityHistogramChart;
}(_react.Component);

RepoCommitActivityHistogramChart.propTypes = {
    commits: _propTypes2.default.array.isRequired,
    theme: _propTypes2.default.object.isRequired
};
exports.default = RepoCommitActivityHistogramChart;