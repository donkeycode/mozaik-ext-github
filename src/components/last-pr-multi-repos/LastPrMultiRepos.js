import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody } from '@mozaik/ui';
import GithubIcon from 'react-icons/lib/fa/github-alt';
import FaPause from 'react-icons/lib/fa/pause';
import FaPlay from  'react-icons/lib/fa/play';
import FaBackward from 'react-icons/lib/fa/backward';
import FaForward from 'react-icons/lib/fa/forward';
import PullRequestDC from '../pull-requests/PullRequestDC';
import Reviewer from '../pull-requests/Reviewer';

export default class LastPrMultiRepos extends Component {
    static PropTypes = {
        organisation: PropTypes.string.isRequired,
        title: PropTypes.string,
        elemOnPage: PropTypes.number,
        view: PropTypes.string,
        apiData: PropTypes.shape({
            LastPrMultiRepos: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
        }),
        apiError: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.goNextPage = this.goNextPage.bind(this);
        this.goPreviousPage = this.goPreviousPage.bind(this);
        this.playOrPause = this.playOrPause.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        nextProps.currentPage = this.props.currentPage;
        nextProps.playing = this.props.playing;
    }

    static getApiRequest({ organisation }) {
        return {
            id: `github.pullRequestsMultiRepos.${organisation}`,
            params: { organisation }
        }
    }

    static defaultProps = {
        currentPage: 0,
        playing: true
    }

    getAllPullRequests() {
        const prs = [];
        const { apiData } = this.props;

        for (var i = 0; i < apiData.length; i++) {
            for (var j = 0; j < apiData[i].pullRequests.length; j++) {
                var pr = apiData[i].pullRequests[j];
                if (pr.requested_reviewers && pr.requested_reviewers.length) {
                    prs.push(pr);
                }
            }
        }
        prs.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        return prs;
    }

    getLastPullRequests() {
        const { apiData, elemOnPage } = this.props;
        const lastPullRequests = [];
        const prs = this.getAllPullRequests();
        var pr = [];

        for (var i = 0; i < prs.length; i++) {
            pr.push(prs[i]);
            if (elemOnPage) {
                if (pr.length === elemOnPage) {
                    lastPullRequests.push(pr);
                    pr = [];
                }
            }
        }
        if (pr.length) {
            lastPullRequests.push(pr);
        }
        return lastPullRequests;
    }

    getAllReviewers() {
        const reviewers = [];
        const lastPullRequests = this.getAllPullRequests();

        for (var i = 0; i < lastPullRequests.length; i++) {
            if (lastPullRequests[i].requested_reviewers) {
                for (var j = 0; j < lastPullRequests[i].requested_reviewers.length; j++) {
                    this.addOrUpdateReviewer(reviewers, lastPullRequests[i].requested_reviewers[j]);
                }
            }
        }

        return reviewers;
    }

    addOrUpdateReviewer(reviewers, reviewer) {
        for (var i = 0; i < reviewers.length; i++) {
            if (reviewers[i].id === reviewer.id) {
                reviewers[i]['nbRequest'] += 1;

                return;
            }
        }

        reviewer['nbRequest'] = 1;
        reviewers.push(reviewer);

        return;
    }

    goNextPage() {
        if (this.props.apiData) {
            this.props.currentPage = (this.props.currentPage < this.getLastPullRequests().length - 1) ? this.props.currentPage + 1 : 0;
            this.setState();
        }
    }

    goPreviousPage() {
        if (this.props.apiData) {
            this.props.currentPage = (this.props.currentPage > 0 ? this.props.currentPage - 1 : this.getLastPullRequests().length - 1);
            this.setState();
        }
    }

    playOrPause() {
        this.props.playing = !this.props.playing;
        this.setState();
    }

    componentDidMount() {
        setInterval(() => {
            if (this.props.playing) {
                this.goNextPage();
            }
        }, 5000);
    }

    render() {
        const { view, repository, title, apiData, apiError, elemOnPage } = this.props;

        let body = <WidgetLoader/>;
        let count = 0;
        let viewId = view === 'tv' ? 'tv' : 'screen';
        if (apiData) {
            const lastPullRequests = this.getLastPullRequests();
            const reviewers = this.getAllReviewers(lastPullRequests);

            count = (
                <div>
                    <div className="control-prs">
                        <span>{(this.props.currentPage + 1) + ' / ' + (lastPullRequests.length)}</span>
                        <a onClick={this.goPreviousPage}><FaBackward /></a>
                        <a onClick={this.playOrPause}>{this.props.playing ? <FaPause /> : <FaPlay />}</a>
                        <a onClick={this.goNextPage}><FaForward /></a>
                    </div>
                </div>
            );

            body = (
                <div id="prs">
                    <div id="reviewers">
                        {reviewers.map(reviewer =>
                            <Reviewer reviewer={reviewer} display_nb_request={true} />
                        )}
                    </div>
                    <div className={viewId}>
                        {lastPullRequests[this.props.currentPage].map(pullRequest =>
                            <div className="pull-request">
                                <PullRequestDC key={pullRequest.id} pullRequest={pullRequest} />
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Last PR'}
                    icon={GithubIcon}
                    count={count}
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
