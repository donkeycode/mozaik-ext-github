'use strict';

exports.__esModule = true;

var _Branches = require('./Branches');

var _Branches2 = _interopRequireDefault(_Branches);

var _PullRequests = require('./pull-requests/PullRequests');

var _PullRequests2 = _interopRequireDefault(_PullRequests);

var _LastPrMultiRepos = require('./last-pr-multi-repos/LastPrMultiRepos');

var _LastPrMultiRepos2 = _interopRequireDefault(_LastPrMultiRepos);

var _UserBadge = require('./badges/UserBadge');

var _UserBadge2 = _interopRequireDefault(_UserBadge);

var _OrgBadge = require('./badges/OrgBadge');

var _OrgBadge2 = _interopRequireDefault(_OrgBadge);

var _RepoBadge = require('./badges/RepoBadge');

var _RepoBadge2 = _interopRequireDefault(_RepoBadge);

var _RepoContributorsStats = require('./stats/RepoContributorsStats');

var _RepoContributorsStats2 = _interopRequireDefault(_RepoContributorsStats);

var _Status = require('./Status');

var _Status2 = _interopRequireDefault(_Status);

var _RepoTrafficViewsHistogram = require('./traffic/RepoTrafficViewsHistogram');

var _RepoTrafficViewsHistogram2 = _interopRequireDefault(_RepoTrafficViewsHistogram);

var _RepoTrafficViewsLine = require('./traffic/RepoTrafficViewsLine');

var _RepoTrafficViewsLine2 = _interopRequireDefault(_RepoTrafficViewsLine);

var _RepoTrafficClonesHistogram = require('./traffic/RepoTrafficClonesHistogram');

var _RepoTrafficClonesHistogram2 = _interopRequireDefault(_RepoTrafficClonesHistogram);

var _RepoTrafficClonesLine = require('./traffic/RepoTrafficClonesLine');

var _RepoTrafficClonesLine2 = _interopRequireDefault(_RepoTrafficClonesLine);

var _RepoCommitActivityHistogram = require('./stats/RepoCommitActivityHistogram');

var _RepoCommitActivityHistogram2 = _interopRequireDefault(_RepoCommitActivityHistogram);

var _RepoCommitActivityLine = require('./stats/RepoCommitActivityLine');

var _RepoCommitActivityLine2 = _interopRequireDefault(_RepoCommitActivityLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * This file is part of the Mozaïk project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

exports.default = {
    Branches: _Branches2.default,
    PullRequests: _PullRequests2.default,
    UserBadge: _UserBadge2.default,
    OrgBadge: _OrgBadge2.default,
    RepoBadge: _RepoBadge2.default,
    RepoContributorsStats: _RepoContributorsStats2.default,
    Status: _Status2.default,
    RepoTrafficViewsHistogram: _RepoTrafficViewsHistogram2.default,
    RepoTrafficViewsLine: _RepoTrafficViewsLine2.default,
    RepoTrafficClonesHistogram: _RepoTrafficClonesHistogram2.default,
    RepoTrafficClonesLine: _RepoTrafficClonesLine2.default,
    RepoCommitActivityHistogram: _RepoCommitActivityHistogram2.default,
    RepoCommitActivityLine: _RepoCommitActivityLine2.default,
    LastPrMultiRepos: _LastPrMultiRepos2.default
};