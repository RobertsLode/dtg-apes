import { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const propTypes = {
    page: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    buttonsDisabled: PropTypes.bool.isRequired,
};

class Paginator extends Component {
    constructor(props) {
        super(props);

        const { page } = props;

        this.state = {
            page,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { page: prevPage } = prevProps;
        const { page: currPage } = this.props;

        if (prevPage !== currPage) {
            this.updatePage(currPage);
        }
    }

    handleChange(e) {
        const { setPage, pageCount, buttonsDisabled } = this.props;

        const { key, target } = e;
        const { name, value } = target;

        if (key === 'Enter' && !buttonsDisabled) {
            const parsedValue = Number(value) === 0 ? 1 : +value;
            const constrainedValue = parsedValue > pageCount ? pageCount : +value;

            this.setState({ [name]: constrainedValue }, () => setPage(constrainedValue));
        } else {
            const parsedValue = Number.isNaN(Number(value)) ? 1 : value;

            this.setState({
                [name]: parsedValue,
            });
        }
    }

    handlePageChange(e) {
        const { page } = this.state;
        const { pageCount, setPage } = this.props;
        const { name } = e.currentTarget;

        if (name === 'prev') {
            const prevPage = page > 1 ? page - 1 : page;

            this.setState({ page: prevPage }, setPage(prevPage));
        } else if (name === 'next') {
            const nextPage = page === pageCount ? page : page + 1;
            console.log(nextPage);
            this.setState({ page: nextPage }, setPage(nextPage));
        }
    }

    updatePage(page) {
        this.setState({ page });
    }

    render() {
        const { page } = this.state;
        const { pageCount, buttonsDisabled } = this.props;

        return (
            <div className="paginator-component row justify-content-center">
                <div className="input-group">
                    <button
                        onClick={this.handlePageChange}
                        type="button"
                        className="btn btn-dark"
                        name="prev"
                        title="Previous"
                        disabled={buttonsDisabled || page === 1}
                    >
                        <i className="fa fa-angle-left" />
                    </button>
                    <input
                        onChange={this.handleChange}
                        onKeyDown={this.handleChange}
                        value={page}
                        type="text"
                        max={pageCount}
                        maxLength="3"
                        className="form-control"
                        name="page"
                        autoComplete="off"
                        title="Lapa"
                        style={{ width: `${String(page).length + 3}ch` }}
                    />
                    <span className="input-group-text">
                        {pageCount}
                    </span>
                    <button
                        onClick={this.handlePageChange}
                        type="button"
                        className="btn btn-dark"
                        name="next"
                        title="Next"
                        disabled={buttonsDisabled || page === pageCount}
                    >
                        <i className="fa fa-angle-right" />

                    </button>
                </div>
            </div>
        );
    }
}

Paginator.propTypes = propTypes;

export { Paginator };
