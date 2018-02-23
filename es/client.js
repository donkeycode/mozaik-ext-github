'use strict';

var request = require('request-promise-native');
var chalk = require('chalk');
var config = require('./config');

// https://developer.github.com/v3/#user-agent-required
var userAgent = '@mozaik/ext-github';
var previewAcceptHeader = 'application/vnd.github.spiderman-preview';

/**
 * @param {Mozaik} mozaik
 */
var client = function client(mozaik) {
    mozaik.loadApiConfig(config);

    var buildApiRequest = function buildApiRequest(path, params) {
        var url = config.get('github.baseUrl');

        var options = {
            uri: '' + url + path,
            qs: {},
            json: true,
            resolveWithFullResponse: true,
            headers: {
                'User-Agent': userAgent,
                Accept: previewAcceptHeader
            }
        };

        var paramsDebug = params ? ' ' + JSON.stringify(params) : '';
        mozaik.logger.info(chalk.yellow('[github] calling ' + url + path + paramsDebug));

        if (params) {
            options.qs = params;
        }

        if (config.get('github.token') !== '') {
            options.headers.Authorization = 'token ' + config.get('github.token');
        }

        return request(options);
    };

    var _repositoryCommits = function _repositoryCommits(params, buffer) {
        return buildApiRequest('/repos/' + params.repository + '/commits', params).then(function (res) {
            buffer.commits = buffer.commits.concat(res.body);

            // checks if there's an available next page in response link http header
            if (res.headers.link && /&page=(\d+)> rel="next"/.test(res.headers.link) === true && buffer.commits.length < buffer.max) {
                buffer.page = Number(/&page=(\d+)> rel="next"/.exec(res.headers.link)[1]);

                return _repositoryCommits(params, buffer);
            } else {
                return buffer.commits;
            }
        });
    };

    var apiCalls = {
        organization: function organization(_ref) {
            var _organization = _ref.organization;

            return buildApiRequest('/orgs/' + _organization).then(function (res) {
                return res.body;
            });
        },
        user: function user(_ref2) {
            var _user = _ref2.user;

            return buildApiRequest('/users/' + _user).then(function (_ref3) {
                var body = _ref3.body;
                return body;
            });
        },
        repository: function repository(_ref4) {
            var _repository = _ref4.repository;

            return buildApiRequest('/repos/' + _repository).then(function (_ref5) {
                var body = _ref5.body;
                return body;
            });
        },
        pullRequests: function pullRequests(_ref6) {
            var repository = _ref6.repository;

            return buildApiRequest('/repos/' + repository + '/pulls').then(function (_ref7) {
                var pullRequests = _ref7.body;
                return {
                    pullRequests: pullRequests
                };
            });
        },
        pullRequestsMultiRepos: function pullRequestsMultiRepos(_ref8) {
            var repositories = _ref8.repositories,
                owner = _ref8.owner;

            return buildApiRequest('/orgs/' + owner + '/repos').then(function (res) {
                console.log(res.body);
                return Promise.all(res.body.map(function (repo) {
                    return apiCalls.pullRequests(Object.assign({ repository: repo.full_name }));
                }));
            });
        },
        repositoryParticipationStats: function repositoryParticipationStats(_ref9) {
            var repository = _ref9.repository;

            return buildApiRequest('/repos/' + repository + '/stats/participation').then(function (_ref10) {
                var body = _ref10.body;
                return body;
            });
        },
        repositoryLanguages: function repositoryLanguages(_ref11) {
            var repository = _ref11.repository;

            return buildApiRequest('/repos/' + repository + '/languages').then(function (_ref12) {
                var body = _ref12.body;
                return body;
            });
        },


        // Be warned that this API call can be heavy enough
        // because it loads each branch details with an extra call
        branches: function branches(params) {
            return buildApiRequest('/repos/' + params.repository + '/branches').then(function (res) {
                return Promise.all(res.body.map(function (branch) {
                    return apiCalls.branch(Object.assign({ branch: branch.name }, params));
                }));
            }).then(function (branches) {
                return { branches: branches };
            });
        },
        branch: function branch(_ref13) {
            var repository = _ref13.repository,
                _branch = _ref13.branch;

            return buildApiRequest('/repos/' + repository + '/branches/' + _branch).then(function (_ref14) {
                var body = _ref14.body;
                return body;
            });
        },
        repositoryContributorsStats: function repositoryContributorsStats(_ref15) {
            var repository = _ref15.repository;

            return buildApiRequest('/repos/' + repository + '/stats/contributors').then(function (res) {
                return {
                    contributors: res.body
                };
            });
        },
        repoCommitActivity: function repoCommitActivity(_ref16) {
            var repository = _ref16.repository;

            return buildApiRequest('/repos/' + repository + '/stats/commit_activity').then(function (res) {
                return {
                    buckets: res.body
                };
            });
        },
        repositoryCommits: function repositoryCommits(params) {
            return _repositoryCommits(params, {
                commits: [],
                page: 1,
                max: 1000
            });
        },
        issues: function issues(_ref17) {
            var repository = _ref17.repository;

            return buildApiRequest('/repos/' + repository + '/issues').then(function (_ref18) {
                var body = _ref18.body;
                return body;
            });
        },


        // Be warned that this API call can be heavy enough
        // because it fetch all the issues for each labels
        issueLabelsAggregations: function issueLabelsAggregations(params) {
            params.labels.forEach(function (label) {
                label.count = 0;
            });

            return Promise.all(params.labels.map(function (label) {
                return buildApiRequest('/repos/' + params.repository + '/issues', {
                    labels: label.name,
                    state: 'open',
                    filter: 'all'
                }).then(function (res) {
                    label.count = res.body.length;

                    return label;
                });
            }));
        },
        status: function status() {
            var url = 'https://status.github.com/api/last-message.json';
            var req = request.get(url);

            mozaik.logger.info(chalk.yellow('[github] calling ' + url));

            return req.promise().then(function (res) {
                return res.body;
            });
        },
        trafficViews: function trafficViews(_ref19) {
            var repository = _ref19.repository;

            return buildApiRequest('/repos/' + repository + '/traffic/views').then(function (_ref20) {
                var body = _ref20.body;
                return body;
            });
        },
        trafficClones: function trafficClones(_ref21) {
            var repository = _ref21.repository;

            return buildApiRequest('/repos/' + repository + '/traffic/clones').then(function (_ref22) {
                var body = _ref22.body;
                return body;
            });
        }
    };

    return apiCalls;
};

module.exports = client;