import React from "react";
import "./index.less";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Languages from "../../components/languages";
import Watch from "../../components/watch";
import { RootState } from "../../redux";

interface State {
  isLanguages: boolean;
}

interface Props {
  //StateToProps
  language: string
}

class Header extends React.Component<Props, State> {
  headRef: React.RefObject<HTMLHeadElement>;
  languagesRef: React.RefObject<HTMLButtonElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      isLanguages: false,
    };
    this.languagesRef = React.createRef();
    this.headRef = React.createRef();
  }

  hundleShowLanguages = () => {
    this.setState({ isLanguages: !this.state.isLanguages })
  }

  render(): React.ReactNode {
    const { isLanguages } = this.state;
    const { language } = this.props;
    const { hundleShowLanguages, languagesRef, headRef } = this;

    return (
      <header
        className="header"
        ref={headRef}
      >
        <nav>
          <ul>
            <li>
              <Link to="/" className="logo">
                <img src="https://www.retail.ru/upload/resize-images/combined/b7ee420763558c2640d97624c8d31479b5f824d477r.png" alt="logo" />
              </Link>
            </li>
            <li>
              <button
                ref={languagesRef}
                onClick={hundleShowLanguages}
                className="btn_language"
              >{language}</button>
              {
                isLanguages &&
                <Languages
                  showHideLanguages={hundleShowLanguages}
                  headerHeight={headRef.current!.offsetHeight}
                  language={language}
                />
              }
            </li>
            <li>
              <Watch />
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    language: state.review.language
  };
};

export default connect(mapStateToProps)(Header);
