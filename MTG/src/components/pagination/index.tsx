import React from "react";
import "./index.less";
import { Link } from "react-router-dom";

import { ReviewType } from "../../redux/review/review.reducer";

interface Props {
  changeNumberPage: (number: number) => void;
  arrayReview: ReviewType[];
  numberPage: number;
};

class Pagination extends React.Component<Props> {
  // paramId: number = Number(this.props.match.params.id);

  constructor(props: Props) {
    super(props);
    this.hundleShowPage = this.hundleShowPage.bind(this);
  }

  // нумерация страниц
  numberOfPages: () => number[] = () => {
    const { arrayReview } = this.props;
    const numbers: number[] = [];

    arrayReview.forEach((item, index) => {
      if (index % 10 === 0) {
        numbers.push(index / 10 + 1)
      }
    })

    return numbers;
  }

  hundleShowPage(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { changeNumberPage } = this.props;
    if (event.target instanceof HTMLAnchorElement) {
      changeNumberPage(Number(event.target.textContent))
    }
  }

  render() {
    const { numberOfPages, hundleShowPage } = this;
    const { numberPage } = this.props;

    return <div
      className="pagination"
      onClick={hundleShowPage}
    >
      {
        numberOfPages().map((item: number) =>
          <Link to={`/${item}`}
            key={item}
            className={`pagination-item ${item === numberPage && 'pagination-item--active'}`}
          >{item}
          </Link>)
      }

    </div>
  }
}

export default Pagination;