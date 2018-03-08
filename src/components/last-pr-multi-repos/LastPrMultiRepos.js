import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WidgetLabel, TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody } from '@mozaik/ui';
import GithubIcon from 'react-icons/lib/fa/github-alt'
import PullRequestDC from '../pull-requests/PullRequestDC'

export default class LastPrMultiRepos extends Component {
    static PropTypes = {
        repositories: PropTypes.arrayOf(PropTypes.string).isRequired,
        owner: PropTypes.string.isRequired,
        title: PropTypes.string,
        elemOnPage: PropTypes.number,
        apiData: PropTypes.shape({
            LastPrMultiRepos: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
        }),
        apiError: PropTypes.object
    }

    constructor(props) {
        super(props);
        console.log('Component has been built');
    }
    componentWillReceiveProps() {
        console.log('componentWillReceiveProps');
        this.askNewData = false;
    }
shouldComponentUpdate() {
    return false;
    console.log('shouldComponentUpdate');
}
componentWillUpdate() {
    console.log('componentWillUpdate');
}
componentDidUpdate() {
    console.log('componentDidUpdate');
}

    static getApiRequest({ repositories, owner }) {
        return {
            id: `github.pullRequestsMultiRepos.${repositories}.${owner}.${this.props.askNewData}`,
            params: { repositories, owner }
        }
    }

    static defaultProps = {
        currentPage: 0,
        askNewData: true,
        nbPage: 0
    }

    getLastPullRequests() {
        const { apiData, elemOnPage } = this.props;
        let lastPullRequests = [];

        var pr = [];
        for (var i = 0; i < apiData.length; i++) {
            for (var j = 0; j < apiData[i].pullRequests.length; j++) {
                pr.push(apiData[i].pullRequests[j]);
                if (elemOnPage) {
                    if (pr.length === elemOnPage) {
                        lastPullRequests.push(pr);
                        pr = [];
                    }
                }
            }
        }
        if (pr.length) {
            lastPullRequests.push(pr);
        }
        this.nbPage = lastPullRequests.length;
        return lastPullRequests;
    }

    componentDidMount() {
        console.log('Component mounted');
        setInterval(() => {
            if (this.props.apiData) {
                console.log(this.nbPage);
                this.props.currentPage = (this.props.currentPage < this.nbPage) ? this.props.currentPage + 1 : 0;
                console.log('Current page', this.props.currentPage);
                if (this.props.currentPage === this.nbPr) {
                    this.props.askNewData = true;
                }
                conosle.log('this.props.askNewData', this.props.askNewData);
                this.setState();
            } else {
                console.log('No API data');
            }
        }, 5000);
    }

    render() {
        const { repository, title, apiData, apiError, elemOnPage } = this.props;

        let body = <WidgetLoader/>;
        let count = 0;
        if (apiData) {
            console.log('apiData', apiData.length, apiData);

            const lastPullRequests = this.getLastPullRequests();

            count = (this.props.currentPage + 1) + ' /// ' + (lastPullRequests.length - 1);
            body = (
                <div>
                    {lastPullRequests[this.props.currentPage].map(pullRequest =>
                        <div>
                            <WidgetLabel
                                label={
                                    <a href={`${pullRequest.base.repo.html_url}`} target="_blank">
                                        {pullRequest.base.repo.name}
                                    </a>
                                }
                                style={{ width: '100%', marginBottom: '1vmin' }}
                            />
                            <PullRequestDC key={pullRequest.id} pullRequest={pullRequest} />
                        </div>
                    )}
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Last Pull Requests'}
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

    componentWillUnmount() {
        console.log('Component destroyed');
    }
}