'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _RepoTrafficClonesHistogramChart = require('./charts/RepoTrafficClonesHistogramChart');

var _RepoTrafficClonesHistogramChart2 = _interopRequireDefault(_RepoTrafficClonesHistogramChart);

var _RepoTrafficClonesLineChart = require('./charts/RepoTrafficClonesLineChart');

var _RepoTrafficClonesLineChart2 = _interopRequireDefault(_RepoTrafficClonesLineChart);

var _ui = require('@mozaik/ui');

var _githubAlt = require('react-icons/lib/fa/github-alt');

var _githubAlt2 = _interopRequireDefault(_githubAlt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        if (apiData !== undefined) {
            var count = apiData.count,
                uniques = apiData.uniques,
                clones = apiData.clones;


            countNode = _react2.default.createElement(
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

                body = _react2.default.createElement(_RepoTrafficClonesHistogramChart2.default, { theme: theme, clones: chartData });
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

                body = _react2.default.createElement(_RepoTrafficClonesLineChart2.default, { theme: theme, clones: _chartData });
            }
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: title || 'Clones',
                subject: title ? null : repository,
                count: countNode,
                icon: _githubAlt2.default
            }),
            _react2.default.createElement(
                _ui.WidgetBody,
                { style: { overflowY: 'hidden' } },
                _react2.default.createElement(
                    _ui.TrapApiError,
                    { error: apiError },
                    body
                )
            )
        );
    };

    return RepoTrafficClones;
}(_react.Component);

RepoTrafficClones.propTypes = {
    repository: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string,
    apiData: _propTypes2.default.any,
    apiError: _propTypes2.default.object,
    type: _propTypes2.default.oneOf(['histogram', 'line']).isRequired,
    theme: _propTypes2.default.object.isRequired
};
RepoTrafficClones.defaultProps = {
    type: 'histogram'
};
exports.default = RepoTrafficClones;