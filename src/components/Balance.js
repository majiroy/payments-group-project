import React, { Component } from "react";
import "./Balance.css";

class Balance extends Component {
  constructor() {
    super();
    this.state = {
      alternateCurrency: "USD",
      balanceInAlternateCurrency: 0
    };
  }

  // componentDidMount() {
  //   this.changingCurrencyToGBP();
  // }

  componentDidUpdate() {
    this.changingCurrencyToGBP();
  }

  changingCurrencyToGBP() {
    // const currency = this.state.alternateCurrency;
    fetch("https://exchangeratesapi.io/api/latest?base=GBP")
      .then(data => data.json())
      .then(response => {
        const exchangeRate = response.rates[this.state.alternateCurrency];
        // const totalBalance = this.props.total;
        this.setState({
          balanceInAlternateCurrency: (this.props.balance * exchangeRate).toFixed(
            2
          )
        });
      });
  }

  convertToAnotherCurrency = event => {
    const currency = event.target.value;
    this.setState({ alternateCurrency: currency });
    this.componentDidUpdate();
  };

  render() {
    return <div className="Balance">
        <h2 className="Balance-title">
          Your account balance is
          <span className="Balance-total">£{this.props.balance}</span>
        </h2>
        <div className="Balance-alt">
          Your balance is {this.state.balanceInAlternateCurrency} in
          <select defaultValue={this.state.alternateCurrency} onChange={this.convertToAnotherCurrency}>
            {this.props.currencies.map((currency, index) => (
              <option key={index}>{currency}</option>
            ))}
          </select>
        </div>
      </div>;
  }
}

export default Balance;
