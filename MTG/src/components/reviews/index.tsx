import React from "react";
import "./index.less"
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { RootState } from "../../redux";
import { ReviewType, ReviewsDataType } from "../../redux/review/review.reducer";
import Pagination from "../pagination";

interface State {
  numberPage: number
}

interface RouteParams {
  id: string;
}

interface Props extends RouteComponentProps<RouteParams> {
  //StateToProps
  review: ReviewsDataType;
  language: string;
};

class Reviews extends React.Component<Props, State> {
  paramId: number = Number(this.props.match.params.id);
  // массив отзывов из объекта
  arrayReview: ReviewType[] = Object.values(this.props.review[this.props.language])


  constructor(props: Props) {
    super(props);
    this.state = {
      numberPage: 1
    }
  }

  componentDidMount() {
    const { history } = this.props;
    const { paramId, arrayReview } = this;

    // номер страницы, который нужно показать
    let numberPage;

    // посчитать количество страниц
    const totalPAges = Math.ceil(arrayReview.length / 10);

    // проверка параметра на число
    if (isNaN(paramId)) {
      numberPage = 1;

      // если число в параметрах больше количества страниц, тогда показать последнюю страницу
    } else if (Number(paramId) > totalPAges) {
      numberPage = totalPAges;

      // если число в параметрах меньше 0, тогда показать первую страницу
    } else if (Number(paramId) < 1) {
      numberPage = 1;
    } else {
      numberPage = this.paramId;
    }


    history.push("/" + numberPage);
    this.setState({ numberPage: numberPage });
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    // Сравнение текущего состояния со следующим состоянием
    if (
      nextState.numberPage === this.state.numberPage &&
      nextProps === this.props
    ) {
      // Не обновлять компонент, если состояние не изменилось
      return false;
    }
    // Обновить компонент, если состояние изменилось
    return true;
  }

  changeNumberPage = (number: number) => {
    this.setState({ numberPage: number })
  }

  render() {
    // изменение языка
    this.arrayReview = Object.values(this.props.review[this.props.language])

    const { changeNumberPage, arrayReview } = this;
    const { numberPage } = this.state;
    const { review } = this.props;

    // создание ID из ключей, для ключей ДОМ елемента, для отслеживания состояния
    const revievId = Object.keys(review.ru);

    return (
      <div>
        {
          // если колличество отзывов больше 10, тогда номера страниц будут отображаться
          arrayReview.length > 10 &&
          <Pagination
            arrayReview={arrayReview}
            changeNumberPage={changeNumberPage}
            numberPage={numberPage}
          />
        }
        <div className="reviews">
          {
            arrayReview
              // фильтр по страницам
              .filter((item, index) =>
                /*
                  если numberPage = 1, тогда условие будет:
                  index меньше 10 && index больше 0
                */
                index < numberPage * 10 && index >= (numberPage - 1) * 10)

              // собираем массив отзывов
              .map((item, index) =>

                // отзыв
                <div
                  className="review-item"
                  key={revievId[index]}
                >

                  {/* тело отзыва */}
                  <div className="review-item__top">
                    <span className="review-item__date"
                    >{item.date}</span>
                    <span
                      className="review-item__name"
                    >{item.name}</span>
                  </div>
                  <span>{item.review}</span>

                </div>)
          }
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    review: state.review.main,
    language: state.review.language
  };
};


export default withRouter(connect(mapStateToProps)(Reviews));
