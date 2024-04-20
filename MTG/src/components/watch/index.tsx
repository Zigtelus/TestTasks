import React, { Component } from "react";

interface State {
  currentTime: string;
}

class Watch extends Component<{}, State> {
  timerId: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      currentTime: this.getCurrentTime()
    };
  }

  componentDidMount() {
    const { getCurrentTime } = this;
    this.timerId = setInterval(() => {


      this.setState({ currentTime: getCurrentTime() });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  getCurrentTime = (): string => {
    const date = new Date();
    const hours = this.formatTimePart(date.getHours());
    const minutes = this.formatTimePart(date.getMinutes());
    const seconds = this.formatTimePart(date.getSeconds());

    return `${hours}:${minutes}:${seconds}`;
  }

  formatTimePart(timePart: number): string {
    return timePart < 10 ? `0${timePart}` : `${timePart}`;
  }

  render() {
    const { currentTime } = this.state;

    return <span>{currentTime}</span>;
  }
}

export default Watch;
