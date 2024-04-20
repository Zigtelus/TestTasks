import React, { Dispatch } from "react";
import "./index.less";
import { connect } from "react-redux";
import { LANGUAGES } from "../../redux/review/review.actions";

interface Props {
  headerHeight: number;
  language: string;
  //DispatchToProps
  languages: (nameLanguage: string) => void;
  showHideLanguages: () => void;
}

class Languages extends React.Component<Props> {

  hundleOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { languages, language, showHideLanguages } = this.props;

    if (
      // проверка клика на span
      event.target instanceof HTMLSpanElement &&
      // проверка на клик языка, который уже выбран
      !(event.target.textContent === language)
    ) {
      languages(event.target.textContent!)
      showHideLanguages()
    }
  }

  render(): React.ReactNode {
    const { headerHeight, language } = this.props;
    const { hundleOnClick } = this;

    return <div
      style={{ top: `${headerHeight}px` }}
      className="languages"
      onClick={hundleOnClick}
    >
      <span className={`language_item ${language === 'ru' && 'language--active'}`}>ru</span>
      <span className={`language_item ${language === 'en' && 'language--active'}`}>en</span>
    </div>
  }
}

const mapDispatchToProps = (dispatch: Dispatch<{ type: string, payload: string }>) => {
  return {
    languages: (language: string) =>
      dispatch({ type: LANGUAGES, payload: language })
  };
};

export default connect(null, mapDispatchToProps)(Languages);