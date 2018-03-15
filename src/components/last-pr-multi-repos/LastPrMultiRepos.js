import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody } from '@mozaik/ui';
import GithubIcon from 'react-icons/lib/fa/github-alt'
import PullRequestDC from '../pull-requests/PullRequestDC'

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

    componentWillReceiveProps(nextProps) {
        nextProps.currentPage = this.props.currentPage;
    }

    static getApiRequest({ organisation }) {
        return {
            id: `github.pullRequestsMultiRepos.${organisation}`,
            params: { organisation }
        }
    }

    static defaultProps = {
        currentPage: 0,
    }

    getAllPullRequests() {
        const prs = [];
        const { apiData } = this.props;

        for (var i = 0; i < apiData.length; i++) {
            for (var j = 0; j < apiData[i].pullRequests.length; j++) {
                prs.push(apiData[i].pullRequests[j]);
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

    setCurrentPage() {
        if (this.props.apiData) {
            this.props.currentPage = (this.props.currentPage < this.getLastPullRequests().length - 1) ? this.props.currentPage + 1 : 0;
            this.setState();
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setCurrentPage();
        }, 5000);
    }

    render() {
        const { view, repository, title, apiData, apiError, elemOnPage } = this.props;

        let body = <WidgetLoader/>;
        let count = 0;
        let viewId = view === 'tv' ? 'tv' : 'screen';
        if (apiData) {
            const lastPullRequests = this.getLastPullRequests();

            count = (this.props.currentPage + 1) + ' / ' + (lastPullRequests.length);
            body = (
                <div id={viewId}>
                    {lastPullRequests[this.props.currentPage].map(pullRequest =>
                        <div className="pull-request">
                            <PullRequestDC key={pullRequest.id} pullRequest={pullRequest} />
                        </div>
                    )}
                </div>
            )
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